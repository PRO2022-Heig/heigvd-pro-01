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
    protected string $authenticationTokenRoute = "/token/get";

    public function setUp(): void
    {
        parent::setUp();

        $this->client = static::createClient();
        $this->databaseTool = static::getContainer()->get(DatabaseToolCollection::class)->get();
        $this->databaseTool->loadFixtures([UserFixture::class]);
    }

    public function authenticatedRequest(string $method, string $path, array $options = []): ResponseInterface
    {
        $response = $this->request("POST", $this->authenticationTokenRoute, [
            "json" => $this->getUser()
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
        $options = array_merge_recursive($options, [
            "headers" => [
                "Content-Type" => "application/json"
            ]
        ]);
        return  $this->client->request($method, $path, $options);
    }

    protected function getUser(): array
    {
        return [
            "emailAddress" => UserFixture::getDefaultEmail(),
            "password" => UserFixture::getDefaultPassword()
        ];
    }
}
