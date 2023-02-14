<?php

namespace Korkz\todoBackEnd\traits;

use Dotenv\Dotenv;

trait ENVConfig
{

    public function env(): array|string
    {
        $envPath = basename(dirname(__DIR__))."/../";
        $dotenv = Dotenv::createImmutable("$envPath");
        $dotenv->load();
        return $_ENV;
    }

}