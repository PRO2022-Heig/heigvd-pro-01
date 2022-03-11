# Specification

This document states the features that will be supported on each iteration.



## Global vision

This diagram show global vision of the features that would be supported by the application.

![model_diagram.drawio](img/model_diagram.drawio.png)

### Blocks

#### Main Blocks

* Blue: The users can choose a meal for themselves or for a group. This is barely the core of the service  and needs to be extended by other blocks.
* Green: Meals can be cocked using many recipes and ingredients, and this is part of the biggest issue when choosing a meal. 
* Red: There are many providers for each ingredients. Ingredients have different characteristics (size, price, taste, ...) and are sold in different places. This blocks aims to have more precise informations about the recipe and also to geolocalise stores that sell the ingredients.

#### Secondary Blocks

* Yellow: Features that helps planning meals
* Purple: Not only would you choose what you eat, but also where.

### Project Focus

By importance, the most important features are the blue and green blocks:

* They will allow a community to grow really fast.
* The service will be ready for production
  * We will be able to obtain data to prioritize the next revenue streams.
  * We will gain attention from brand in order to implement the red block.

The project will focus on the blue and green blocks.  Even if they are not directly the biggest revenue stream of the service, having them first will cost less and be ready in fewer time. We will be then able to have a better response to the market and maximize the benefits of the application with the red block once the service as gained popularity.



## Revenue stream

Active advertising have a negative impact on user experience which is bad for us as we want to create a community. Especially considering that the application will mainly be used on phones.

This kind of service works better with:

* Premium tier adding extra features
* Production promotion: Companies can pay to have their products highlighted.

The product promotion will be dealt with in the future in the red block. We need to gain popularity first.



Considering that the benefits are proportional to the number of users, we need to gain popularity quickly to generate bigger revenues. If we prioritize premium features, we could generate our first incomes quicker, but the community would grow smaller as there would be fewer free features.

The choice is made to prioritize importants freemium features. This is an investment in order to maximize the future benefits. 



## Iterations

**Project start date**: 9.3.2022
**Project end date**: 3.6.2022
**Total**: 12 weeks

* The project will be delivered at 3 stages of its development. The most important features are all integrated in the first two steps, but the importance alone won't define the priority. They were selected then planned in order to optimize the delivery process.
* If needed, features can be shifted to the next iteration. The third iteration is kept for this usage, otherwise it will be used to add extra features.
* An intermediate presentation will take place on the first iteration's end. 



### 1. First working version (5Weeks -> Date:  13/4/2022)

#### User features

* User can sign up and sign in into the application using login/password
* User can sign up and sign in into the application using OAuth
* User can update their profiles
  * Add/remove their allergies/ethics (e.g. Vegan)
  * Add/remove preferences (likes and dislikes)
* Users can find a meal and a receipt based on their profiles and the following filters
  * Recipe contains specific ingredients
  * Recipe cooking-time under a specified value.
  * Type of meal (Asiatic, Italian, Mexican, ...)
* Users can shuffle the search result
* User can add its own receipts (available for anyone)
* User can mark receipts.

#### Additional features

* Definition of the entity model
* Research of source of data
* There is an easy way to import large amount of data
* Samples of real data will already be available
* There is a way to differentiate premium users from freemium ones



### 2. Groups Management (4Weeks -> Date:  11/5/2022)

#### User features

* User can add/remove other user as their friends.
* User can create and delete groups
* User can add/remove other users (even not their friends)
* User can select the meal and receipt for the group
* User can choose some meals and let the group vote

#### Additional features

* Data will be added in a larger scale.



### 3. Project consolidation and paid features(3Weeks -> Date:  1/6/2022)

#### User features (paid features) if enough time

* User can plan meals for a period and generate a shopping list
* Agenda (google) integration: user can bind a meal date with its calendar

#### Additional features

* Consolidation of existing features
* This iteration is also a buffer for previous iterations



## Disclaimers

* This application will not provide integrated chats or forums, it does not aim to be a communication mean.

* This application won't allow to post

* This application is not a delivery service itself as UberEat or Smood. But it may integrate with those kind of service in future extensions.

* All the paid features won't be integrated right away. Most of them will be added after the production release along with the community's growth.

* The application won't handle multiple languages. 

   