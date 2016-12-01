<?php
/**
 * Created by PhpStorm.
 * User: jillvandendriessche
 * Date: 2/29/16
 * Time: 8:27 PM
 */
$servername = "192.168.0.142";
$username = "e5mode";
$password = "bloempot";
$dbname = "e5mode_products";


$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$page = ( isset( $_SERVER['PATH_INFO'] ) ) ? explode('/',$_SERVER['PATH_INFO'])[1] : null;

switch($page) {
    case "findProducts":
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $product_barcode = ($_GET['barcode']);
                //var_dump($product_barcode);
                try {
                    $sql = "SELECT * FROM products WHERE barcode = :barcode  ";

                    $params = array(":barcode" => $product_barcode);
                    $stmt = $conn->prepare($sql);

                    if ($stmt->execute($params) !== false) {
                         echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                    } else {
                        return false;
                    }
                } catch (PDOException $e) {
                    json_encode(($e));
                }
        }
        break;
}

?>