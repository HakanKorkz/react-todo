<?php

namespace Korkz\todoBackEnd\traits;

use Korkz\todoBackEnd\App\settings\Setting;

trait TokenConfig
{
    private function generateKey(): string
    { // Key Üretir..

        return sha1(md5(hexdec(uniqid())));

    }

    public  function locKey($pathname, $data): bool|array|string
    { // veriyi şifreler

        $file = __DIR__ . '/' . $pathname . '.json';

        $datatype = gettype($data);

        if (!empty(file_exists($file))) { // Anahtar Yenileme
            $json = json_decode(file_get_contents($file));

            $FileDate = $json->FileDate;

            $daysLeft = $this->remainingDayToken($FileDate);

            if ($daysLeft <= 0) { // Key süresi doldu mu kontrolü

                $date = date("d-m-Y");

                $this->lockExtra($date, $file);

            }

        } else {

            $date = date("d-m-Y");

            $this->lockExtra($date, $file);

        }
        $json = json_decode(file_get_contents($file));

        $key = $json->key;

        if ($datatype == 'array') {

            $dataCount = count($data);

            $encoded = [];

            for ($i = 0; $i < $dataCount; $i++) {

                $dataList = $data[$i];

                $cipher = 'AES-128-ECB';

                $encoded[] = openssl_encrypt($dataList, $cipher, $key);

            }

        } else {

            $cipher = 'AES-128-ECB';

            $encoded = openssl_encrypt($data, $cipher, $key);


        }

        return $encoded;

    }

    /**
     * @param $date
     * @param string $file
     * @return void
     */
    private function lockExtra($date, string $file): void
    {
        $dateNew = strtotime('+1 day', strtotime($date));

        $dateResult = date('m-d-Y H:i:s', $dateNew);

        $newDate = $dateResult; // Yeni Tarih

        $newKey = $this->generateKey(); // Yeni Anahtar

        $key_content = json_encode(["FileDate" => $newDate, "key" => $newKey]);

        touch($file);

        $Setting = fopen($file, 'w');

        fwrite($Setting, $key_content);

        fclose($Setting);
    }

    /**
     * @param $encoded
     * @return array|false|string
     */
    public function openKey($encoded): bool|array|string
    { // Şifre çözer

        $datatype = gettype($encoded);

        $file = __DIR__ . '/key.json';

        $json = json_decode(file_get_contents($file));

        $key = $json->key;


        if ($datatype == 'array') {

            $dataCount = count($encoded);

            $decoded = [];

            for ($i = 0; $i < $dataCount; $i++) {

                $data = str_replace(' ', '+', $encoded[$i]);

                $cipher = 'AES-128-ECB';

                $decoded[] = openssl_decrypt($data, $cipher, $key);

            }

        } else {


            $cipher = 'AES-128-ECB';

            $data = str_replace(' ', '+', $encoded);

            $decoded = openssl_decrypt($data, $cipher, $key);

        }


        return $decoded;

    }

    public function tokenControl($postToken): array
    {
        $Info = [];
        if (isset($_SESSION["token"]) && isset($postToken)) {
            if ($_SESSION["token"] === "$postToken") {
                $Info["boolean"] = false;
            } else {
                $Info['operation'] = 'error';

                $Info['subject'] = 'Hoop';

                $Info['message'] = 'Dostum ne denediysen haberimiz var.... ';

                $Info["boolean"] = true;
            }

        } else {

            $Info['operation'] = 'error';

            $Info['subject'] = 'Hoop';

            $Info['message'] = 'Dostum ne denediysen haberimiz var.... ';

            $Info["boolean"] = true;

        }

        return $Info;

    }

    /**
     * @param $endDate
     * @return float|int
     * Kalan Gün
     */
    public function remainingDayToken($endDate): float|int
    {

        $beginning = date('m-d-Y');

        $expStart = explode('-', $beginning);

        $expEnd = explode('-', $endDate);

        $expYear = explode(" ", $expEnd[2]);

        @$startTime = mktime(0, 0, 0, "$expStart[0]", "$expStart[1]", "$expStart[2]");

        @$endTime = mktime(0, 0, 0, "$expEnd[0]", "$expEnd[1]", "$expYear[0]");

        return ($endTime - $startTime) / 86400;

    }
}