<?php

namespace App\CustomException;

use ApiPlatform\Core\Exception\InvalidArgumentException;

class PasswordDoesNotMatchRequirementsException extends InvalidArgumentException
{
    public function __construct()
    {
        parent::__construct("Password does not match minimal requirements");
    }
}
