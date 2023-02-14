<?php

namespace Korkz\todoBackEnd\controller\home;

use Exception;
use Korkz\todoBackEnd\models\home\ModelIndex;
use Korkz\todoBackEnd\traits\TokenAndValidControl;

class Index extends ModelIndex
{
    use TokenAndValidControl;
    public function __construct(string $request, object $route)
    {
        parent::__construct($request, $route);
    }


    public function Index(): string|array
    {
        $pathRoot = $this->getPathRoot();
        $hostRoot = $this->getHostPath();
        $attribute = $this->getGetAttribute();
        $path = $this->getPath();
        $layout = $this->getLayout();
        $token = $this->getToken();
        $method= $this->getRequest();


        if ($method === "GET") {
            return "get test";
        }
        if ($method === "POST") {
//            $post = $_POST;
//            $result = match ($_POST["operation"]) {
//                "customerInsert" => $this->newCustomersHome($post),
//                "sale" => $this->homeOrderAdd($post, "Sales"),
//                "buying" => $this->homeOrderAdd($post, "Buying"),
//                "orderUpdate" => $this->homeOrderUpdate($post),
//                "modal" => $this->homeModal($token, $pathRoot, $optCustomer, $optProduct, $post,$products,$path),
//                default => ["yapmak istediğiniz işlem bulunamadı"]
//            };
//
//            echo json_encode($result);
//            die();

            return "post test";
        }
        return "hiç biri";
    }


}