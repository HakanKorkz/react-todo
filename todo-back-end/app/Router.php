<?php

namespace Korkz\todoBackEnd;

use JetBrains\PhpStorm\NoReturn;
use Korkz\todoBackEnd\traits\ENVConfig;

class Router
{
    use ENVConfig;

    /**
     * @var array|string
     */

    public array|string $ENV;

    public function __construct()
    {
        $this->ENV = self::env();
    }

    /**
     * @param $file
     * @return mixed
     */
    public function fileExtension($file): mixed
    {
        @$ext = pathinfo($file);
        return @$ext['extension'];
    }

    /**
     * @param $urlRequest
     * @param $constantsHost
     * @return string|array
     */
    protected function change($urlRequest, $constantsHost): string|array
    { // url yapısında  uzantı varsa siler
        $hostName = $_SERVER["HTTP_HOST"];
        if ($hostName === $constantsHost) { // local de gerçekleşen işlemler
            $url = $urlRequest;
        } else { // hosta gerçekleşen işlemler
            $url = rtrim($urlRequest, "/");
            $url = ltrim($url, "/");
            $url = str_replace($_SERVER["REQUEST_SCHEME"] . "://$hostName", "", $url);

        }
        $extension = $this->fileExtension($url);

        if ($extension) {
            $result = str_replace('.' . $extension, '', $url);

        } else {
            $result = $url;
        }

        return $result;

    }

    /**
     * @param $aim
     * @return array|string
     */
    private function aim($aim): array|string
    {
        $constantsAim = str_replace("[\"", "", $aim);
        $constantsAim = str_replace("\"]", "", $constantsAim);

        return explode(",", str_replace("\"", "", $constantsAim));

    }


    /**
     * @param $requestUrl
     * @param string $control
     * @param bool $debug
     * @return false|mixed|string
     */
    public function router($requestUrl, string $control = "", bool $debug = false): mixed
    {
        $env = $this->ENV;
        $controlEnv = $env["CONSTANTS_CONTROL"];
        $aim = $this->aim($env["CONSTANTS_AIM"]);
        $constantsHost = $env["CONSTANTS_HOST"];
        $urlRequest = $this->change($requestUrl, $constantsHost);
        $url = rtrim($urlRequest, "/");
        $url = ltrim($url, "/");
        $pathRoot = $_SERVER["DOCUMENT_ROOT"];
        $hostName = $env["HOST_NAMES"]; // env den host kurulu olduğu dosya alınıyor
        $hostUrl = $_SERVER["REQUEST_SCHEME"] . "://$hostName";
        if ($_SERVER["HTTP_HOST"] !== $env["CONSTANTS_HOST"]) { // local de gerçekleşen işlemler
            $path = ltrim(str_replace("$hostUrl/", "", $url), "/");
        } else { // hosta gerçekleşen işlemler
            $path = ltrim(str_replace("$hostName", "", $url), "/");
        }
        $path = rtrim($path, "/");
        $path = str_replace("$hostUrl", "", $path);
        $pathCount = substr_count($path, "/");
        if ($pathCount > 1) {
            $slash = str_repeat("/", $pathCount);
            $path = str_replace("$slash", "/", $path);
        }
        if ($_SERVER["HTTP_HOST"] === $env["CONSTANTS_HOST"]) {
            $localPath = "$pathRoot/$hostName";
        } else {
            $localPath = $pathRoot;
        }

        if ($control !== "$controlEnv") {
            $key = array_search($path, $aim);
            if (in_array($path, $aim)) { // varsayılan taraf işlemleri
                //$path = str_replace("$aim[$key]", "", $path);
                $location = $aim[$key];
                $path = ltrim($path, "/");
                $path = rtrim($path, "/");
                if (empty($path)) {
                    $path = "index";
                }
            } else { // eşleşen tarafı işlemleri
                // $path = str_replace($aim[$key], "", $path);
                $path = ltrim($path, "/");
                $path = rtrim($path, "/");
                $location = $aim[$key];
                if (empty($path)) {
                    $path = "index";
                } else {
                    list($location, $path) = $this->filesRoot($path, $localPath, $env);
                }

            }
            if (str_contains($path, "/")) { // url içersinde bilgi alınması gerekıyorsa parçalanacak
                $explode = explode("/", $path);
                $path = $explode[0];
                unset($explode[0]);
                $getAttribute = $explode;
                $attribute = true;
            } else {
                $getAttribute = "noData";
                $attribute = false;
            }

            $pathDir = "$localPath/app/controller/$location/$path.php";

            if (!file_exists("$pathDir")) {
                if ($_SERVER["HTTP_HOST"] === $env["CONSTANTS_HOST"]) {
                    $url = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["HTTP_HOST"] . "/$hostName/404";
                } else {
                    $url = $_SERVER["REQUEST_SCHEME"] . "://$hostName/404";
                }
                header("Location:$url");
            }
            if ($_SERVER["HTTP_HOST"] === $env["CONSTANTS_HOST"]) {
                $hostPath = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["HTTP_HOST"] . "/$hostName/";
            } else {
                $hostPath = $_SERVER["REQUEST_SCHEME"] . "://$hostName/";
            }

            $pathResult = ["hostPath" => $hostPath, "pathRoot" => dirname(__DIR__), "path" => "$pathDir", "layout" => "$localPath/views/$location/layout", "location" => $location, "pages" => $path, "getAttribute" => $getAttribute, "attributeBoolean" => $attribute];

            if ($debug) {
                return json_encode($pathResult);
            } else {
                $pathResult = json_encode($pathResult);
                return json_decode($pathResult);
            }

        } else {

            return "$localPath/$controlEnv/$path";
        }

    }

    /**
     * @param $requestUrl
     * @param string $control
     * @return false|mixed|string
     */
    public static function langRouter($requestUrl, string $control = ""): mixed
    {
        return (new Router)->router($requestUrl, $control);
    }

    /**
     * @param $path
     * @param $localPath
     * @param $env
     * @return array
     */

    private function filesRoot($path, $localPath, $env): array
    { // burada hangi sayfa ile döniş edileceğinin son hali ele alınıyor
        if (str_contains($path, "404")) {
            $path = str_replace("404", "PageNotFound", $path);
        }
        $path = ltrim($path, "/");
        $path = rtrim($path, "/");
        $paths = explode("/", $path);
        $aims = $this->aim($env["CONSTANTS_AIM"]);
        $pathRoot = "";
        foreach ($paths as $pat) { // burada env den gelen hangi location
            if (in_array($pat, $aims)) {
                $pathRoot = $pat;
                break;
            } else {
                $pathRoot = $aims[0];
            }

        }

        return [$pathRoot, $this->fileCheck($pathRoot, $localPath, $aims, $paths)];

    }

    /**
     * @param string $patRoot
     * @param string $localPath
     * @param array $aims
     * @param array $paths
     * @return string
     */
    private function fileCheck(string $patRoot, string $localPath, array $aims, array $paths): string
    { // bu fonksiyon da istek atılan lokasyon da öyle bir sayfa mevcuta var mı kontrolü yapılıyor
        $pathDir = "";
        foreach ($paths as $path) {
            if (file_exists("$localPath/app/controller/$patRoot/$path.php")) {
                $pathDir = $path;
                break;
            }
        }
        unset($paths[array_search($pathDir, $paths)]);
        if ($aims[0] !== $patRoot) {
            unset($paths[array_key_first($paths)]);
        }
        $pathsNew = array_merge([$pathDir], $paths);
        return implode("/", $pathsNew);
    }

    #[NoReturn] public static function headerLocation($requestUrl): string
    {
        $url = rtrim($requestUrl, "/");
        $url = ltrim($url, "/");
        $hostName = $_ENV["HOST_NAMES"]; // env den host kurulu olduğu dosya alınıyor
        if ($_SERVER["HTTP_HOST"] === "localhost") {
            $local = $_SERVER["HTTP_HOST"];
            $hostUrl = $_SERVER["REQUEST_SCHEME"] . "://$local/$hostName/$url";
        } else {
            $hostUrl = $_SERVER["REQUEST_SCHEME"] . "://$hostName/$url";

        }

        header("Location:$hostUrl");
        die();

    }
}