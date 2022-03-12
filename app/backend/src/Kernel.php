<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;

class Kernel extends BaseKernel
{
    use MicroKernelTrait;

    public function getCacheDir(): string
    {
        if (isset($_ENV["VAR_DIR"]) && !empty($_ENV["VAR_DIR"])) {
            return $_ENV["VAR_DIR"] . "/cache/";
        }

        return parent::getCacheDir();
    }

    public function getLogDir(): string
    {
        if (isset($_ENV["VAR_DIR"]) && !empty($_ENV["VAR_DIR"])) {
            return $_ENV["VAR_DIR"] . "/log/";
        }

        return parent::getLogDir();
    }
}
