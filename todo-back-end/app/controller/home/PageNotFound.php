<?php

namespace Korkz\todoBackEnd\controller\home;

use Korkz\todoBackEnd\config\Connect;

class PageNotFound extends Connect
{
    public function __construct(string $request, object $route)
    {
        parent::__construct($request, $route);
    }

    public function pageNotFound(): string|array
    {
        $pathRoot = $this->getPathRoot();
        $hostRoot = $this->getHostPath();
        $attribute = $this->getGetAttribute();
        $path = $this->getPath();
        $layout=$this->getLayout();
        $tittle="404 | V.0.1 - nSarraf";

        if ($this->getRequest() === "POST") {
           // $post = $_POST;
            $result = match ($_POST["operation"]) {
                "opDegeri" => "Düşünülüyor",
                default => ["yapmak istediğiniz işlem bulunamadı"]
            };

            echo json_encode($result);
            die();
        }
        $incoming=[
            "{{root}}",
            "{{tittle}}"
        ];
        $html = "";
        ob_start();
        require_once "$path";

        $html = ob_get_clean();
        $outgoing=[
            "$hostRoot",
            "$tittle"
        ];
        return str_replace($incoming, $outgoing, $html);
    }

}