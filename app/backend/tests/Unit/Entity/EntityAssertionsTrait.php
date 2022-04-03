<?php

namespace App\Tests\Unit\Entity;

use App\Entity\AbstractEntity;
use function count;
use function implode;
use Symfony\Component\Validator\ConstraintViolation;
use function method_exists;
use function ucfirst;

trait EntityAssertionsTrait
{
    public function assertErrorCount(int $expectedErrors, AbstractEntity $entity, string $message = ""): void
    {
        $errors = $this->getErrors($entity);
        $messages = [$message];

        /** @var ConstraintViolation $error */
        foreach ($errors as $error) {
            $messages[] = $error->getPropertyPath() . " => " . $error->getMessage();
        }

        $this->assertCount($expectedErrors, $errors, implode(PHP_EOL, $messages));
    }

    public function assertHasErrors(AbstractEntity $entity, string $message = ""): void
    {
        $this->assertNotEquals(0, count($this->getErrors($entity)), $message);
    }

    protected function getErrors(AbstractEntity $entity)
    {
        self::bootKernel();

        return self::getContainer()->get("validator")->validate($entity);
    }

    public function hydrate(string $class, array $properties = []): AbstractEntity
    {
        $entity = new $class();
        foreach ($properties as $property => $value) {
            $setter = "set" . ucfirst($property);
            if (method_exists($class, $setter)) {
                $entity->$setter($value);
            }
        }

        return $entity;
    }
}
