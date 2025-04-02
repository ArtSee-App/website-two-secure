<template>
    <div class="web-design">
      <h1>
        <span class="intro">{{ intro }}</span>
        <span class="portal">{{ portal }}</span>
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
      
      <!-- Yeni Eklenen Butonlar -->
      <div class="additional-buttons">
        <button class="info-button" @click="handleRoadMap">
          <span class="emoji">🗺️</span>
          <span class="button-text">{{ roadmap_button }}</span>
        </button>
        <button class="info-button" @click="handleMoreInfo('artists')">
          <span class="emoji">🎨</span>
          <span class="button-text">{{ artist_button }}</span>
        </button>
        <button class="info-button" @click="handleMoreInfo('museums')">
          <span class="emoji">🏛️</span>
          <span class="button-text">{{museum_button}}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WebDesign",
    data() {
      return {
        intro: "Introducing",
        portal: "ArtVista Portal",
        description:
          "Keep all your artworks in one place, completely organized, hassle-free and it’s 100% free for artists!",
        artist_button: "Register as an Artist & Individual",
        museum_button: "Contact for Museums & Institutes",
        roadmap_button: "ArtVista's Road Map and Plans for the Portal",
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
    flex-wrap: wrap; /* Satır taşmasını önlemek için */
    position: relative;
    z-index: 1; /* Arka plan resimlerinin üzerinde yer alır */
  }
  
  /* "Introducing" Bölümü */
  .intro {
    font-weight: 100; /* Daha düşük ağırlık */
    font-style: italic; /* İtalik */
    color: #ffffff; /* Beyaz renk */
    margin-right: 15px; /* İki kelime arasında biraz boşluk */
  }
  
  /* "ArtVista Portal" Bölümü */
  .portal {
    font-weight: 700; /* Daha kalın */
    font-style: normal; /* Normal yazı stili */
    background: linear-gradient(90deg, #1D88F0, #C002B0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /* Alternatif tarayıcı desteği için ek prefixler */
    background-clip: text;
    color: transparent;
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
  
  /* Yeni Eklenen Butonlar */
  .additional-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 30px; /* iMac görüntüsü ile butonlar arasında boşluk */
  }
  
  .info-button {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    color: #e9e9e9;
    font-size: 1rem;
    transition: transform 0.3s ease, background 0.3s ease;
    width: 280px;
    min-height: 80px;
    position: relative;
    overflow: hidden;
  }
  
  .info-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #03C1FD, #B902A7, #fda503);
    background-size: 200% 200%;
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: -1;
    border-radius: 12px; /* Butonla uyumlu köşe yuvarlama */
  }
  
  /* Hover Effects for Info Button */
  .info-button:hover::before {
    opacity: 1;
    animation: gradientAnimation 5s linear infinite;
  }
  
  .info-button:hover,
  .info-button.active {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.2);
  }
  
  /* Emoji Styling */
  .info-button .emoji {
    font-size: 1.5rem; /* Emoji büyüklüğü */
    margin-right: 15px; /* Emoji ile metin arasındaki boşluk */
    flex-shrink: 0;
  }
  
  /* Text Styling */
  .info-button .button-text {
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
  }
  
  /* Gradient Animation */
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
  
  /* Responsive Tasarım */
  @media (max-width: 768px) {
    .web-design h1 {
      font-size: 2rem;
      flex-direction: row; /* Yatay hizalama devam eder */
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
  
    .additional-buttons {
      gap: 15px;
      margin-top: 20px;
      align-items: center; /* Butonları ortalamak için eklendi */
    }
  
    .info-button {
      width: 100%;
      max-width: 350px;
      padding: 15px 10px;
      font-size: 0.9rem;
      min-height: 70px;
    }
  
    .info-button .emoji {
      font-size: 1.3rem;
      margin-right: 10px;
    }
  
    .info-button .button-text {
      font-size: 0.9rem;
    }
  
    /* Arka Plan Görsellerini Mobilde Gizle */
    .background-images {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .web-design h1 {
      font-size: 1.8rem;
      flex-direction: column; /* Dikey hizalama */
      align-items: center; /* Merkezi hizalama */
    }
  
    .intro {
      margin-right: 0; /* Sağ boşluğu kaldır */
      margin-bottom: 10px; /* Alt boşluk ekle */
    }
  
    .description {
      font-size: 0.9rem;
    }
  
    .imac-image {
      width: 95%;
    }
  
    .background-image {
      width: 100px !important; /* Arka plan resimlerinin boyutunu daha da küçült */
    }
  
    .additional-buttons {
      flex-direction: column;
      gap: 10px;
      align-items: center; /* Butonları ortalamak için eklendi */
    }
  
    .info-button {
      width: 100%;
      max-width: 300px;
      padding: 10px 5px;
      font-size: 0.8rem;
      min-height: 60px;
    }
  
    .info-button .emoji {
      font-size: 1.2rem;
      margin-right: 8px;
    }
  
    .info-button .button-text {
      font-size: 0.8rem;
    }
  
    /* Arka Plan Görsellerini Mobilde Gizle */
    .background-images {
      display: none;
    }
  }
  </style>
  
  