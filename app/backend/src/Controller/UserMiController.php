<?php

namespace App\Controller;

use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Security\Core\User\UserInterface;

#[AsController]
class UserMiController extends \Symfony\Bundle\FrameworkBundle\Controller\AbstractController
{
    public function __invoke(): UserInterface
    {
        return $this->getUser();
    }
}
