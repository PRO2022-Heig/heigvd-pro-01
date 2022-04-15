<?php

namespace App\Tests\Unit\Auth;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Tests\Unit\ApiTestTrait;

class LoginTest extends ApiTestCase
{
    use ApiTestTrait;

    public function testLoginValidUserAndPassword(): void
    {
        $response = $this->request("POST", $this->authenticationTokenRoute, [
            "json" => $this->getUser()
        ]);

        $json = $response->toArray(false);
        $this->assertResponseIsSuccessful("User should be valid");
        $this->assertArrayHasKey("token", $json, "Token key should be present");
    }

    public function testLoginValidUserWrongPassword(): void
    {
        $response = $this->request("POST", $this->authenticationTokenRoute, [
            "json" => [
                "username" => "johndoe",
                "password" => "wrong"
            ]
        ]);

        $json = $response->toArray(false);
        $this->assertResponseStatusCodeSame(401, "User should not be able to login");
        $this->assertArrayHasKey("message", $json, "A message should be present");
    }

    public function testLoginInvalidUser(): void
    {
        $response = $this->request("POST", $this->authenticationTokenRoute, [
            "json" => [
                "username" => "fake",
                "password" => "wrong"
            ]
        ]);

        $json = $response->toArray(false);
        $this->assertResponseStatusCodeSame(401, "User should not be able to login");
        $this->assertArrayHasKey("message", $json, "A message should be present");
    }
}
