/**
 * Created by brecht on 8/11/2016.
 */
function scanBarCode() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            //Vul hier de callback in die de gegevens opvraagt

            findProduct(result.text);
        },
        function (error) {
            //vul hier een callback in, in geval van  error.
            //deze lijn is waarschijnlijk reeds voldoende...
            alert("Scanning failed: " + error);
        }
    );
}

function findProduct(barcode){
    var resultBox = $("#results");
    $.ajax({
        type: "get",
        url: "https://drcnetwork.com/handle-request.php/findNearby",
        data: {
            barcode: barcode
        },
        datatype: "json",
        timeout: 2000
    }).done(function (data) {
        data = JSON.parse(data);
        if(data){

            resultBox.html(`<h1>found barcode:<p>${barcode}</p></h1>` + makeTable(data));
            resultBox.append("<button class='btn btn-primary' onclick='closeResults()'>OK</button>");
        }else {
            resultBox.html("<p>barcode not found</p>");
        }
    }).fail(function (xhr, status, error) {
        resultBox.html(`<p>error happened: ${xhr} / ${status} / ${error}</p>`);
    }).always(function(){
        resultBox.show();
    });
}

function makeTable(data){
     return "<div class='table-responsive'><table class='table table-striped table-hover'>" +
                makeNearbyProductRows(data) +
            "</table></div>";

}
function makeProductRows(data){
    var rows = "";
    for(var i in data){
        rows += "<tr> <td>"+data[i].name+"</td> <td>"+data[i].size+"</td> <td>"+data[i].prijs + " \u20ac</td> </tr>"
    }
    return rows;
}

function makeNearbyProductRows(data){
    var rows = "<tr><th>Gemeente</th><th>Product</th> <th>Size</th> <th>aantal</th></tr>";
    for(var i in data){
        rows += "<tr>";
        rows += "<td>"+ data[i].gemeente + "</td>"
        rows += "<td>"+data[i].name+"</td> <td>"+data[i].size+"</td> <td>"+data[i].aantal+"</td>";
        rows+= "</tr>"
    }
    return rows;
}

function closeResults(){
    $("#results").hide();

}

// test barcode (flesje water)
// 20490331