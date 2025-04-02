<template>
    <div class="web-design">
      <h1>
        <span class="portal-text">View, Manage, Control</span>
      </h1>
      <div>
        <span class="description">{{ description }}</span>
      </div>
      
      <!-- Arka Plan Görselleri -->
      <div class="background-images">
        <img
          v-for="(image, index) in backgroundImages"
          :key="index"
          :src="image.src"
          class="background-image"
          :style="{
            top: image.top,
            left: image.left,
            width: image.width,
            transform: 'rotate(' + image.rotation + 'deg)',
            filter: 'blur(' + image.blur + 'px)',
            opacity: image.opacity,
            borderRadius: image.borderRadius,
          }"
          alt="Background Art"
          loading="lazy"
        />
      </div>
      
      <!-- iMac Görüntüsü -->
      <div class="imac-container">
        <img :src="imacImage" alt="iMac" class="imac-image" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WebDesign",
    data() {
      return {
        intro: "View",
        portal: "Manage",
        description:
          "Keep all your artworks in one place, completely organized, hassle-free and it's 100% free for artists!",
        imacImage: require('@/assets/imac.png'), // iMac görüntüsünü içe aktarıyoruz
        backgroundImages: [
          {
            src: require('@/assets/background_paintings/edge_of_wood.jpg'),
            top: '25%',
            left: '0%',
            width: '250px',
            rotation: -10,
            blur: 2.5,
            opacity: 0.7,
            borderRadius: '15px',
          },
          {
            src: require('@/assets/background_paintings/poplars.jpg'),
            top: '20%',
            left: '70%',
            width: '300px',
            rotation: 15,
            blur:1.5,
            opacity: 0.8,
            borderRadius: '20px',
          },
          {
            src: require('@/assets/background_paintings/the_seine_at_cour.jpg'),
            top: '60%',
            left: '75%',
            width: '200px',
            rotation: -5,
            blur: 2.5,
            opacity: 0.7,
            borderRadius: '10px',
          },
          {
            src: require('@/assets/background_paintings/the_mower.jpg'),
            top: '60%',
            left: '0%',
            width: '350px',
            rotation: 10,
            blur: 0.5,
            opacity: 0.8,
            borderRadius: '25px',
          },
        ],
      };
    },
    methods: {
      handleMoreInfo(category) {
        // Burada kategoriye göre yönlendirme veya bilgi gösterme işlemi yapabilirsiniz
        alert(`More information for ${category}.`);
      },
      handleRoadMap() {
        // Road map sayfasına yönlendirme yapabilirsiniz
        alert('Road Map clicked.');
      }
    },
  };
  </script>
  
  <style scoped>
  .web-design {
    position: relative; /* Arka plan görüntülerini pozisyonlamak için */
    text-align: center;
    margin-top: 50px;
  }
  
  /* Arka Plan Görselleri */
  .background-images {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0; /* iMac görüntüsünün arkasında yer alacak */
    /* Taşmaları engelleyen overflow: hidden özelliğini kaldırdık */
    /* overflow: hidden; */
  }
  
  .background-image {
    position: absolute;
    /* Diğer stiller inline olarak atanıyor */
    pointer-events: none; /* Arka plan resimlerinin tıklanabilir olmasını engeller */
  }
  
  /* Başlık Stilleri */
  .web-design h1 {
    font-family: 'Inter', sans-serif;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
    gap: 15px;
  }
  
  /* Portal Text Stili */
  .portal-text {
    font-weight: 500;
    font-style: normal;
    color: rgba(255, 255, 255, 0.9);
  }
  
  /* Açıklama Metni */
  .description {
    display: block; /* span yerine block yaparak tam genişlik almasını sağlıyoruz */
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    color: #ffffff;
    margin-top: 20px;
    position: relative;
    z-index: 1; /* Arka plan resimlerinin üzerinde yer alır */
  }
  
  /* iMac Görüntüsü İçin Konteyner */
  .imac-container {
    position: relative;
    margin-top: 0px; /* Açıklama metni ile arasında boşluk bırakır */
    z-index: 1; /* Arka plan resimlerinin üzerinde yer alır */
  }
  
  /* iMac Görüntüsü */
  .imac-image {
    width: 70%; /* İhtiyaca göre boyutlandırabilirsiniz */
    height: auto;
  }
  
  /* Responsive Tasarım */
  @media (max-width: 768px) {
    .web-design h1 {
      font-size: 2rem;
      flex-direction: row;
      gap: 10px;
    }
  
    .description {
      font-size: 1rem;
    }
  
    .imac-image {
      width: 95%;
    }
  
    .background-image {
      width: 120px !important; /* Arka plan resimlerinin boyutunu küçült */
    }
  }
  
  @media (max-width: 480px) {
    .web-design h1 {
      font-size: 1.8rem;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }
  
    .portal-text {
      margin-right: 0;
      margin-bottom: 0;
    }
  
    .description {
      font-size: 0.9rem;
    }
  
    .imac-image {
      width: 95%;
    }
  
    /* Arka Plan Görsellerini Mobilde Gizle */
    .background-images {
      display: none;
    }
  }
  </style>
  
  