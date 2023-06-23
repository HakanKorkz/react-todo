<?php

namespace Korkz\todoBackEnd\controller\home;
use Korkz\todoBackEnd\models\home\UserModel;

class User extends UserModel
{
    public function __construct(string $request, object $route)
    {

        parent::__construct($request, $route);
    }

    /**
     * @param ...$options
     * @return string|array
     */
    public function auth(...$options): string|array
    {
        list($pages,$post)=$options;
        return $pages;
    }
}