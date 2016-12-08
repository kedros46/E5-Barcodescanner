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

    var resultBox = $("#results");
    $.ajax({
        type: "get",
        url: "https://drcnetwork.com/handle-request.php/findProducts",
        data: {
            barcode: barcode
        },
        datatype: "json",
        timeout: 2000
    }).done(function (data) {
        data = JSON.parse(data);
        alert("found barcode: " + barcode);
        if(data){
            var table = makeTable(data);
            resultBox.html(table);
            resultBox.append("<div class='row'><button class='btn btn-primary col-md-4' onclick='closeResults()'>OK</button></div>");
        }else {
            resultBox.html("<p>barcode not found</p>");
        }
    }).fail(function (xhr, status, error) {
        alert("error happened: ");
        resultBox.html("<p>error happened: " + xhr + "\n" + status + "\n" + error + "</p>");

    }).always(function(){
        resultBox.show();
    });
}

function makeTable(data){
     return "<div class='table-responsive'><table class='table table-striped table-hover'>" +
        "<tr><th>Product</th><th>Size</th><th>Price</th></tr>" +
            makeRows(data) +
        "</table></div>";

}
function makeRows(data){
    var rows = "";
    for(var i in data){
        rows += "<tr> <td>"+data[i].name+"</td> <td>"+data[i].size+"</td> <td>"+data[i].price + " \u20ac</td> </tr>"
    }
    return rows;
}

function closeResults(){
    $("#results").hide();

}

// test barcode (flesje water)
// 20490331