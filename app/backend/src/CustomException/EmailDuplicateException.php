<?php

namespace App\CustomException;

use Exception;
use JetBrains\PhpStorm\Pure;

class EmailDuplicateException extends Exception
{
    #[Pure] public function __construct()
    {
        parent::__construct("Email already in use");
    }
}
