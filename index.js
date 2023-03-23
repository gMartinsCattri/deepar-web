const urlDns = "https://alfred.to";

const vikingBtn = document.getElementById("filterViking");
const eaglesBtn = document.getElementById("filterEagle");
const chiefBtn = document.getElementById("filterChief");
const oscaresBtn = document.getElementById("filterOscares");
const staloneBtn = document.getElementById("filterStalone");
const pingPongBtn = document.getElementById("filterPingPong");
const devilBtn = document.getElementById("filterDevil");
const heartsBtn = document.getElementById("filterHearts");
const hopeBtn = document.getElementById("filterHope");
const snailBtn = document.getElementById("filterSanta");
const fireBtn = document.getElementById("filterFire");
const qrImgDonwload = document.getElementById("qr");
const backToCamera = document.getElementsByClassName('back-to-camera')

var effects = [
  "./effects/Neon_Devil_Horns.deepar",
  "./effects/eagles_sb.deepar",
  "./effects/chiefs_sb.deepar",
  "./effects/Oscar.deepar",
  "./effects/Stallone.deepar",
  "./effects/Ping_Pong.deepar",
  "./effects/viking_helmet.deepar",
  "./effects/Pixel_Hearts.deepar",
  "./effects/Hope.deepar",
  "./effects/SantAR.deepar",
  "./effects/Fire_Effect.deepar",
  "./effects/kawsfiltro.deepar",
  "./effects/deweyfiltro.deepar",
];

function applyEffect(index) {
  const effect = effects[index];
  deepAR.switchEffect(0, "slot", effect);
}

var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;

let canvas = document.getElementById("deepar-canvas");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var deepAR = new DeepAR({
  licenseKey:
    // "2e28bc96e1e3776f33925abc071009ea1236bfb2df308363a25a329cee129da87112778bc3259822",
    "ba2fa173d55c0113189bed5b3a0c1fd5a5ae576437458efc241c63070be3a128bffe401ab3b01be1",
  canvas: canvas,
  segmentationConfig: {
    modelPath: "lib/models/segmentation/segmentation-160x160-opt.bin",
  },
  footTrackingConfig: {
    poseEstimationWasmPath: "lib/wasm/libxzimgPoseEstimation.wasm",
    detectorPath: "lib/models/foot/foot-detector-android.bin", // or ...-ios.bin
    trackerPath: "lib/models/foot/foot-tracker-android.bin", // or ...-ios.bin
    objPath: "lib/models/foot/foot-model.obj",
  },
  deeparWasmPath: "lib/wasm/deepar.wasm",
  callbacks: {
    onInitialize: function () {
      // start video immediately after the initalization, mirror = true
      deepAR.startVideo(true);

      // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)
      deepAR.switchEffect(
        0,
        "slot",
        "./effects/deweyfiltro.deepar",
        function () {
          // effect loaded
        }
      );
    },
  },
});

deepAR.callbacks.onCameraPermissionAsked = function () {
  console.log("camera permission asked");
};

deepAR.callbacks.onCameraPermissionGranted = function () {
  console.log("camera permission granted");
};

deepAR.callbacks.onCameraPermissionDenied = function () {
  console.log("camera permission denied");
};

deepAR.setFps(30);
deepAR.setFaceDetectionSensitivity(3);

deepAR.downloadFaceTrackingModel("lib/models/face/models-68-extreme.bin");

deepAR.callbacks.onImageVisibilityChanged = function (visible) {
  console.log("image visible", visible);
};

deepAR.callbacks.onFaceVisibilityChanged = function (visible) {
  console.log("face visible", visible);
};

deepAR.callbacks.onVideoStarted = function () {
  var loaderWrapper = document.getElementById("loader-wrapper");
  loaderWrapper.style.display = "none";
};

//---- Position the carousel to cover the canvas

if (window.innerWidth > window.innerHeight) {
  var width = Math.floor(window.innerHeight * 0.6);
  var carousel = document.getElementsByClassName("effect-carousel")[0];
  carousel.style.width = width + "px";
}

//---- SCREENSHOT
let imageScreenShoot = null;
deepAR.callbacks.onScreenshotTaken = function (photo) {
  console.log("photo screenshot", photo);
  document.querySelector("#staticImage").src = photo;
  document.getElementById("static-image-container").style.display = "block";
  document.getElementById("arrow").style.display = "none";
  document.querySelector(".slick-slider").style.display = "none";
  document.getElementById("deepar-canvas").style.display = "none";
  document.getElementById("download-photo").style.display = "none";
  document.getElementById("back-to-camera").style.display = "block";
  document.getElementById("qr").style.display = "block";
  var a = document.createElement("a");
  a.href = photo;
  a.setAttribute("id", "Div1");
  a.download = "photo.png";
  document.body.appendChild(a);
  a.click();
  console.log(photo);
  imageScreenShoot = photo;
  deepAR.resume();
  qrDisplayed();
};

function qrDisplayed() {
  if (imageScreenShoot !== null) {
    console.log("imageScreenShoot after cvallback", imageScreenShoot);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization:
          "Basic QWxmcmVkOlREODI0MThZYlBweCpuWDV4WDNrSlRrVFNeRTZndQ==",
      },
      body: imageScreenShoot,
    };
    fetch(
      "https://alfred.to/reservas/qr-code/go-to-your-picture",
      requestOptions
    )
      .then((response) => response.blob())
      .then((data) => {
        var urlCreator = window.URL || window.webkitURL;
        var imageURL = urlCreator.createObjectURL(data);
        document.querySelector("#qr").src = imageURL;
      });
  }
}

//---- CODE SCREENSHOT

document.getElementById("download-photo").onclick = function () {
  setTimeout(() => {
    deepAR.takeScreenshot();
    qrImgDonwload.style.display = "block";
    console.log("Foto recibidasssssssss", qrImgDonwload);
  }, 100);
};
document.getElementById('back-to-camera').onclick = function(){
  console.log('back to camera')
  document.getElementById("static-image-container").style.display = "none";
  document.getElementById("arrow").style.display = "block";
  document.querySelector(".slick-slider").style.display = "block";
  document.getElementById("deepar-canvas").style.display = "block";
  document.getElementById("download-photo").style.display = "block";
  document.getElementById("qr").style.display = "none";
}


$(document).ready(function () {
  $(".effect-carousel").slick({
    slidesToShow: 1,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    accessibility: true,
    variableWidth: true,
    infinite: true,
    touchMove: true,
  });

  const qrImgDonwload = document.getElementById("qr");

  // function backtoFiltersBack() {
  //   backToFilterCarousel.style.display = "block";
  // }

  //const dowloadPhoto = document.getElementById("download-photo");
  //function hideDowloadPhoto() {
  // dowloadPhoto.style.display = "block";
  //}

  //  const filterCarousel = document.getElementById("filterCarousel");
  //  function hideFilterCarousel() {
  //    filterCarousel.style.display = "none";
  //  }

  const backToFilterCarousel = document.getElementById("back-to-filters");
  function backToFilters() {
    filterCarousel.style.display = "block";
    messageFotoTimer.style.display = "none";
    dowloadPhoto.style.display = "none";
    backToFilterCarousel.style.display = "none";
    qrImgDonwload.style.display = "none";
  }
  backToFilterCarousel.addEventListener("click", backToFilters);
});
