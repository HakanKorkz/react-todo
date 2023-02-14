<?php

namespace Korkz\todoBackEnd\traits;

use Valitron\Validator as Validator;

trait ValidationConfig
{
    public function validation($required): array
    {
        $langPath = dirname(__DIR__) . "/../vendor/vlucas/valitron/lang";
        Validator::langDir("$langPath");
        Validator::lang('tr');
        $v = new Validator($required);
        switch ($required["operation"]) {
            case "login":
                $v->rule('required', ['krmnuser', 'krmnpass'])->message('{field} Zorunlu!!');
                $v->labels(array(
                    'krmnuser' => 'Kullanıcı Adı',
                    'krmnpass' => 'Şifre'
                ));
                $v->rule('lengthMin', 'krmnpass', 6)->message('{field} Olmalı!!');
                $v->label('Şifre en az 6 karakterli');

                break;
            case "customerInsert":
            case "customerUpdate":
                $v->rule("required", ["fullName", "phone"])->message('{field} Zorunlu!!');
                $v->labels(array(
                    "fullName" => "Adı & Soyadı",
                    "phone" => "İletişim numarası"
                ));
                $v->rule('regex', 'phone', '/^[0-9]{4}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/')->message('{field} Olmalı!!');
                $v->label('Telefon numarasını lütfen örnekte gibi 0530-000-00-00 şeklinde');
                $v->rule("optional", "email");
                $v->rule('email', 'email')->message("{field}");
                $v->label("example@example.com gibi olmalı örneğin");

                break;
            case "productInsert":
            case "productUpdate":
                $v->rule("required", "productName")->message('{field}');
                $v->label("Ürun Adını lütfen yazınız bu alan zorunludur!!!");
                break;
                case "sale":
                    $v->rule("required", ["date", "mainPrice", "receivedPrice"])->message('{field} Zorunlu!!');
                    $v->labels(array(
                        "saleDate" => "İşlem Tarihi",
                        "mainPrice" => "Değeri",
                        "receivedPrice" => "Alınan"
                    ));
                break;
                case "orderUpdate":
                    $v->rule("required", ["mainPrice", "receivedPrice"])->message('{field} Zorunlu!!');
                    $v->labels(array(
                        "mainPrice" => "Değeri",
                        "receivedPrice" => "Alınan"
                    ));
                break;
        }

        if ($v->validate()) {
            $result = ["boolean" => false];
        } else {
            // Errors
            $result = ["boolean" => true, $v->errors()];
        }

        return $result;

    }

    public function validInfo($response): array
    {
        $result = "";
        foreach ($response as $Item) {
            $result .= "Eksik: $Item[0] ";
        }

        return ["Validasyon hatası",$result];

    }
}