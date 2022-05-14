<?php

namespace App\DataFixtures;

use App\Entity\Provider;
use Doctrine\Persistence\ObjectManager;

class ProviderFixture extends AbstractDataImportFixture
{
    public function load(ObjectManager $manager): void
    {
        // dummy general provider for the moment
        $provider = new Provider();
        $provider->setName("Manor");
        $manager->persist($provider);
        $this->addReference("dummy-provider", $provider);
        $manager->flush();
    }
}
