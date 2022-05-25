<?php

namespace App\Controller;

use App\Entity\Meal;
use App\Repository\MealRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MealSearchController extends AbstractController
{
    private MealRepository $mealRepository;

    #[Route(
        path: "/meals/{id}/publication",
        defaults: [
            "_api_resource_class" => Meal::class,
            "_api_item_operation_name" => "meals_search",
        ],
        methods: ["GET"],
    )]
    public function searchAction()
    {
        die;
        // TODO: Implement __invoke() method.
    }
}
