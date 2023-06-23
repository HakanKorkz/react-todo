<?php

namespace Korkz\todoBackEnd\models\home;
use Korkz\todoBackEnd\config\Connect;

class UserModel extends Connect
{
public function __construct(string $request, object $route)
{
    parent::__construct($request, $route);
}
}