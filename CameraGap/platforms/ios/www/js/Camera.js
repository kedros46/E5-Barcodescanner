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