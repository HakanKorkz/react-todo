<?php

namespace Korkz\todoBackEnd\models\home;


use Exception;
use Korkz\todoBackEnd\config\Connect;
use PDO;
use PDOStatement;

class ModelIndex extends Connect
{

    public function __construct(string $request, object $route)
    {
        parent::__construct($request, $route);
    }


}
