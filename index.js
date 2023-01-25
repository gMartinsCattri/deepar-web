var effects = [
    './effects/viking_helmet.deepar',
    './effects/Stallone.deepar',
    './effects/Ping_Pong.deepar',
    './effects/Oscar.deepar',
    './effects/Neon_Devil_Horns.deepar',
    './effects/Pixel_Hearts.deepar',
    './effects/Hope.deepar',
    './effects/SantAR.deepar',
    './effects/Vendetta_Mask.deepar',
    './effects/Fire_Effect.deepar',
];

function applyEffect(index) {
    const effect = effects[index];
    deepAR.switchEffect(0, "slot", effect);
}


      var canvasHeight = window.innerHeight;
      var canvasWidth = window.innerWidth;

      let canvas = document.getElementById('deepar-canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      var deepAR = new DeepAR({ 
        licenseKey: 'your_license_key_goes_here',
        canvas: canvas,
        segmentationConfig: {
          modelPath: "lib/models/segmentation/segmentation-160x160-opt.bin"
        },
        footTrackingConfig: {
          poseEstimationWasmPath: 'lib/wasm/libxzimgPoseEstimation.wasm',
          detectorPath: 'lib/models/foot/foot-detector-android.bin', // or ...-ios.bin
          trackerPath: 'lib/models/foot/foot-tracker-android.bin',  // or ...-ios.bin
          objPath: 'lib/models/foot/foot-model.obj',
        },
        deeparWasmPath: 'lib/wasm/deepar.wasm',
        callbacks: {
          onInitialize: function() {
          // start video immediately after the initalization, mirror = true
          deepAR.startVideo(true);

          // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)
          deepAR.switchEffect(0, 'slot', './effects/Neon_Devil_Horns.deepar', function() {
            // effect loaded
          });
        }
        }
      });

      deepAR.callbacks.onCameraPermissionAsked = function() {
        console.log('camera permission asked');
      };

      deepAR.callbacks.onCameraPermissionGranted = function() {
        console.log('camera permission granted');
      };

      deepAR.callbacks.onCameraPermissionDenied = function() {
        console.log('camera permission denied');
      };
      
      deepAR.setFps(30);
      deepAR.setFaceDetectionSensitivity(3);

      deepAR.downloadFaceTrackingModel('lib/models/face/models-68-extreme.bin');

      deepAR.callbacks.onImageVisibilityChanged = function(visible) {
        console.log('image visible', visible);
      };

      deepAR.callbacks.onFaceVisibilityChanged = function(visible) {
        console.log('face visible', visible);
      };

      deepAR.callbacks.onVideoStarted = function() {
        var loaderWrapper = document.getElementById('loader-wrapper');
        loaderWrapper.style.display = 'none';
      };

    //---- Position the carousel to cover the canvas

      if (window.innerWidth > window.innerHeight) {
        var width = Math.floor(window.innerHeight*0.66);
        var carousel = document.getElementsByClassName('effect-carousel')[0];
        carousel.style.width = width + 'px';
      }
      
    //---- SCREENSHOT
      
    deepAR.callbacks.onScreenshotTaken = function (photo) {
      console.log("photo screenshot", photo);
      var a = document.createElement("a");
      a.href = photo;
      a.setAttribute("id", "Div1");
      a.download = "photo.png";
      document.body.appendChild(a);
      a.click();
      console.log(photo);
      setImageScreenShoot(photo);
      deepAR.resume();
    };

    //---- CODE SCREENSHOT
    
    document.getElementById("download-photo").onclick = function () {
     
        deepAR.takeScreenshot();
        qrImgDonwload.style.display = "block";
        deepAR.resume();
     
    };

      $(document).ready(function() {
        $('.effect-carousel').slick({
          slidesToShow: 1,
          centerMode: true,
          focusOnSelect: true,
          arrows: false,
          accessibility: true,
          variableWidth: true,
          infinite: true,
          touchMove: true,
        });

       

       
        const qrImgDonwload = document.getElementById("img");


    function backtoFiltersBack() {
      backToFilterCarousel.style.display = "block";
    }

    const dowloadPhoto = document.getElementById("download-photo");
    function hideDowloadPhoto() {
      dowloadPhoto.style.display = "block";
    }

    const filterCarousel = document.getElementById("filterCarousel");
    function hideFilterCarousel() {
      filterCarousel.style.display = "none";
    }

    const backToFilterCarousel = document.getElementById("back-to-filters");
    function backToFilters() {
      filterCarousel.style.display = "block";
      messageFotoTimer.style.display = "none";
      dowloadPhoto.style.display = "none";
      backToFilterCarousel.style.display = "none";
      qrImgDonwload.style.display = "none";
    }
    backToFilterCarousel.addEventListener("click", backToFilters);
    
    //VIKING FILTER
    
    //MAKEUP FILTER
    makeupBtn.addEventListener("click", () => {
      const effect = effects[1];
      hideFilterCarousel();
      console.log("vikins click")
      fotoTimerMessage();
      hideDowloadPhoto();
      backtoFiltersBack();
      deepAR.switchEffect(0, "slot", effect);
    });
    //STALLONE FILTER
   
    //PING-PONG FILTER
   
    //HEARTS FILTER
    
    //SNAIL FILTER
    snailBtn.addEventListener("click", () => {
      const effect = effects[5];
      hideFilterCarousel();
      console.log("vikins click")
      fotoTimerMessage();
      hideDowloadPhoto();
      backtoFiltersBack();
      deepAR.switchEffect(0, "slot", effect);
    });
    //HOPE FILTER

    function some(){
  console.log("vikins click")
      const effect = effects[2];
      hideFilterCarousel();
      
      fotoTimerMessage();
      hideDowloadPhoto();
      backtoFiltersBack();
      deepAR.switchEffect(0, "slot", effect);
}
    //VENDETTA FILTER
    
    //FIRE FILTER
  
    //DEVIL HORNS FILTER
   

      });      
