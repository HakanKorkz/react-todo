<?php

namespace Korkz\todoBackEnd\traits;


trait Logs
{
    public function log(array $request, $pathRoot, string $enums = ""): bool
    {
//        echo "<pre>";
//        print_r($request);
//        echo $pathRoot;
//        echo "<br>";
//        echo $enums;
//        exit();
        $fileDate = date("d-m-Y");
        switch ($enums) {
            case "login":
            case "logout":
                $result = $this->authLog($request);
                $file = "auth-$fileDate.json";
                break;
            case "customerAdd":
            case "customerUpdate":
                $result = ["date" => date("Y-m-d H:i:s"), ...$request];
                $file = "customer-$fileDate.json";
                break;
            case "customersList":
                $result = ["date" => date("Y-m-d H:i:s"), ...$request];
                $file = "customers-$fileDate.json";
                break;
            case "productAdd":
            case "productUpdate":
                $result = ["date" => date("Y-m-d H:i:s"), ...$request];
                $file = "product-$fileDate.json";
                break;
            case "productsList":
                $result = ["date" => date("Y-m-d H:i:s"), ...$request];
                $file = "products-$fileDate.json";
                break;
            case "orderAdd":
            case "orderUpdate":
                $result = ["date" => date("Y-m-d H:i:s"), ...$request];
                $file = "order-$fileDate.json";
                break;
            case "ordersList":
                $result = ["date" => date("Y-m-d H:i:s"), ...$request];
                $file = "orders-$fileDate.json";
                break;
                case "control":
                $result = ["date" => date("Y-m-d H:i:s"), ...$request];
                $file = "controls-$fileDate.json";
                break;
            default:
                $file = "unknown-$fileDate.json";
                $result = [
                    "date" => date("Y-m-d H:i:s"),
                    "request" => [...$request]
                ];
        }
        return $this->logFile($result, $file, $pathRoot);
    }

    private function logFile($result, $file, $pathRoot): bool
    {
        $json_file = "$pathRoot/app/logs/$file";

        if (file_exists($json_file)) {

            $json = json_decode(file_get_contents($json_file), true);

            $json = array_merge($json, [$result]);

        } else {

            $json = ["mailStatus" => false, $result];

        }

        $data = json_encode($json);

        touch("$json_file");

        $setting = fopen("$json_file", 'w+');

        fwrite($setting, $data);

        return fclose($setting);
    }

    private function authLog($request): array
    {
        if (isset($request["request"]["Cookie"])) {

            if (isset($request["request"]["Cookie"]["PHPSESSID"])) {

                unset($request["request"]["Cookie"]["PHPSESSID"]);

            }

            if (empty($request["request"]["Cookie"])) {

                unset($request["request"]["Cookie"]);

            }
        }

        return ["date" => date("d-m-Y H:i:s"), ...$request];
    }


}