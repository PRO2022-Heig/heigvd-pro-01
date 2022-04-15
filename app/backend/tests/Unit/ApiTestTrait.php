<?php

namespace App\Tests\Unit;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\Client;
use App\DataFixtures\UserFixture;
use function array_merge_recursive;
use Liip\TestFixturesBundle\Services\DatabaseToolCollection;
use Liip\TestFixturesBundle\Services\DatabaseTools\AbstractDatabaseTool;
use Symfony\Contracts\HttpClient\ResponseInterface;

trait ApiTestTrait
{
    protected AbstractDatabaseTool $databaseTool;
    protected Client $client;

    public function setUp(): void
    {
        parent::setUp();

        $this->client = static::createClient();
        $this->databaseTool = static::getContainer()->get(DatabaseToolCollection::class)->get();
        $this->databaseTool->loadFixtures([UserFixture::class]);
    }

    public function authenticatedRequest(string $method, string $path, array $options = []): ResponseInterface
    {
        $response = $this->request("POST", "/authentication_token", [
            "headers" => ["Content-Type" => "application/json"],
            "json" => [
                "username" => "johndoe",
                "password" => "supersecurepassword123"
            ]
        ]);
        $options = array_merge_recursive($options, [
            "headers" => [
                "Authorization" =>  "Bearer " . $response->toArray()["token"]
            ]
        ]);
        return $this->request($method, $path, $options);
    }

    public function request(string $method, string $path, array $options = []): ResponseInterface
    {
        return  $this->client->request($method, $path, $options);
    }
}
