<template>
  <section class="api-search-section">
    <div class="playground-container" :style="{ minHeight: containerMinHeight + 'px' }">
      <!-- Playground Content -->
      <div class="playground-content">
        <div class="right-content">
          <h2 class="playground-title">How to use this Playground?</h2>
          <ol>
            <li>Upload a photo of a painting.</li>
            <li>The API will detect the paintings.</li>
            <li>Click on any detected painting.</li>
            <li>The most similar paintings will be retrieved.</li>
          </ol>
        </div>
      </div>

      <!-- Image processing container -->
      <div class="image-processing-container">
        <!-- Demo image container -->
        <div class="demo-image-container">
          <div class="demo-image">
            <div class="image-container">
              <!-- Bind src to imageSrc data property -->
              <!-- Added :alt for accessibility -->
              <img
                ref="demoImage"
                :src="imageSrc"
                alt="Demo Image"
                @load="onImageLoad"
              />
              <transition-group name="fade" tag="div">
                <div
                  v-for="(bboxObj, index) in boundingBoxes"
                  :key="bboxObj.id || index"
                  class="bounding-box"
                  :style="getBoundingBoxStyle(bboxObj.bbox, index)"
                  @click="onBoundingBoxClick(bboxObj, index)"
                  @mouseover="hoveredBBoxIndex = index"
                  @mouseleave="hoveredBBoxIndex = null"
                ></div>
              </transition-group>
            </div>
          </div>
          <div class="demo-buttons">
            <button class="demo-button" @click="triggerFileUpload">
              → Use your photo
            </button>
            <button class="demo-button" @click="fetchRandomPhoto">
              → Try a random photo
            </button>
            <!-- Hidden file input -->
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="handleImageUpload"
              style="display: none;"
            />
          </div>

          <!-- API Results Display -->
          <div class="api-results" v-if="apiResults && currentResult">
            <transition name="fade" mode="out-in" appear>
              <div class="result-item" :key="currentResultIndex">
                <div class="result-content">
                  <img
                    :src="preloadedImages[currentResultIndex]"
                    alt="Artwork Image"
                    class="result-image"
                  />
                  <div class="result-details">
                    <h3>
                      <span class="artvista-choice" v-if="currentResultIndex === 0">ArtVista's choice</span>
                      {{ currentResult.title }}
                    </h3>
                    <p>Artist: {{ currentResult.artist }}</p>
                    <p>
                      Confidence Score:
                      {{ apiResults.scores[currentResultIndex] }}%
                    </p>
                  </div>
                </div>
              </div>
            </transition>
            <!-- Pagination Buttons -->
            <div class="pagination-buttons">
              <button
                v-for="index in paginationIndexes"
                :key="index"
                @click="currentResultIndex = index - 1"
                :class="['pagination-button', { active: currentResultIndex === index - 1 }]"
              >
                {{ index }}
              </button>
            </div>
          </div>
          <!-- End of API Results Display -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Import all images from the assets/api_images directory using require.context (Webpack)
const requireImages = require.context('@/assets/api_images', false, /\.(png|jpe?g|svg)$/i);

export default {
  name: "ApiSearch",
  data() {
    return {
      // Initialize imageSrc with a random image from assets/api_images/
      imageSrc: '', // Will be set in created hook
      boundingBoxes: [],       // To store the bounding boxes
      imageWidth: 0,           // Natural width of the image
      imageHeight: 0,          // Natural height of the image
      displayedImageWidth: 0,  // Current displayed width
      displayedImageHeight: 0, // Current displayed height
      boxOpacity: 0.2,         // Opacity of the bounding box fill
      borderThickness: 2,      // Thickness of the bounding box border
      borderColor: '#9b51e0',  // Original color of the bounding box border
      fillColor: 'rgba(155, 81, 224, 1)', // Base fill color without opacity
      hoveredBBoxIndex: null,  // To track the hovered bounding box
      activeBBoxIndex: null,   // To track the active bounding box
      maxImageHeight: 250,     // Maximum image height in pixels (adjustable)
      maxImageWidth: 300,      // Maximum image width in pixels (adjustable)
      resizeObserver: null,    // ResizeObserver instance
      apiResults: null,        // To store API response data
      currentResultIndex: 0,   // Index of the currently displayed result
      loading: false,          // Loading state for API calls
      imageNeedsProcessing: false, // Flag to indicate if image needs processing
      containerMinHeight: 0,   // To set the min-height of the container
      preloadedImages: [],     // Array to store preloaded images
      availableImages: [],     // Array to store all available image paths
      currentImageIndex: null, // Index of the currently displayed local image
      currentImageSourceType: 'local', // 'local' or 'uploaded'
    };
  },
  computed: {
    currentResult() {
      if (this.apiResults && this.apiResults.website_results) {
        return this.apiResults.website_results[this.currentResultIndex];
      }
      return null;
    },
    paginationIndexes() {
      if (this.apiResults && this.apiResults.website_results) {
        // Generate an array of indices starting from 1
        return this.apiResults.website_results.map((_, index) => index + 1);
      }
      return [];
    },
  },
  methods: {
    // Method to trigger the hidden file input
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },

    // Handle image upload
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.boundingBoxes = []; // Clear existing bounding boxes instantly
        this.apiResults = null;  // Clear previous API results
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;   // Update the imageSrc with the new image
          this.imageNeedsProcessing = true;  // Indicate that the image needs processing
          this.currentImageSourceType = 'uploaded';
          this.currentImageIndex = null; // Reset currentImageIndex since it's an uploaded image
          // Reset the file input to allow uploading the same file again if needed
          this.$refs.fileInput.value = null;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image file.');
        // Reset the file input if the file is invalid
        this.$refs.fileInput.value = null;
      }
    },

    // New method to handle paste events
    handlePasteEvent(event) {
      const clipboardItems = event.clipboardData.items;
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageSrc = e.target.result;
            this.imageNeedsProcessing = true;
            this.currentImageSourceType = 'pasted';
            this.currentImageIndex = null;
            this.boundingBoxes = []; // Clear existing bounding boxes
            this.apiResults = null;  // Clear previous API results
            this.currentResultIndex = 0;
          };
          reader.readAsDataURL(blob);
          // Prevent the default paste action
          event.preventDefault();
          break; // Stop processing after the first image
        }
      }
    },

    // Fetch a random photo from assets/api_images/
    fetchRandomPhoto() {
      if (this.availableImages.length === 0) {
        console.error('No images available to select.');
        return;
      }

      if (this.availableImages.length === 1) {
        // Only one image available; select it if it's not already selected
        if (this.currentImageSourceType === 'local' && this.currentImageIndex === 0) {
          console.warn('Only one image available. Reusing the same image.');
          return;
        }
        this.imageSrc = this.availableImages[0];
        this.imageNeedsProcessing = true;
        this.boundingBoxes = []; // Clear existing bounding boxes
        this.apiResults = null;  // Clear previous API results
        this.currentResultIndex = 0;
        this.currentImageIndex = 0;
        this.currentImageSourceType = 'local';
        return;
      }

      let randomIndex;
      if (this.currentImageSourceType === 'local' && this.currentImageIndex !== null) {
        // Exclude the current image index
        do {
          randomIndex = Math.floor(Math.random() * this.availableImages.length);
        } while (randomIndex === this.currentImageIndex);
      } else {
        // Current image is uploaded or not set; pick any random index
        randomIndex = Math.floor(Math.random() * this.availableImages.length);
      }

      this.imageSrc = this.availableImages[randomIndex];
      this.imageNeedsProcessing = true;
      this.boundingBoxes = []; // Clear existing bounding boxes
      this.apiResults = null;  // Clear previous API results
      this.currentResultIndex = 0;
      this.currentImageIndex = randomIndex;
      this.currentImageSourceType = 'local';
    },

    // Fetch token and send image to API
    async fetchTokenAndSendImage() {
      try {
        // Directly call sendImageToAPI as token management is moved to serverless function
        await this.sendImageToAPI();
      } catch (error) {
        console.error("Error in fetchTokenAndSendImage: ", error);
      }
    },

    // Send image to API
    async sendImageToAPI() {
      try {
        const imgElement = this.$refs.demoImage; // Get reference to the image element

        if (!imgElement) {
          throw new Error("Image element not found. Ensure the ref is correctly set.");
        }

        // Convert image to Blob
        const response = await fetch(this.imageSrc);
        if (!response.ok) {
          throw new Error(`Failed to fetch image from src: ${this.imageSrc}`);
        }
        const imageBlob = await response.blob();
        const file = new File([imageBlob], "demo-image.jpg", { type: imageBlob.type });

        // Prepare FormData for the API request
        const formData = new FormData();
        formData.append('file', file);

        // Send to your Netlify Function
        const bboxResponse = await fetch('/.netlify/functions/analyze', {
          method: 'POST',
          body: formData,
        });

        if (!bboxResponse.ok) {
          throw new Error(`Server error: ${bboxResponse.status}`);
        }

        // Parse the response and store bounding boxes
        const bboxes = await bboxResponse.json();
        this.processBoundingBoxes(bboxes);

      } catch (error) {
        console.error("Failed to process image: ", error);
      }
    },

    // Process bounding boxes and display them on the image
    processBoundingBoxes(bboxes) {
      if (bboxes.length > 0) {
        this.boundingBoxes = bboxes;
        // Automatically click the first bounding box with index 0
        this.onBoundingBoxClick(bboxes[0], 0);
      } else {
        // If no bounding boxes, create a bbox covering the entire image
        const fullImageBBox = {
          x: 0,
          y: 0,
          w: this.imageWidth,
          h: this.imageHeight,
        };
        const bboxObj = { bbox: fullImageBBox };
        this.boundingBoxes = [bboxObj];
        // Automatically click this bbox
        this.onBoundingBoxClick(bboxObj, 0);
      }
    },

    // Method to calculate styles for bounding boxes
    getBoundingBoxStyle(bbox, index) {
      const imgElement = this.$refs.demoImage;
      if (!imgElement) {
        console.error("Image element not found.");
        return {};
      }

      const currentWidth = imgElement.clientWidth;
      const currentHeight = imgElement.clientHeight;

      const scaleX = currentWidth / this.imageWidth;
      const scaleY = currentHeight / this.imageHeight;

      const isHovered = this.hoveredBBoxIndex === index;
      const isActive = this.activeBBoxIndex === index;

      // Define padding (in pixels)
      const paddingTop = 10; // 10px breathing room

      // Adjust styles based on hover or active state
      let borderThicknessVar = this.borderThickness;
      let borderColorVar = this.borderColor;
      let fillOpacityVar = this.boxOpacity;
      let transformVar = 'scale(1)';
      let backgroundColorVar;

      if (isActive || isHovered) {
        borderThicknessVar = this.borderThickness + 1;
        borderColorVar = '#00AFE6'; // Active/Hover color
        fillOpacityVar = this.boxOpacity + 0.1;
        transformVar = 'scale(1.05)';
        backgroundColorVar = `rgba(0, 175, 230, ${fillOpacityVar})`;
      } else {
        backgroundColorVar = `rgba(155, 81, 224, ${this.boxOpacity})`;
      }

      // Adjust the y-coordinate of the bounding box with padding
      let adjustedBBoxY = bbox.y;
      const maxBBoxY = this.imageHeight - bbox.h;

      if (adjustedBBoxY < paddingTop / scaleY) {
        adjustedBBoxY = paddingTop / scaleY; // Shift down with padding
      } else if (adjustedBBoxY > maxBBoxY - paddingTop / scaleY) {
        adjustedBBoxY = maxBBoxY - paddingTop / scaleY; // Shift up with padding
      }

      // Calculate adjusted positions and sizes
      const adjustedLeft = bbox.x * scaleX;
      const adjustedTop = adjustedBBoxY * scaleY; // + paddingTop; // Add padding to the top
      const adjustedWidth = bbox.w * scaleX;
      const adjustedHeight = bbox.h * scaleY;

      return {
        position: 'absolute',
        top: `${adjustedTop}px`,
        left: `${adjustedLeft}px`,
        width: `${adjustedWidth}px`,
        height: `${adjustedHeight}px`,
        border: `${borderThicknessVar}px solid ${borderColorVar}`,
        backgroundColor: backgroundColorVar,
        borderRadius: '5px',
        boxSizing: 'border-box',
        transform: transformVar,
        transition: 'all 0.3s ease',
      };
    },

    // Handle bounding box click
    onBoundingBoxClick(bboxObj, index) {
      // Clear previous results
      this.apiResults = null;
      this.currentResultIndex = 0;
      this.preloadedImages = []; // Clear preloaded images
      // Set the activeBBoxIndex to the clicked bbox's index
      this.activeBBoxIndex = index;
      // Just crop & send directly to our serverless proxy:
      this.cropAndSendImage(bboxObj.bbox);
    },

    // Crop the image according to the bounding box and send it to the API
    cropAndSendImage(bbox) {
      const img = this.$refs.demoImage;
      const canvas = document.createElement('canvas');
      const ctx    = canvas.getContext('2d');

      // Canvas ölçülerini ayarla
      canvas.width  = bbox.w;
      canvas.height = bbox.h;

      // Y-koordinatını sınırla
      let y = Math.max(0, Math.min(bbox.y, this.imageHeight - bbox.h));
      ctx.drawImage(img, bbox.x, y, bbox.w, bbox.h, 0, 0, bbox.w, bbox.h);

      // Blob -> Base64 -> JSON ile search fonksiyonuna POST
      canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result.split(',')[1];  // data kısmı

          try {
            const res = await fetch('/.netlify/functions/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ bbox, imageData: base64 })
            });
            if (!res.ok) throw new Error(res.statusText);

            // Gelen arama sonuçlarını ata
            this.apiResults = await res.json();
            this.currentResultIndex = 0;
            this.preloadImagesAndSetContainerHeight();
          } catch (err) {
            console.error('Search failed:', err);
          }
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg');
    },


    // Preload images and set the container's min-height
    async preloadImagesAndSetContainerHeight() {
      if (this.apiResults && this.apiResults.website_results && this.apiResults.website_results.length > 0) {
        const imageHeights = await Promise.all(this.apiResults.website_results.map((result, index) => {
          return new Promise(resolve => {
            const img = new Image();
            img.src = result.spaces_dir;
            img.onload = () => {
              // Apply the same styles as .result-image to the image
              img.style.maxHeight = '250px';
              img.style.maxWidth = '300px';
              img.style.width = '100%';
              img.style.height = '100%';
              img.style.objectFit = 'contain';

              // Store the preloaded image
              this.preloadedImages[index] = img.src;

              // Create a temporary container to hold the image
              const tempDiv = document.createElement('div');
              tempDiv.style.visibility = 'hidden';
              tempDiv.style.position = 'absolute';
              tempDiv.style.top = '0';
              tempDiv.style.left = '0';
              tempDiv.style.width = '300px'; // max-width of .result-image
              tempDiv.style.height = '250px'; // max-height of .result-image
              tempDiv.appendChild(img);
              document.body.appendChild(tempDiv);

              // Get the displayed height of the image
              const displayedHeight = img.clientHeight;

              // Clean up the temporary elements
              document.body.removeChild(tempDiv);

              resolve(displayedHeight);
            };

            img.onerror = () => {
              console.error(`Failed to preload image: ${result.spaces_dir}`);
              // Assign a default height if image fails to load
              resolve(0);
            };
          });
        }));

        const tallestHeight = Math.max(...imageHeights);
        // Add extra space for text and other elements (adjust as needed)
        this.containerMinHeight = tallestHeight + 150;
      } else {
        // If no results, set a default min-height
        this.containerMinHeight = 300; // Adjust as needed
      }
    },

    // Update displayed image size when the image loads or window resizes
    updateDisplayedImageSize() {
      const img = this.$refs.demoImage;
      if (img) {
        let naturalWidth = img.naturalWidth;
        let naturalHeight = img.naturalHeight;

        // Check if the image height exceeds the maximum height
        if (naturalHeight > this.maxImageHeight) {
          const scalingFactor = this.maxImageHeight / naturalHeight;
          this.displayedImageHeight = this.maxImageHeight;
          this.displayedImageWidth = naturalWidth * scalingFactor;
        } else {
          this.displayedImageHeight = img.clientHeight;
          this.displayedImageWidth = img.clientWidth;
        }
      }
    },

    // Initialize ResizeObserver to monitor image size changes
    initResizeObserver() {
      const img = this.$refs.demoImage;
      if (img) {
        this.resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            if (entry.target === img) {
              this.displayedImageWidth = img.clientWidth;
              this.displayedImageHeight = img.clientHeight;
            }
          }
        });
        this.resizeObserver.observe(img);
      }
    },

    // Cleanup ResizeObserver
    destroyResizeObserver() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    },

    // Method called when image is loaded
    onImageLoad() {
      const img = this.$refs.demoImage;
      if (img) {
        this.imageWidth = img.naturalWidth;
        this.imageHeight = img.naturalHeight;
      }
      this.updateDisplayedImageSize();
      this.initResizeObserver(); // Start observing size changes
      if (this.imageNeedsProcessing) {
        this.fetchTokenAndSendImage(); // Now that the image is loaded, fetch token and send image
        this.imageNeedsProcessing = false; // Reset the flag
      }
    },

    // Initialize availableImages array by importing all images from assets/api_images/
    initializeAvailableImages() {
      this.availableImages = requireImages.keys().map(key => requireImages(key));
    },

    // Select a random image from availableImages
    selectRandomImage() {
      if (this.availableImages.length === 0) {
        console.error('No images found in assets/api_images/.');
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.availableImages.length);
      this.imageSrc = this.availableImages[randomIndex];
      this.imageNeedsProcessing = true;
      this.boundingBoxes = []; // Clear existing bounding boxes
      this.apiResults = null;  // Clear previous API results
      this.currentResultIndex = 0;
      this.currentImageIndex = randomIndex;
      this.currentImageSourceType = 'local';
    },
  },
  created() {
    // Initialize availableImages when the component is created
    this.initializeAvailableImages();
    // Select a random image to display initially
    this.selectRandomImage();
  },
  mounted() {
    // The @load event on the img tag handles onImageLoad
    window.addEventListener('resize', this.updateDisplayedImageSize);

    // Add paste event listener
    window.addEventListener('paste', this.handlePasteEvent);

  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateDisplayedImageSize);
    window.removeEventListener('paste', this.handlePasteEvent);
    
    this.destroyResizeObserver(); // Clean up observer
  },
};
</script>


<style scoped>
/* API Search Section */
.api-search-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 70vh;
  background: #10113300; /* Transparent background */
  padding: 0px;
}

.playground-container {
  width: 100%;
  max-width: 1000px;
  padding: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #9b51e0;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  text-align: left;
  margin-top: 25px;
  overflow: hidden; /* Ensure content doesn't overflow */
}

/* Playground content styling */
.playground-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #ccc;
}

.right-content {
  flex: 1;
  color: #ffffff;
  text-align: left;
  padding-left: 20px;
}

/* Styling for the Playground Title */
.playground-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 15px;
}

/* Styling for the List Steps */
.playground-content ol li {
  font-size: 1rem;
  font-weight: 300;
  color: #dddddd;
  margin-left: 20px;
}

/* Styling the List Numbers */
.playground-content ol li::marker {
  color: #9b51e0;
  font-weight: bold;
}

.playground-content ol li span {
  color: #9b51e0;
}

/* Image processing container */
.image-processing-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
}

.demo-image-container {
  flex: 1;
  margin: 0;
  max-width: 100%;
}

.demo-image {
  background: rgba(32, 12, 60, 0.8);
  border-radius: 15px;
  padding: 0px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 475px;  /* Set maximum width */
  max-height: 250px; /* Set maximum height */
  margin: 0 auto;    /* Center the container */
  overflow: hidden;  /* Ensure bounding boxes don't overflow */
}

.image-container {
  position: relative;
  display: inline-block; /* Changed from width: 100% to inline-block */
}

.demo-image img {
  max-width: 475px;  /* Set a maximum width */
  max-height: 250px; /* Set a maximum height */
  width: auto;
  height: auto;
  object-fit: contain; /* Maintains aspect ratio */
  border-radius: 10px;
}

/* Bounding Boxes */
.bounding-box {
  position: absolute;
  cursor: pointer;
}

/* Demo Buttons */
.demo-buttons {
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
}

.demo-button {
  background-color: #6A1D85;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.demo-button:hover {
  background-color: #7326a6;
}

/* API Results Styling */
.api-results {
  margin-top: 20px;
}

.result-item {
  text-align: center;
}

.result-content {
  display: flex;
  align-items: center;
}

.result-image {
  max-height: 250px; /* Set a maximum height */
  max-width: 250px;  /* Set a maximum width */
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensures the image maintains aspect ratio */
  border-radius: 10px;
  margin-right: 20px; /* Space between image and text */
}

.result-details {
  color: #ffffff;
  text-align: left;
  margin: 0;
}

.result-details h3 {
  font-size: 1.2rem;
  margin: 0;
}

.result-details p {
  margin: 0;
}

/* Styling for "ArtVista's choice" */
.artvista-choice {
  display: block;
  font-size: 1.2rem; /* Adjust the font size as needed */
  font-weight: bold;
  margin-bottom: 5px;
  background: linear-gradient(45deg, #03fd6b, #ffa600, #ff5e00 );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientAnimation 5s linear infinite;
}

/* Keyframes for the gradient animation */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.pagination-buttons {
  margin-top: 10px;
  text-align: center;
}

.pagination-button {
  background-color: #9b51e0;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #7326a6;
}

/* Active Pagination Button */
.pagination-button.active {
  background-color: #7326a6;
  border: 2px solid #ffffff;
}

.pagination-button.active:hover {
  background-color: #5a1f94;
}

/* Fade-in and Fade-out animation */
.fade-enter-active, .fade-leave-active, .fade-appear-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to, .fade-appear-from {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from, .fade-appear-to {
  opacity: 1;
}

/* Loading Indicator */
.loading-indicator {
  text-align: center;
  color: #ffffff;
  font-size: 1.2rem;
  margin-top: 20px;
}

/* Responsive Adjustments */

/* Laptop Screens */
@media (min-width: 1024px) and (max-width: 1440px) {
  .playground-title {
    font-size: 1.5rem;
  }

  .playground-content ol li {
    font-size: 1.1rem;
  }
}

/* Tablets and Smaller Laptops */
@media (max-width: 1024px) {
  .playground-container {
    padding: 25px;
  }

  .playground-title {
    font-size: 1.3rem;
  }

  .playground-content ol li {
    font-size: 1rem;
  }

  .image-processing-container {
    flex-direction: column;
    align-items: center;
  }
}

/* Mobile Devices */
@media (max-width: 768px) {
  .playground-container {
    padding: 20px;
  }

  .playground-title {
    font-size: 1.2rem;
  }

  .playground-content ol li {
    font-size: 0.9rem;
  }

  .playground-content {
    flex-direction: column;
    align-items: flex-start; /* Changed from center to flex-start */
  }

  .right-content {
    padding-left: 0;
    text-align: left; /* Changed from center to left */
    width: 100%; /* Ensures full width usage */
    max-width: none; /* Removes width constraints */
  }

  .playground-content ol li {
    margin-left: 0;
  }

  .image-processing-container {
    flex-direction: column;
    align-items: center;
  }

  .result-content {
    flex-direction: column;
    align-items: center;
  }

  .result-image {
    margin-right: 0;
    margin-bottom: 10px;
    width: 100%;
    max-width: none;
    height: auto;
  }

  .result-details {
    text-align: center;
  }

  /* Responsive Image Adjustments */
  .demo-image {
    max-width: 100%; /* Remove fixed max-width */
    width: 100%;     /* Ensure container takes full width */
    max-height: none;/* Remove fixed max-height */
    height: auto;    /* Let height adjust based on width */
  }

  .demo-image img {
    width: 100%;      /* Make image take full container width */
    height: auto;     /* Maintain aspect ratio */
    max-width: 100%;  /* Remove fixed max-width */
    max-height: none; /* Remove fixed max-height */
  }

}
</style>
