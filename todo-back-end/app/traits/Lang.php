<?php

namespace Korkz\todoBackEnd\traits;

use Korkz\todoBackEnd\Router;

trait Lang
{
    /**
     * @param string $location
     * @param string $pages
     * @param string $html
     * @param string $lang
     * @param bool $operation
     * @return array|string
     */
    public function langViews(string $location, string $pages, string $html, string $lang = "en", bool $operation = false): array|string
    {
        $langPath = Router::langRouter("languages/$lang", "app") . ".json";

        if (file_exists($langPath)) {
            $jsonData = file_get_contents($langPath);
            $jsonParse = json_decode($jsonData, true);
            if ($operation) {
                $conclusion = [];
                $result = [];
                foreach ($jsonParse[$location][$pages]["conclusion"] as $item) {
                    $conclusion[] = $item;
                }
                $conclusionCount = count($conclusion);

                $result["success"] = $conclusion[0];
                $result["errors"] = $conclusion[1];
                $conclusionCount === 3 && $result["special"] = $conclusion[2];


            } else {
                $incoming = [];
                $outgoing = [];
                if ($pages !== "login") {
                    if (isset($jsonParse[$location]["general"])) {
                        foreach ($jsonParse[$location]["general"]["incoming"] as $item) {
                            $incoming[] = $item;
                        }
                        foreach ($jsonParse[$location]["general"]["outgoing"] as $item) {
                            $outgoing[] = $item;
                        }

                    }
                }
                if (isset($jsonParse[$location][$pages])) {
                    foreach ($jsonParse[$location][$pages]["incoming"] as $item) { // Gelenler
                        $incoming[] = $item;
                    }
                    foreach ($jsonParse[$location][$pages]["outgoing"] as $item) { // Gidenler
                        $outgoing[] = $item;
                    }
                }

                $result = str_replace($incoming, $outgoing, $html);

            }
        } else {
            $incoming = [];
            $outgoing = [];
            $result = str_replace($incoming, $outgoing, $html);


        }

        return $result;

    }

}