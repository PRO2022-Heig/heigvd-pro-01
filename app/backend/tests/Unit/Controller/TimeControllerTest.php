<?php

namespace App\Tests\Unit\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TimeControllerTest extends WebTestCase
{
    public function testSomething(): void
    {
        $client = static::createClient();
        $client->request("GET", "/time");

        $this->assertResponseIsSuccessful();
        $this->assertJson(json_encode(["date" => (new \DateTime())->format("d-m-Y H:i:s")]), "");
    }
}
