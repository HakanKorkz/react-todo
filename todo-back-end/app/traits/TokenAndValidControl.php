<?php

namespace Korkz\todoBackEnd\traits;

trait TokenAndValidControl
{
    use ValidationConfig;
    use TokenConfig;
    use Logs;
    public function tokenAndValidControl($request): array
    {
        $tokenControl = $this->tokenControl($request["token"]);
        $Info=[];
        $op="";
        if ($tokenControl["boolean"]) {
            $Info['operation'] = $tokenControl["operation"];
            $Info['Info'] = $tokenControl["subject"];
            $Info['message'] = $tokenControl["message"];
            $Info['path'] = "";
            $await = false;
            $op="token kontrolü";
        } else {
            $await=true;
        }

        if ($await) {
            $validation = $this->validation($request);
            if ($validation["boolean"]) {
                list($subject, $result) = $this->validInfo($validation[0]);
                $Info['operation'] = 'warning';
                $Info['Info'] = $subject;
                $Info['message'] = $result;
                $Info['path'] = "";
                $await = false;
                $op="validasyon kontrolü";
            }
        }

        $this->log([
            "operation" => $op,
            "request" => [
                ...$request],
            $Info
        ], $this->getPathRoot(), "control");

        return [$await,$Info];
    }
}