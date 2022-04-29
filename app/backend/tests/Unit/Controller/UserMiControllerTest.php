<?php

namespace App\Tests\Unit\Controller;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Tests\Unit\ApiTestTrait;

class UserMiControllerTest extends ApiTestCase
{
    use ApiTestTrait;

    public function testDataReturnedCorrectly(): void
    {
        $this->authenticatedRequest("GET", "/app_user/mi");

        $this->assertResponseIsSuccessful();

        $jsonSubset = [
            "emailAddress" => "john.doe@fake.com",
            "firstName" => "John",
            "lastName" => "Doe",
        ];

        $this->assertJsonContains(json_encode($jsonSubset));
    }
}
