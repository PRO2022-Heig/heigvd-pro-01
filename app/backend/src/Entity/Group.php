<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ORM\Entity(repositoryClass: GroupRepository::class)]
#[ORM\Table(name: "`group`")] // See comments of this answer: https://stackoverflow.com/a/10483663/6086785
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
class Group extends AbstractEntity
{
    #[ORM\Column(type: "string", length: 255)]
    #[NotBlank]
    private string $name;

    #[ORM\OneToMany(mappedBy: "group", targetEntity: Event::class, orphanRemoval: true)]
    private Collection $events;

    #[ORM\OneToMany(mappedBy: "group", targetEntity: GroupUserMembership::class, orphanRemoval: true)]
    private Collection $groupUserMemberships;

    public function __construct()
    {
        $this->events = new ArrayCollection();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Event>
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setGroup($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->removeElement($event)) {
            // set the owning side to null (unless already changed)
            if ($event->getGroup() === $this) {
                $event->setGroup(null);
            }
        }

        return $this;
    }

    public function isAdmin(AppUser $appUser)
    {
        /**
         * @var $groupUseryMembership \App\Entity\GroupUserMembership
         */
        foreach ($this->groupUserMemberships as $groupUserMembership) {
            if ($groupUserMembership->getIsAdmin() && $groupUserMembership->getUser()->getId() == $appUser->getId()) {
                return true;
            }
        }

        return false;
    }
}
