/**
 * Created by brecht on 8/11/2016.
 */
function scanBarCode() {
    var msg = document.getElementById("error");
    msg.text = "clicked";
    cordova.plugins.barcodeScanner.scan( //onSucces, onFail, options
        function(result){
            //success callback
            alert(JSON.stringify(result));

        },function(error){
            //error callback
            alert(JSON.stringify(error));

        });
}

function onSucces(result) {
    alert("We got a barcode\n" +
        "Result: " + result.text + "\n" +
        "Format: " + result.format + "\n" +
        "Cancelled: " + result.cancelled);
}

function onFail(error) {
    alert("Scanning failed: " + error);
}