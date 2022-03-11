# Service de Gestion des repas



## Besoin

Le choix du repas n'est pas toujours évident:

* Ingrédients à disposition
* Ingrédients de saison/local
* Budget
* Envie du moment (chaud/froid, goût, consistance, ...)
* Temps de préparation
* Planification
* Alimentation variée
* Allergie/Éthique (Végan, pas de "bébé animaux", viande halal, ...)
* Calories
* ...

Il faut ensuite trouver une recette qui nous convienne pour le repas donné. Ce n'est pas toujours facile de comparer plusieurs sites.
C'est du temps que l'on ne prend parfois pas et l'on reste bloqué sur un certain set de repas, beaucoup de surgelé. Il faut aussi tenir compte des magasins à proximité et ceux dans lesquels on fait généralement nos courses.





### Proposition

On souhaite apporter une solution à cette problématique avec une solution numérique simple d'utilisation pour le end-user.

Le service se construit autour d'une base de donnée complète sur laquelle de nombreuses fonctionnalité inter-opérantes peuvent être ajoutées.

Ci-dessous quelques fonctionnalité envisagée (Cela ne constitue pas le cahier des charges, les fonctionnalités prioritaires seront définies ultérieurement):

* Filtrage

* Proposition de repas aléatoire

* Proposition basée sur les choix précédent (similitude, ou au contraire pour équilibrer les repas s'il manque certains nutriments, ...)

* Proposition basée sur des ingrédients disponibles (uniquement ceux disponibles ou au plus proche)

* Génération d'une liste de course

  * Partage de liste de course entre différents utilisateur

* Gestion de son "frigo": Garder un inventaire de ce que l'on a chez nous. Utile pour choisir ce que l'on peut faire ou ce qu'il faut acheter.

  Il s'agit probablement de la partie la plus "contraignante" pour l'utilisateur (dépendamment de s'il est sur PC, mobile ou autre et du niveau de granularité, e.g. si l'utilisateur peut entrer les dates de péremption)

* Choix de la recette pour le repas choisis

* Définir ses plats (et recettes) favori(e)s

* Gestion d'un calendrier

* Évaluation des coûts/calories

* Création de groupes pour choisir un repas.

* ....



Cette application ne proposerait pas forcement que des repas à faire soit-même. Elle pourrait proposer des repas "pré-faits" si c'est ce que l'utilisateur souhaite, des lieux/restaurants, etc.



## Business Plan

> Dans le cadre d'un projet à but lucratif, définir un business plan est essentiel. Ce ne sera pas le cas ici et aucun des moyens ci-dessous ne sera traité durant le développement. Il y aurait 



### Public cibles

Le service a pour but de toucher toutes les catégories de personnes.

* L'aspect planification/Variation/Budget cible plutôt un public jeune (18-35 ans), on pense aux étudiants et jeunes parents.
* L'aspect choix/allergies/ethique intéressera toute personne faisant un repas de groupe, peu importe la catégorie d'age.
  On peut supposer que les moins de 18ans vont rarement inviter des personnes à manger et cuisiner pour les inviter, cela sera plutôt des repas où chacun cuisine pour soi (raclonette, fajitas, ...) ou un choix de restaurant
* L'aspect calories/saisonnier/local/équilibré concernera les personnes soucieuses de leur santé et de l'environnement.



### Rémunérations

Ce genre d'application peut fonctionner sur différents modèles:

* Achat unique(/Abonnement). Si une version gratuite existe, le gain de la version payante serait le retrait de publicité ou l'ajout de fonctionnalité.
* Publicité tierces (pour version gratuite)
* Mise en avant de certains produits/Partenariats

(ATTENTION à la LGPD)



### Frais

#### Frais uniques au lancement du projet

* Frais de personnel: 7 employés avec un salaire moyen de 25frs/heure pour un total de 90h par personne = 15'750frs

#### Frais récurrent

* Publicité/agence de communication

* Frais d'hébergement: Dépendra de la charge
* Frais de personnel: Maintenance et amélioration du service. Agrandissement de l'infrastructure.



## Esquisse du Planning (délai: 6 semaines)

Le point central du projet est la base de donnée. Son schéma doit donc être très réfléchis, robuste et souple.
La première semaine servira à la mise en place:

* Définir le schéma des données
* Définir les fonctionnalités principales à intégrer dans les 3 premières semaines
* Définir un backlog de fonctionnalités.
* Consolider le choix des technologies/outils
* Mettre en place l'infrastructure et plan de travail de chacun



Semaines 2-3: Le schéma est en place, une api et une interface existent et fonctionnalités principales sont disponibles. 

Semaine 4-5: Ajouts de fonctionnalités prises dans le backlog

Semaine 6: Bug fix and fine tuning only et Création d'un livrable (nettoyage de la documentation utilisateur, ... )



Tout au long du projet, la documentation sera maintenue et le planning adapté en fonction de la situation.