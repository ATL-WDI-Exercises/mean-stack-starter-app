# Mean Stack Starter App

## Steps to Reproduce

### Step 1 - Create the Express Project and add Dependencies

1a. Create directory and run Express Generator

```bash
mkdir mean-stack-starter-app
cd mean-stack-starter-app
express -e
npm install
```

1b. Install Server-side Dependencies

```bash
npm install --save express-session
npm install --save mongoose
npm install --save passport
npm install --save passport-local
npm install --save bcrypt-nodejs
```

1c. Install Client-side Dependencies

```bash
bower init
bower install --save bootstrap
bower install --save angular
bower install --save angular-messages
bower install --save angular-animate
bower install --save angular-ui-router

cp bower_components/bootstrap/dist/css/bootstrap*.min.css public/stylesheets

mkdir public/fonts
cp bower_components/bootstrap/dist/fonts/* public/fonts

mkdir public/javascripts/lib
cp bower_components/bootstrap/dist/js/bootstrap.min.js public/javascripts/lib
cp bower_components/jquery/dist/jquery.min.js public/javascripts/lib
cp bower_components/angular/angular.min.js public/javascripts/lib
cp bower_components/angular-animate/angular-animate.min.js public/javascripts/lib
cp bower_components/angular-messages/angular-messages.min.js public/javascripts/lib
cp bower_components/angular-ui-router/release/angular-ui-router.min.js public/javascripts/lib
```

1d. Edit `package.json` to use `nodemon`:

Change the following line:

```json
"start": "node ./bin/www"
```

to:

```json
"start": "nodemon ./bin/www"
```

1e. Save your work

```bash
git init
echo node_modules > .gitignore
echo bower_components >> .gitignore
git add -A
git commit -m "Project setup"
```

### Step 2 - Home and About Pages

In this step we will get the Home Page and About Page working with Express, Angular, and UI Router. Since AngularJS is handling all of our routing, we only need a single Expres route which was already provided to us by the Express Generator.

2a. Edit `routes/index.js` and change the following line:

```javascript
  res.render('index', { title: 'Express' });
```

to:

```javascript
  res.render('index', { title: 'Mean Stack Starter App' });
```

2b. Edit `views/index.ejs` and set it to the following content:

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel="stylesheet" type="text/css" href="/stylesheets/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/stylesheets/bootstrap-theme.min.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body ng-app="myApp">
    <navbar></navbar>
    <div ui-view></div>
  </body>
  <script type="text/javascript" src="/javascripts/lib/jquery.min.js" defer></script>
  <script type="text/javascript" src="/javascripts/lib/bootstrap.min.js" defer></script>
  <script type="text/javascript" src="/javascripts/lib/angular.min.js" defer></script>
  <script type="text/javascript" src="/javascripts/lib/angular-animate.min.js" defer></script>
  <script type="text/javascript" src="/javascripts/lib/angular-messages.min.js" defer></script>
  <script type="text/javascript" src="/javascripts/lib/angular-ui-router.min.js" defer></script>
  <script type="text/javascript" src="/javascripts/client.js" defer></script>
  <script type="text/javascript" src="/javascripts/navbar.js" defer></script>
  <script type="text/javascript" src="/javascripts/home.js" defer></script>
  <script type="text/javascript" src="/javascripts/about.js" defer></script>
</html>
```

2c. Create the file `public/javascripts/client.js` with the following content:

```bash
touch public/javascripts/client.js
```

```javascript
angular.module('myApp', ['ngMessages', 'ngAnimate', 'ui.router']);

angular.module('myApp')
.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
  .state('home', {
    url: "/home",
    template: "<home></home>"
  })
  .state('about', {
    url: "/about",
    template: "<about></about>"
  });
});
```

2d. Create the file `public/javascripts/navbar.js` with the following content:

```bash
touch public/javascripts/navbar.js
```

```javascript
angular.module('myApp')
.component('navbar', {
  template: `
    <nav class="navbar navbar-fixed-top navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" ui-sref="home">
            <span class="glyphicon glyphicon-home"></span> MEAN Stack Starter App
          </a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
          <ul class="nav navbar-nav">
            <li ng-class="{ active: $ctrl.$state.includes('home') }" ><a ui-sref="home">Home</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li ng-class="{ active: $ctrl.$state.includes('about') }" ><a ui-sref="about">About</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  controller: function navbarCtrl($state) {
    this.$state = $state;
  }
});
```

2e. Create the file `public/javascripts/home.js` with the following content:

```bash
touch public/javascripts/home.js
```

```javascript
angular.module('myApp')
.component('home', {
  template: `
  <section class="container well text-center">
    <h1>Welcome to the</h1>
    <h1>{{ $ctrl.name }}</h1>
  </section>
  `,
  controller: function homeCtrl() {
    this.name = 'MEAN Stack Starter App';
  }
});
```

2f. Create the file `public/javascripts/about.js` with the following content:

```bash
touch public/javascripts/about.js
```

```javascript
angular.module('myApp')
.component('about', {
  template: `
    <section class="container text-center">
      <h1>This App uses the following Technologies</h1>
      <article class="col-md-6">
        <h3>Client Technologies</h3>
        <ul class="no-bullets">
          <li ng-repeat = "tech in $ctrl.clientTechnologies">{{ tech }}</li>
        </ul>
      </article>
      <article class="col-md-6">
        <h3>Server Technologies</h3>
        <ul class="no-bullets">
          <li ng-repeat = "tech in $ctrl.serverTechnologies">{{ tech }}</li>
        </ul>
      </article>
    </section>
  `,
  controller: function aboutCtrl() {
    this.clientTechnologies = [
      'Angular 1.5',
      'Twitter Bootstrap',
      'Angular Messages (ngMessages)',
      'Angular Animate (ngAnimate)',
      'Angular UI Router'
    ];
    this.serverTechnologies = [
      'Express 4',
      'Passport',
      'Mongoose',
      'MongoDB',
      'NodeJS 6'
    ];
  }
});
```

2g. Test it out

```bash
npm start
```

Open the url `localhost:3000` in your browser and test out the routes via the NavBar.

2h. Save your work

```bash
git add -A
git commit -m "Added the NavBar and the Home and About routes."
```
