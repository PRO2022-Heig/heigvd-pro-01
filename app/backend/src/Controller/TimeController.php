<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Date;

class TimeController extends AbstractController
{
    #[Route("/api/time", name: "app_time")]
    public function index(): Response
    {
        $response = new JsonResponse();
        $response->setData(['date' => (new \DateTime())->format('d-m-Y H:i:s')]);
        return $response;
    }
}
