<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\NumericFilter;
use App\Repository\GroupUserMembershipRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GroupUserMembershipRepository::class)]
#[ORM\UniqueConstraint(columns: ["group_id", "user_id"])]
#[ApiResource(
    itemOperations: [
        "get" => [],
        "delete" => [
            "security" => "object.getUser() == user || object.getGroup().isAdmin(user)"
        ],
    ],
)]
#[ApiFilter(NumericFilter::class, properties: ["group.id", "user.id"])]
#[ORM\HasLifecycleCallbacks]
class GroupUserMembership extends AbstractEntity
{
    #[ORM\ManyToOne(targetEntity: Group::class, cascade: ["persist"])]
    #[ORM\JoinColumn(nullable: false)]
    private Group $group;

    #[ORM\ManyToOne(targetEntity: AppUser::class, cascade: ["persist"])]
    #[ORM\JoinColumn(nullable: false)]
    private AppUser $user;

    #[ORM\Column(type: "boolean")]
    private bool $isAdmin;

    public function getGroup(): Group
    {
        return $this->group;
    }

    public function setGroup(Group $group): self
    {
        $this->group = $group;

        return $this;
    }

    public function getUser(): AppUser
    {
        return $this->user;
    }

    public function setUser(AppUser $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getIsAdmin(): bool
    {
        return $this->isAdmin;
    }

    public function setIsAdmin(bool $isAdmin): self
    {
        $this->isAdmin = $isAdmin;

        return $this;
    }
}
