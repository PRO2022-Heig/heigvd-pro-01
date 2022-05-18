<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\NumericFilter;
use App\Repository\GroupUserMembershipRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GroupUserMembershipRepository::class)]
#[ApiResource(
//    collectionOperations: [
//        "get" => [
//            "security" => "object.user == user"
//        ],
//        "post" => [
//            "security" => "object.user == user"
//        ],
//    ],
    itemOperations: [
        "delete" => [
//            "security" => "object.user == user"
        ],
    ]
)]
#[ApiFilter(NumericFilter::class, properties: ["group.id", "user.id"])]
class GroupUserMembership extends AbstractEntity
{
    #[ORM\OneToOne(targetEntity: Group::class, cascade: ["persist", "remove"])]
    #[ORM\JoinColumn(nullable: false)]
    private Group $group;

    #[ORM\OneToOne(targetEntity: AppUser::class, cascade: ["persist", "remove"])]
    #[ORM\JoinColumn(nullable: false)]
    private AppUser $user;

    #[ORM\Column(type: "boolean")]
    private bool $isAdmin;

    public function getGroup(): ?Group
    {
        return $this->_group;
    }

    public function setGroup(Group $_group): self
    {
        $this->_group = $_group;

        return $this;
    }

    public function getUser(): ?AppUser
    {
        return $this->_user;
    }

    public function setUser(AppUser $_user): self
    {
        $this->_user = $_user;

        return $this;
    }

    public function getIsAdmin(): ?bool
    {
        return $this->isAdmin;
    }

    public function setIsAdmin(bool $isAdmin): self
    {
        $this->isAdmin = $isAdmin;

        return $this;
    }
}
