# Technical Specification



## Stack

“[LAMP](https://doc.ubuntu-fr.org/lamp)” Web application, divided into backend/frontend:

- ​	Apache2-Php with  [Symfony](https://symfony.com/) framework for the backend.
- ​	Javascript with [Angular](https://angular.io/) for the frontend
- ​	MariaDB as DBMS
- ​	OS Linux

### 

### Remarks

- The choices were made according to the skills and wish of the team's members as long as the technology suited the project well. This ensure that the technologies are mastered and reduce the risks.
- MariaDB was choosen over Postgresql because it is well integrated with php and it is easier to find [DBaaS](https://blogs.oracle.com/oracle-france/post/definition-database-as-a-service) providers for MariaDB.



## Resources needs

* There is no strong need for resources, even on connection peak during meal time

  * There will not be any feature that requires a lot of resources

  * There will not be any feature that will be solicited a lot on a small period of time (i.e. thousands of requests each secondes)

* The application is monolithic and will be launched on a single platform. Therefore:
  * it does not need to be cross-platform.
  * Docker is not a real advantage: Docker is very good to handle micro-services architectures
* The application's success lay on its popularity. The UX needs to be really well made to please the user and the overall project needs to be maintainable in order to be extended.



## Deployment (Production and Dev)

Since our application is a monolith, docker is not a good choice.

* Docker is very good when it comes to micro-services architectures and broad-scaling, but stateful applications becomes harder to deal with. Docker support for storage is not as developed as the rest. There are plugins but most of docker's container plugins are not maintained anymore.
* Docker is also good to isolate services from others, but we don't plan to deploy other services than this one. 
* We would need an environment where we would install docker when we could have used this environment to deploy the application directly.
* Self managed docker are pretty expensive for the needs we have.

In opposition,

* Most cloud providers provide snapshots solutions
* The application is very simple to deploy with a bootstrap script.

Also, we already have an hosting solution available and the choice was made according to possibilities we had.

We choose to use vagrant for developpement. It provides a way to develop quickly on any plateform in a similar way that the service will be deployed in production