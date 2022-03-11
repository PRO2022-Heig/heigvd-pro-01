# Technical Specification



### Resources needs

* There is no strong need for resources, even on connection peak during meal time

  * There will not be any feature that requires a lot of resources

  * There will not be any feature that will be solicited a lot on a small period of time (i.e. thousands of requests each secondes)

* The application is monolithic and will be launched on a single platform. Therefore:
  * it does not need to be cross-platform.
  * Docker is not a real advantage: Docker is very good to handle micro-services architectures
* 

- ​	L’application est prévu pour être centralisée et n’a besoin de pouvoir tourner que sur une seule plateforme. En revanche, dans la majorité des scénarios, les utilisateurs accèdent au service à travers leurs smartphones. C’est pourquoi l’UX est essentiel
- ​	Le succès de ce genre d'applications repose sur sa facilité d’utilisation. L’[UX](https://en.wikipedia.org/wiki/User_experience) doit donc être extrêmement bien pensée. La priorité d’une fonctionnalité sera revue si son utilisation est trop complexe ou ne convient pas.
- ​	L’application répondra rapidement à énormément de besoins avec un set limité de fonctionnalités mais beaucoup de fonctionnalités peuvent être pensées et imaginées comme extensions à l’application. Il est important que l’application soit maintenable pour permettre ces ajouts.



### Deployment (Production and Dev)

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