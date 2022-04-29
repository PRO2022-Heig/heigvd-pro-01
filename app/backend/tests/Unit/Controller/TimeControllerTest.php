<?php

namespace App\Tests\Unit\Controller;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Tests\Unit\ApiTestTrait;

class TimeControllerTest extends ApiTestCase
{
    use ApiTestTrait;

    public function testProtectedRouteValidToken(): void
    {
        $this->authenticatedRequest("GET", "/time");

        $this->assertResponseIsSuccessful();
        $this->assertJson(json_encode(["date" => (new \DateTime())->format("d-m-Y H:i:s")]), "");
    }

    public function testProtectedRouteInvalidToken(): void
    {
        $response = $this->request("GET", "/time", [
            "headers" => [
                "Authorization" =>  "Bearer invalid"
            ]
        ]);

        $json = $response->toArray(false);
        $this->assertResponseStatusCodeSame(401, "invalid token");
        $this->assertArrayHasKey("message", $json, "A message should be present");
    }
}
