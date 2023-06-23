<?php
header('Access-Control-Allow-Origin: *');
@ob_start();
@session_start();
date_default_timezone_set('Europe/Istanbul');
//http_response_code(200);
//echo json_encode(["confirm"=>"success","messages"=>"Giriş Yapıldı"]);
//exit();
use Firebase\JWT\JWT;
use Korkz\todoBackEnd\controller\home\Index;
use Korkz\todoBackEnd\controller\home\PageNotFound;
use Korkz\todoBackEnd\controller\home\User;
use Korkz\todoBackEnd\Router;

$requestMethod = $_SERVER["REQUEST_METHOD"];
require_once __DIR__ . "/vendor/autoload.php";
try {
    $secret_key = bin2hex(random_bytes(32));
} catch (Exception $e) {
    $secret_key=$e->getMessage();
} // 32 byte / 256 bit

$alg = "HS256"; // HMAC-SHA256 algoritması




// JWT oluşturma
$payload =[
    "iss" => "http://localhost/react-todo/todo-back-end/", // Tokenı oluşturan taraf
    "aud" => "http://localhost/react-todo/todo-back-end/", // Tokenın kullanıcısı
    "iat" => time(), // Token oluşturulma tarihi
    "exp" => time() + 3600, // Tokenın geçerlilik süresi (saniye cinsinden)
    "foo" => "bar" // Custom data
];
$jwt = JWT::encode($payload, $secret_key,$alg,"my-key-123");



// JWT çözme
try {
    $decoded = JWT::decode($jwt, array('kid' => "my-key-123"));
    echo "Token doğrulandı. \n";
    echo "Token verileri: \n";
    echo "Issuer: " . $decoded->iss . "\n";
    echo "Audience: " . $decoded->aud . "\n";
    echo "Issue at: " . $decoded->iat . "\n";
    echo "Expiration: " . $decoded->exp . "\n";
    echo "Custom data: " . $decoded->foo . "\n";
} catch (Exception $e) {
    echo "Token doğrulanamadı: " . $e->getMessage();
}


exit();
const requestPathList = ["login" => "User", "register" => "User", "userAdd" => "PageNotFound", "404" => "PageNotFound"];
$Router = new Router();
$pathExp = explode(".", $_SERVER["SCRIPT_URI"] ?? $_SERVER["REQUEST_URI"]);
$path = $_SERVER["SCRIPT_URI"] ?? $_SERVER["REQUEST_URI"];
if (count($pathExp) === 2) {
    $path = pathinfo($_SERVER["SCRIPT_URI"] ?? $_SERVER["REQUEST_URI"]);
    Router::headerLocation($path["filename"]);
}
$Route = $Router->router($path);
//echo "<pre>";
//print_r(json_encode($Route));
//exit();
//print_r($Route);
//exit();
//echo "<pre>";
//print_r($_SERVER);
//print_r(json_encode($Route));
//exit();
if (is_object($Route)) {
    $result = ["NotFound" => true];
    $pages = $Route->pages;
    $path = $Route->path;
    $pathRoot = $Route->pathRoot;
    $location = $Route->location;
    $getAttribute = $Route;
    $layout = $Route->layout;
    switch ($location) {
        case "home":
//            $result = "";
//            if (!isset($_SESSION["userCode"]) and $pages !== "login") {
//                Router::headerLocation("login");
//            } else {
//                if (isset($_SESSION["userCode"]) and $pages === "login") {
//                    Router::headerLocation("./");
//                }
//            }
            switch ($pages) {
                case "index";
                    try {
                        $home = new Index($requestMethod, $Route);
                        $result = $home->Index();

                    } catch (Exception $e) {
                        $result = $e->getMessage();
                    }
                    break;
                case "register";
                case "login";
                    try {
                        $user = new User($requestMethod, $Route);
                        $result = $user->auth($pages, $_POST);

                    } catch (Exception $e) {
                        $result = $e->getMessage();
                    }
                    break;
                default:
                    if (str_contains($pages, "PageNotFound")) {
                        try {
                            $notFound = new PageNotFound($requestMethod, $Route);
                            $result = $notFound->pageNotFound();
                        } catch (Exception $e) {
                            $result = $e->getMessage();
                        }
                    } else {
                        Router::headerLocation("404");
                    }
            }
            break;
        default:
            Router::headerLocation("404");
    }
    echo json_encode($result);

}


