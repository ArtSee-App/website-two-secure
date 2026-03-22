<template>
  <section class="api-search-section">
    <div class="playground-card">

      <!-- Steps bar -->
      <div class="steps-bar">
        <span class="step" :class="{ done: imageSrc }">1. Upload or pick a photo</span>
        <span class="step-divider">→</span>
        <span class="step" :class="{ done: boundingBoxes.length > 0 }">2. Wait for detection</span>
        <span class="step-divider">→</span>
        <span class="step" :class="{ done: !!apiResults }">3. Click a highlighted area</span>
        <span class="step-divider">→</span>
        <span class="step" :class="{ done: !!apiResults }">4. View results</span>
      </div>

      <div class="playground-body">

        <!-- Left: image panel -->
        <div class="image-panel">
          <div class="image-frame">
            <div class="image-container">
              <img
                ref="demoImage"
                :src="imageSrc"
                alt="Demo Image"
                @load="onImageLoad"
              />
              <!-- Analyzing overlay -->
              <div class="analyzing-overlay" v-if="analyzingImage">
                <div class="spinner"></div>
                <span>Detecting paintings...</span>
              </div>
              <!-- Bounding boxes -->
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

          <!-- Error message -->
          <div class="error-msg" v-if="errorMessage">{{ errorMessage }}</div>

          <!-- Buttons -->
          <div class="image-buttons">
            <button class="btn btn-primary" @click="triggerFileUpload">
              Upload photo
            </button>
            <button class="btn btn-secondary" @click="fetchRandomPhoto">
              Try a random photo
            </button>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="handleImageUpload"
              style="display: none;"
            />
          </div>
        </div>

        <!-- Right: results panel -->
        <div class="results-panel">
          <!-- Idle state -->
          <div class="results-idle" v-if="!apiResults && !searchingArtwork">
            <p>Click a detected area on the image to identify the artwork.</p>
          </div>

          <!-- Loading skeleton -->
          <div class="results-loading" v-if="searchingArtwork">
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton-lines">
              <div class="skeleton skeleton-line long"></div>
              <div class="skeleton skeleton-line medium"></div>
              <div class="skeleton skeleton-line short"></div>
            </div>
          </div>

          <!-- Results -->
          <transition name="fade" mode="out-in">
            <div class="result-card" v-if="apiResults && currentResult && !searchingArtwork" :key="currentResultIndex">
              <span class="artvista-choice" v-if="currentResultIndex === 0">ArtVista's pick</span>
              <img
                :src="preloadedImages[currentResultIndex]"
                alt="Artwork"
                class="result-image"
              />
              <div class="result-details">
                <h3 class="result-title">{{ currentResult.title }}</h3>
                <p class="result-artist">{{ currentResult.artist }}</p>
                <p class="result-score">
                  <span class="score-label">Confidence</span>
                  <span class="score-value">{{ apiResults.scores[currentResultIndex] }}%</span>
                </p>
              </div>
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
          </transition>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
const requireImages = require.context('@/assets/api_images', false, /\.(png|jpe?g|svg)$/i);

export default {
  name: "ApiSearch",
  data() {
    return {
      imageSrc: '',
      boundingBoxes: [],
      imageWidth: 0,
      imageHeight: 0,
      displayedImageWidth: 0,
      displayedImageHeight: 0,
      boxOpacity: 0.2,
      borderThickness: 2,
      borderColor: '#9b51e0',
      fillColor: 'rgba(155, 81, 224, 1)',
      hoveredBBoxIndex: null,
      activeBBoxIndex: null,
      maxImageHeight: 350,
      maxImageWidth: 400,
      resizeObserver: null,
      apiResults: null,
      currentResultIndex: 0,
      imageNeedsProcessing: false,
      containerMinHeight: 0,
      preloadedImages: [],
      availableImages: [],
      currentImageIndex: null,
      currentImageSourceType: 'local',
      analyzingImage: false,
      searchingArtwork: false,
      errorMessage: '',
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
        return this.apiResults.website_results.map((_, index) => index + 1);
      }
      return [];
    },
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.boundingBoxes = [];
        this.apiResults = null;
        this.errorMessage = '';
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
          this.imageNeedsProcessing = true;
          this.currentImageSourceType = 'uploaded';
          this.currentImageIndex = null;
          this.$refs.fileInput.value = null;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image file.');
        this.$refs.fileInput.value = null;
      }
    },

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
            this.boundingBoxes = [];
            this.apiResults = null;
            this.currentResultIndex = 0;
            this.errorMessage = '';
          };
          reader.readAsDataURL(blob);
          event.preventDefault();
          break;
        }
      }
    },

    fetchRandomPhoto() {
      if (this.availableImages.length === 0) return;
      let randomIndex;
      if (this.availableImages.length === 1) {
        randomIndex = 0;
      } else if (this.currentImageSourceType === 'local' && this.currentImageIndex !== null) {
        do {
          randomIndex = Math.floor(Math.random() * this.availableImages.length);
        } while (randomIndex === this.currentImageIndex);
      } else {
        randomIndex = Math.floor(Math.random() * this.availableImages.length);
      }
      this.imageSrc = this.availableImages[randomIndex];
      this.imageNeedsProcessing = true;
      this.boundingBoxes = [];
      this.apiResults = null;
      this.currentResultIndex = 0;
      this.currentImageIndex = randomIndex;
      this.currentImageSourceType = 'local';
      this.errorMessage = '';
    },

    async fetchTokenAndSendImage() {
      try {
        await this.sendImageToAPI();
      } catch (error) {
        console.error("Error in fetchTokenAndSendImage: ", error);
      }
    },

    async sendImageToAPI() {
      this.analyzingImage = true;
      this.errorMessage = '';
      try {
        const response = await fetch(this.imageSrc);
        if (!response.ok) throw new Error(`Failed to fetch image`);
        const imageBlob = await response.blob();
        const file = new File([imageBlob], "demo-image.jpg", { type: imageBlob.type });

        const formData = new FormData();
        formData.append('file', file);

        const bboxResponse = await fetch('/.netlify/functions/analyze', {
          method: 'POST',
          body: formData,
        });

        if (!bboxResponse.ok) throw new Error(`Detection failed (${bboxResponse.status})`);

        const bboxes = await bboxResponse.json();
        this.processBoundingBoxes(bboxes);
      } catch (error) {
        this.errorMessage = error.message || 'Detection failed. Please try again.';
        console.error("Failed to process image: ", error);
      } finally {
        this.analyzingImage = false;
      }
    },

    processBoundingBoxes(bboxes) {
      if (bboxes.length > 0) {
        this.boundingBoxes = bboxes;
        this.onBoundingBoxClick(bboxes[0], 0);
      } else {
        const fullImageBBox = { x: 0, y: 0, w: this.imageWidth, h: this.imageHeight };
        const bboxObj = { bbox: fullImageBBox };
        this.boundingBoxes = [bboxObj];
        this.onBoundingBoxClick(bboxObj, 0);
      }
    },

    getBoundingBoxStyle(bbox, index) {
      const imgElement = this.$refs.demoImage;
      if (!imgElement) return {};

      const currentWidth = imgElement.clientWidth;
      const currentHeight = imgElement.clientHeight;
      const scaleX = currentWidth / this.imageWidth;
      const scaleY = currentHeight / this.imageHeight;

      const isHovered = this.hoveredBBoxIndex === index;
      const isActive = this.activeBBoxIndex === index;
      const paddingTop = 10;

      let borderThicknessVar = this.borderThickness;
      let borderColorVar = this.borderColor;
      let fillOpacityVar = this.boxOpacity;
      let backgroundColorVar;

      if (isActive || isHovered) {
        borderThicknessVar = this.borderThickness + 1;
        borderColorVar = '#1D88F0';
        fillOpacityVar = this.boxOpacity + 0.1;
        backgroundColorVar = `rgba(29, 136, 240, ${fillOpacityVar})`;
      } else {
        backgroundColorVar = `rgba(155, 81, 224, ${this.boxOpacity})`;
      }

      let adjustedBBoxY = bbox.y;
      const maxBBoxY = this.imageHeight - bbox.h;
      if (adjustedBBoxY < paddingTop / scaleY) {
        adjustedBBoxY = paddingTop / scaleY;
      } else if (adjustedBBoxY > maxBBoxY - paddingTop / scaleY) {
        adjustedBBoxY = maxBBoxY - paddingTop / scaleY;
      }

      return {
        position: 'absolute',
        top: `${adjustedBBoxY * scaleY}px`,
        left: `${bbox.x * scaleX}px`,
        width: `${bbox.w * scaleX}px`,
        height: `${bbox.h * scaleY}px`,
        border: `${borderThicknessVar}px solid ${borderColorVar}`,
        backgroundColor: backgroundColorVar,
        borderRadius: '5px',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      };
    },

    onBoundingBoxClick(bboxObj, index) {
      this.apiResults = null;
      this.currentResultIndex = 0;
      this.preloadedImages = [];
      this.activeBBoxIndex = index;
      this.cropAndSendImage(bboxObj.bbox);
    },

    cropAndSendImage(bbox) {
      const img = this.$refs.demoImage;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = bbox.w;
      canvas.height = bbox.h;
      let y = Math.max(0, Math.min(bbox.y, this.imageHeight - bbox.h));
      ctx.drawImage(img, bbox.x, y, bbox.w, bbox.h, 0, 0, bbox.w, bbox.h);

      canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result.split(',')[1];
          this.searchingArtwork = true;
          this.errorMessage = '';
          try {
            const res = await fetch('/.netlify/functions/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ bbox, imageData: base64 })
            });
            if (!res.ok) throw new Error(`Search failed (${res.status})`);
            this.apiResults = await res.json();
            this.currentResultIndex = 0;
            this.preloadImagesAndSetContainerHeight();
          } catch (err) {
            this.errorMessage = err.message || 'Search failed. Please try again.';
            console.error('Search failed:', err);
          } finally {
            this.searchingArtwork = false;
          }
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg');
    },

    async preloadImagesAndSetContainerHeight() {
      if (this.apiResults && this.apiResults.website_results && this.apiResults.website_results.length > 0) {
        await Promise.all(this.apiResults.website_results.map((result, index) => {
          return new Promise(resolve => {
            const img = new Image();
            img.src = result.spaces_dir;
            img.onload = () => {
              this.preloadedImages[index] = img.src;
              resolve();
            };
            img.onerror = () => resolve();
          });
        }));
      }
    },

    updateDisplayedImageSize() {
      const img = this.$refs.demoImage;
      if (img) {
        this.displayedImageHeight = img.clientHeight;
        this.displayedImageWidth = img.clientWidth;
      }
    },

    initResizeObserver() {
      const img = this.$refs.demoImage;
      if (img) {
        this.resizeObserver = new ResizeObserver(() => {
          this.displayedImageWidth = img.clientWidth;
          this.displayedImageHeight = img.clientHeight;
        });
        this.resizeObserver.observe(img);
      }
    },

    destroyResizeObserver() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    },

    onImageLoad() {
      const img = this.$refs.demoImage;
      if (img) {
        this.imageWidth = img.naturalWidth;
        this.imageHeight = img.naturalHeight;
      }
      this.updateDisplayedImageSize();
      this.initResizeObserver();
      if (this.imageNeedsProcessing) {
        this.fetchTokenAndSendImage();
        this.imageNeedsProcessing = false;
      }
    },

    initializeAvailableImages() {
      this.availableImages = requireImages.keys().map(key => requireImages(key));
    },

    selectRandomImage() {
      if (this.availableImages.length === 0) return;
      const randomIndex = Math.floor(Math.random() * this.availableImages.length);
      this.imageSrc = this.availableImages[randomIndex];
      this.imageNeedsProcessing = true;
      this.boundingBoxes = [];
      this.apiResults = null;
      this.currentResultIndex = 0;
      this.currentImageIndex = randomIndex;
      this.currentImageSourceType = 'local';
    },
  },
  created() {
    this.initializeAvailableImages();
    this.selectRandomImage();
  },
  mounted() {
    window.addEventListener('resize', this.updateDisplayedImageSize);
    window.addEventListener('paste', this.handlePasteEvent);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateDisplayedImageSize);
    window.removeEventListener('paste', this.handlePasteEvent);
    this.destroyResizeObserver();
  },
};
</script>

<style scoped>
.api-search-section {
  width: 100%;
}

.playground-card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 32px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.playground-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("~@/assets/Bubbles (1).png");
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.4;
}

/* Steps bar */
.steps-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.step {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
  transition: color 0.3s;
}

.step.done {
  color: rgba(255, 255, 255, 0.85);
}

.step-divider {
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.8rem;
}

/* Body: side by side */
.playground-body {
  display: flex;
  gap: 28px;
  align-items: flex-start;
}

/* Image panel */
.image-panel {
  flex: 1;
  min-width: 0;
}

.image-frame {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.image-container img {
  display: block;
  max-width: 100%;
  max-height: 380px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
}

/* Analyzing overlay */
.analyzing-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #1D88F0;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.bounding-box {
  position: absolute;
}

.error-msg {
  margin-top: 10px;
  font-size: 0.85rem;
  color: rgba(255, 100, 100, 0.9);
  background: rgba(255, 0, 0, 0.08);
  border-radius: 8px;
  padding: 8px 12px;
}

/* Buttons */
.image-buttons {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #1D88F0;
  color: white;
}

.btn-primary:hover {
  background: #1a7ada;
  transform: translateY(-1px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

/* Results panel */
.results-panel {
  flex: 1;
  min-width: 0;
  min-height: 380px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.results-idle {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Skeleton loader */
.results-loading {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex: 1;
}

.skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 8px;
}

.skeleton-img {
  width: 110px;
  height: 140px;
  flex-shrink: 0;
}

.skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 8px;
}

.skeleton-line {
  height: 14px;
}

.skeleton-line.long { width: 90%; }
.skeleton-line.medium { width: 65%; }
.skeleton-line.short { width: 40%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Result card */
.result-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.artvista-choice {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 20px;
  background: linear-gradient(45deg, #1D88F0, #BF03B0);
  color: white;
  align-self: flex-start;
}

.result-image {
  width: 100%;
  max-height: 220px;
  object-fit: contain;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.result-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.result-artist {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.result-score {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0 0;
}

.score-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.score-value {
  font-size: 1rem;
  font-weight: 600;
  color: #1D88F0;
}

.pagination-buttons {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.pagination-button {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:hover {
  background: rgba(255, 255, 255, 0.18);
}

.pagination-button.active {
  background: #1D88F0;
  border-color: #1D88F0;
  color: white;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .playground-card {
    padding: 20px;
  }

  .playground-body {
    flex-direction: column;
  }

  .results-panel {
    min-height: 200px;
  }

  .steps-bar {
    display: none;
  }
}
</style>
