<?php
/**
 * Created by PhpStorm.
 * User: jillvandendriessche
 * Date: 2/29/16
 * Time: 8:27 PM
 */
//$servername = "192.168.0.142";
$servername = "172.31.39.172";
$username = "e5mode";
$password = "bloempot";
$dbname = "e5mode";


$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$page = ( isset( $_SERVER['PATH_INFO'] ) ) ? explode('/',$_SERVER['PATH_INFO'])[1] : null;

switch($page) {
    case "findProducts":
//        switch ($_SERVER['REQUEST_METHOD']) {
//            case 'GET':
        $product_barcode = ($_GET['barcode']);
        //var_dump($product_barcode);
        try {
            $sql = "SELECT * FROM products WHERE barcode = :barcode  ";

            $params = array(":barcode" => $product_barcode);
            $stmt = $conn->prepare($sql);

            if ($stmt->execute($params)) {
                 echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            } else {
                return false;
            }
        } catch (PDOException $e) {
            json_encode(($e));
        }
//        }
        break;
    case "findStores":
        try{
            $sql = "SELECT * FROM winkels";
            $stmt = $conn->query($sql);

            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }catch (PDOException $e) {
            json_encode(($e));
        }
        break;
    case "findNearby":
        try{
            $sql = "SELECT * FROM products 
                    JOIN winkels_products ON products.id = ArtikelID 
                    JOIN winkels ON WinkelID = winkels.id 
                    WHERE barcode = :barcode";

            $params = array(":barcode" => $product_barcode);
            $stmt = $conn->prepare($sql);

            if ($stmt->execute($params)) {
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            } else {
                return false;
            }
        }catch (PDOException $e) {
            json_encode(($e));
        }
}

?>
