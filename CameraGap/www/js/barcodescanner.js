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
    alert("We got a barcode\nResult: " + barcode);
    $.ajax({
        type: "get",
        url: "https://drcnetwork.com/handle-request.php/findProducts",
        data: {
            barcode: barcode
        },
        datatype: "json",
        timeout: 2000
    }).done(function (data) {
        if(data){
            $("#results").html(processData(data));
        }else {
            $("#results").html("<p>barcode not found</p>");
        }


    }).fail(function (xhr, status, error) {

        alert("error happened: ");

        $("#results").html("<p>error happened: " + xhr + "\n" + status + "\n" + error + "</p>");

    });
}

function processData(data) {
    //[{id, name, barcode, price, size}]
    var html = "";
    data.map((element, index)=>{
        html += "<p><span>element.NAME</span><span>element.SIZE</span><span>element.PRICE</span></p>";
    });
    return html;
}


// test barcode (flesje water)
// 20490331