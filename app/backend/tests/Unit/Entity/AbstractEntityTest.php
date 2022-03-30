<?php

namespace App\Tests\Unit\Entity;

use App\Entity\AbstractEntity;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class AbstractEntityTest extends KernelTestCase
{
    public function testGetId(): void
    {
        $entity = $this->getEntity();
        $this->assertEquals(null, $entity->getId(), "Id has problem");
    }

    public function testPrePersist(): void
    {
        $entity = $this->getEntity();
        $date = new DateTimeImmutable();

        $entity->onPrePersist();
        $this->assertEquals(
            $date->getTimestamp(),
            $entity->getCreatedAt()->getTimestamp(),
            "Pre persist life cycle does not work"
        );
        $this->assertEquals(
            $date->getTimestamp(),
            $entity->getUpdatedAt()->getTimestamp(),
            "Pre persist life cycle does not work"
        );
    }

    public function testPreUpdate(): void
    {
        $entity = $this->getEntity();
        $entity->onPreUpdate();
        $this->assertEquals(
            (new DateTimeImmutable())->getTimestamp(),
            $entity->getUpdatedAt()->getTimestamp(),
            "Pre update life cycle does not work"
        );
    }

    protected function getEntity(): AbstractEntity
    {
        return $this->getMockBuilder(AbstractEntity::class)->getMockForAbstractClass();
    }
}
