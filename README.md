# PRO_2022

<!-- TODO: A table of contents? -->
## Dev - Starting the project

### Initial setup
Install [virtualbox](https://www.virtualbox.org/wiki/Downloads) with the extension pack

Install [vagrant](https://www.vagrantup.com/downloads)

There is a bit of setup to do the first time you want to run the app.
1. Edit the hosts file of your system (windows `C:\Windows\System32\Drivers\etc\hosts`, linux you should know it ;))
1. Add the following content
   ```
   192.168.56.69   api.our-app.local
   192.168.56.69   our-app.local
   ```

### Start the project

> Note: By default the project is in development mode, which will grant you access to swagger through `api.our-app.local/docs`. This will also enable advanced debugging messages in API errors,

To start the project, simply open a terminal to the `app` directory and run `vagrant up`

Then you can use `vagrant ssh` to ssh into the VM. You have now entered the development environment

#### backend
In order to have a working backend a number of things must be initialized, go into the `app/backend` directory (from within th VM) and run `composer setup`

To run symfony unit tests in the backend directory and run the following command `composer test`

#### frontend
As for the backend, go into the `app/frontend` directory and install the dependencies with `npm install`.  
Then
- use `npm run start` (alias of `ng serve`) to run the frontend on a live server (port *4200*)
- or `npm run build` (alias of `ng build`) to build the web content (html, js, css, ...) that can be hosted on a HTTP server (apache, nginx, etc.) 

To run Angular test:
- `npm test`: To run the tests on a client web browser on the port *9876*
- `npm run test-inline`: To run the tests on a headless web browser in the terminal

### Access
- The backend can be accessed from `api.our-app.local`. 
- The frontend can be accessed from `our-app.local`
- MailHog can be access from `our-app.local:8025`



### API

The whole API available is auto-documented by the [API Platform](https://api-platform.com/) framework and available on the backend url:

![api](img/api.png)



### Technologies

We use famous frameworks and tools for this project which handle in a standard way the libraries and configurations.
Any information can be found in their respective configuration file and documentations.

#### Continuous Integration

We use [github-worklfow](https://docs.github.com/en/actions/using-workflows).  

#### Backend

* Main Framework: [Symfony](https://symfony.com/)
* Package Manager: [Composer](https://getcomposer.org/)
* Test Framework: [phpunit](https://phpunit.de/)
* Linter: [CS-fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) with [PSR12](https://www.php-fig.org/psr/psr-12/) Standard

#### Frontend

* Main Framework: [Angular](https://angular.io/) 

* Package Manager: [npm](https://www.npmjs.com/)

* Test Framework:  [Karma](https://karma-runner.github.io/latest/index.html)

* Styling:

  * Basic CSS3 with [Scss](https://sass-lang.com/guide) preprocessor 
  * [Angular materials](https://material.angular.io/)

* Linter: 

  * [ESLint ](https://eslint.org/)for typescript. The configuration file is `app/frontend/.eslintrc.json`
  * [Stylelint](https://stylelint.io/) for Scss. The configuration file is `app/frontend/.stylelintrc.json`

  The rules are the recommended ones for each tool with additional rules. 





### Side note
The URL might change once we have settled for a name. In that case, simply change the entries in the hosts file and access the different parts using the new URLs.
