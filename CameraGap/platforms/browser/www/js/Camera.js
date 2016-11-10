var pictureSource;
var destinationType;
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('smallImage');

    smallImage.style.display = 'block';

    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// A button will call this function
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

// Called if something bad happens.
function onFail(message) {
   var error = document.getElementById("error");
    error.text = message;
}

// Quagga.init({
//     inputStream : {
//         name : "Live",
//         type : "LiveStream",
//         target: "#barcodescan"
//     },
//     decoder : {
//         readers : ["code_128_reader"]
//     }
// }, function() {
//     console.log("Initialization finished. Ready to start");
//     Quagga.start();
// });
//
// Quagga.decodeSingle({
//     src: "image-abc-123.jpg",
//     numOfWorkers: 0,  // Needs to be 0 when used within node
//     inputStream: {
//         size: 800  // restrict input-size to be 800px in width (long-side)
//     },
//     decoder: {
//         readers: ["code_128_reader"] // List of active readers
//     },
// }, function(result) {
//     if(result.codeResult) {
//         console.log("result", result.codeResult.code);
//     } else {
//         console.log("not detected");
//     }
// });