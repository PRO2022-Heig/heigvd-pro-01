<?php

declare(strict_types=1);

namespace App\Decorators;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model;
use ApiPlatform\Core\OpenApi\OpenApi;
use ArrayObject;

final class JwtGetDecorator implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated
    ) {
    }

    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);
        $schemas = $openApi->getComponents()->getSchemas();

        $schemas["Token"] = new ArrayObject(
            [
                "type" => "object",
                "properties" => [
                    "token" => [
                        "type" => "string",
                        "readOnly" => true,
                    ],
                    "refresh_token" => [
                        "type" => "string",
                        "readOnly" => true,
                    ],
                ],
            ]
        );
        $schemas["Credentials"] = new ArrayObject(
            [
                "type" => "object",
                "properties" => [
                    "username" => [
                        "type" => "string",
                        "example" => "johndoe",
                    ],
                    "password" => [
                        "type" => "string",
                        "example" => "supersecurepassword123",
                    ],
                ],
            ]
        );

        $pathItem = new Model\PathItem(
            ref: "JWT Token Retrieval",
            post: new Model\Operation(
                operationId: "postCredentialsItem",
                tags:        ["Token"],
                responses:   [
                                      "200" => [
                                          "description" => "Get JWT token",
                                          "content" => [
                                              "application/json" => [
                                                  "schema" => [
                                                      "\$ref" => "#/components/schemas/Token",
                                                  ],
                                              ],
                                          ],
                                      ],
                                  ],
                summary:     "Gets a new JWT token.",
                requestBody: new Model\RequestBody(
                    description: "Generate new JWT Token",
                    content:     new ArrayObject([
                                                                       "application/json" => [
                                                                           "schema" => [
                                                                               "\$ref" => "#/components/schemas/Credentials",
                                                                           ],
                                                                       ],
                                                                   ]),
                ),
            ),
        );
        $openApi->getPaths()->addPath("/api/token/get", $pathItem);

        return $openApi;
    }
}
