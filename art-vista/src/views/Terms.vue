<!-- src/views/TermsAndConditions.vue -->
<template>
    <div class="terms-page">
      <Header />
      <main>
        <h1 class="animated-title">Terms and Conditions 📄</h1>
  
        <!-- Terms and Conditions Content -->
        <div class="terms-content">
          <h2>ArtVista Terms and Conditions</h2>
          <p>
            These terms and conditions apply to the ArtVista app (hereafter referred to as the "Application") for mobile devices that was created by Vista Technologies B.V. (hereafter referred to as the "Service Provider") as a freemium service.
          </p>
  
          <p>
            By downloading or using the Application, you agree to these terms. Please read them carefully before using the Application. Unauthorized copying or modification of the Application, any part of the Application, or our trademarks is strictly prohibited. Attempting to extract the source code of the Application, translating it into other languages, or creating derivative versions is not permitted. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.
          </p>
  
          <p>
            The Service Provider is committed to ensuring that the Application is as useful and efficient as possible. Therefore, we reserve the right to make changes to the Application or to charge for its services at any time and for any reason. We will never charge you for the Application or its services without making it clear to you exactly what you're paying for.
          </p>
  
          <p>
            The Application stores and processes personal data that you have provided to us in order to provide our service. It is your responsibility to keep your device and access to the Application secure. We strongly advise against jailbreaking or rooting your device, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your device vulnerable to malware, viruses, and malicious programs, compromise your device's security features, and it could mean that the Application will not work properly or at all.
          </p>
  
          <p>
            The Application does use third-party services that declare their own Terms and Conditions. Links to Terms and Conditions of third-party service providers used by the Application:
          </p>
  
          <ul>
            <li>
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Google Play Services</a>
            </li>
            <li>
              <a href="https://firebase.google.com/terms" target="_blank" rel="noopener noreferrer">Google Analytics for Firebase</a>
            </li>
          </ul>
  
          <p>
            You should be aware that there are certain things that the Service Provider will not take responsibility for. Certain functions of the Application will require an active internet connection. The connection can be Wi-Fi or provided by your mobile network provider, but the Service Provider cannot take responsibility for the Application not working at full functionality if you do not have access to Wi-Fi or if you have no data allowance left.
          </p>
  
          <p>
            If you are using the Application outside of an area with Wi-Fi, you should remember that your agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the Application or other third-party charges. By using the Application, you accept responsibility for any such charges, including roaming data charges if you use the Application outside of your home territory without turning off data roaming. If you are not the bill payer for the device on which you're using the Application, please be aware that we assume that you have received permission from the bill payer for using the Application.
          </p>
  
          <p>
            Along the same lines, the Service Provider cannot always take responsibility for the way you use the Application. For example, you need to ensure that your device stays charged—if it runs out of battery and you can't turn it on to avail the Service, the Service Provider cannot accept responsibility.
          </p>
  
          <p>
            With respect to the Service Provider's responsibility for your use of the Application, when you are using the Application, it's important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. The Service Provider accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the Application.
          </p>
  
          <p>
            At some point, we may wish to update the Application. The Application is currently available on Android and iOS—the requirements for both systems (and for any additional systems we decide to extend the availability of the Application to) may change, and you'll need to download the updates if you want to keep using the Application. The Service Provider does not promise that it will always update the Application so that it is relevant to you and/or works with the Android and iOS versions that you have installed on your device. However, you agree to accept updates to the Application when offered. We may also wish to stop providing the Application and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the Application and delete it from your device.
          </p>
  
          <h2>Changes to These Terms and Conditions</h2>
          <p>
            We may update our Terms and Conditions from time to time. Therefore, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page.
          </p>
  
          <p>
            These terms and conditions are effective as of September 16, 2024.
          </p>
  
          <h2>Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at <a href="mailto:contact@artvista.app">contact@artvista.app</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'TermsAndConditions',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        // No additional data properties needed
      };
    }
  };
  </script>
  
  <style scoped>
  .terms-page {
    padding-top: 80px; /* Adjust based on your header height */
  }
  
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .animated-title {
    position: relative;
    text-align: left;
    color: #ffffff;
    margin-bottom: 40px;
    font-size: 2.5rem;
    cursor: pointer;
    overflow: hidden;
  }
  
  .animated-title::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #03C1FD, #B902A7, #fda503);
    background-size: 400% 400%;
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: -1;
    border-radius: 8px;
  }
  
  .animated-title:hover::before {
    opacity: 1;
    animation: gradientAnimation 5s linear infinite;
  }
  
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
  
  /* Styles for the terms content */
  .terms-content {
    color: #e9e9e9;
    line-height: 1.6;
    font-size: 1rem;
  }
  
  .terms-content h2 {
    color: #ffffff;
    font-size: 1.8rem;
    margin-top: 30px;
  }
  
  .terms-content p {
    margin-bottom: 20px;
  }
  
  .terms-content ul {
    margin-left: 20px;
    list-style-type: disc;
  }
  
  .terms-content li {
    margin-bottom: 10px;
  }
  
  .terms-content a {
    color: #9b51e0;
    text-decoration: underline;
  }
  
  .terms-content a:hover {
    color: #b060ff;
  }
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .animated-title {
      font-size: 1.8rem;
    }
  
    main {
      padding: 15px;
    }
  
    .terms-content {
      font-size: 0.9rem;
    }
  
    .terms-content h2 {
      font-size: 1.5rem;
    }
  }
  </style>
  