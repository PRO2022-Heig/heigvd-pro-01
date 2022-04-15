<?php

declare(strict_types=1);

namespace App\Decorators;

use ApiPlatform\Core\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\Core\OpenApi\Model;
use ApiPlatform\Core\OpenApi\OpenApi;
use ArrayObject;

final class JwtRefreshDecorator implements OpenApiFactoryInterface
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
        $schemas["RefreshTokenCredentials"] = new ArrayObject(
            [
                "type" => "object",
                "properties" => [
                    "refresh_token" => [
                        "type" => "string",
                        "example" => "n0ts0Rand0mStu77",
                    ]
                ],
            ]
        );

        $pathItem = new Model\PathItem(
            ref: "JWT Token Refresh",
            post: new Model\Operation(
                operationId: "postCredentialsItemRefresh",
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
                summary:     "Refreshes JWT Token.",
                requestBody: new Model\RequestBody(
                    description: "Refresh a JWT Token with the refresh token",
                    content: new ArrayObject([
                               "application/json" => [
                                   "schema" => [
                                       "\$ref" => "#/components/schemas/RefreshTokenCredentials",
                                   ],
                               ],
                           ]),
                ),
            ),
        );
        $openApi->getPaths()->addPath("/token/refresh", $pathItem);

        return $openApi;
    }
}
