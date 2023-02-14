<?php
@ob_start();

@session_start();

date_default_timezone_set('Europe/Istanbul');

use Korkz\todoBackEnd\controller\home\Index;
use Korkz\todoBackEnd\controller\home\PageNotFound;
use Korkz\todoBackEnd\Router;

$requestMethod = $_SERVER["REQUEST_METHOD"];

require_once __DIR__ . "/vendor/autoload.php";

$Router = new Router();

$pathExp = explode(".", $_SERVER["SCRIPT_URI"] ?? $_SERVER["REQUEST_URI"]);
$path = $_SERVER["SCRIPT_URI"] ?? $_SERVER["REQUEST_URI"];

if (count($pathExp) === 2) {
    $path = pathinfo($_SERVER["SCRIPT_URI"] ?? $_SERVER["REQUEST_URI"]);
    Router::headerLocation($path["filename"]);
}

$Route = $Router->router($path);



//echo "<pre>";
////print_r($_SERVER);
//print_r($Route);
//exit();

if (is_object($Route)) {
    $pages = $Route->pages;
    $path = $Route->path;
    $pathRoot = $Route->pathRoot;
    $location = $Route->location;
    $getAttribute = $Route;
    $layout = $Route->layout;
    switch ($location) {
        case "home":
//            $html = "";
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
                        $html = $home->Index();

                    } catch (Exception $e) {
                        $html = $e->getMessage();
                    }
                    break;
                default:
                    if (str_contains($pages, "PageNotFound")) {
                        try {
                            $notFound = new PageNotFound($requestMethod, $Route);
                            $html = $notFound->pageNotFound();
                        } catch (Exception $e) {
                            $html = $e->getMessage();
                        }
                    } else {
                        Router::headerLocation("404");
                    }
            }

            break;
        default:
            Router::headerLocation("404");
    }


    print_r($html);

}


