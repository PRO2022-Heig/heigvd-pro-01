<?php

namespace App\Repository\Meal;

use App\Entity\Meal\RestaurantMeal;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method RestaurantMeal|null find($id, $lockMode = null, $lockVersion = null)
 * @method RestaurantMeal|null findOneBy(array $criteria, array $orderBy = null)
 * @method RestaurantMeal[]    findAll()
 * @method RestaurantMeal[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RestaurantMealRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RestaurantMeal::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(RestaurantMeal $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(RestaurantMeal $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return RestaurantMeal[] Returns an array of RestaurantMeal objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RestaurantMeal
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
