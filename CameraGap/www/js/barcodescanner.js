/**
 * Created by brecht on 8/11/2016.
 */
function scanBarCode() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            findProduct(result.text);
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
}

function findProduct(barcode){
    //alert("We got a barcode\nResult: " + barcode);
    try {
        $.ajax({
            type: "get",
            url: "backend/handle-request.php/findProducts",
            data: {
                barcode: barcode
            },
            datatype: "json",
            timeout: 2000
        }).done(function (data) {
            console.log(data);

            $("#results").html(data);

        }).fail(function (xhr, status, error) {
            console.log("error happened: ");
            console.log(xhr, status , error);

            $("#results").html("<p>error happened: " + xhr + "\n" + status + "\n" + error + "</p>");

        });
    }catch (error){
        $("#results").html(error);
    }
}

// test barcode (flesje water)
// 20490331