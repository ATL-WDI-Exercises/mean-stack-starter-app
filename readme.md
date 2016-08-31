# Mean Stack Starter App

This exercise builds a simple TODO app using the MEAN Stack. _Passport_ is used for authentication (signup, login, and logout).

## Table of Contents

* [Step 1 - Create the Express Project and add Dependencies](#step-1---create-the-express-project-and-add-dependencies)
* [Step 2 - Home and About Pages](#step-2---home-and-about-pages)
* [Step 3 - Add Mongoose Models and Seeds File](#step-3---add-mongoose-models-and-seeds-file)
* [Step 4 - Add Passport Security Configuration](#step-4---add-passport-security-configuration)
* [Step 5 - Add Signup, Login, and Logout Capabilities](#step-5---add-signup-login-and-logout-capabilities)
* [Step 6 - Add CRUD features for TODOs](#step-6---add-crud-features-for-todos)

## Step 1 - Create the Express Project and add Dependencies

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

## Step 2 - Home and About Pages

In this step we will get the Home Page and About Page working with Express, Angular, and UI Router. Since AngularJS is handling all of our routing, we only need a single Express route which was already provided to us by the Express Generator.

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
  controller: function($state) {
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
  controller: function() {
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
  controller: function() {
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

## Step 3 - Add Mongoose Models and Seeds File

3a. Create the model files:

```bash
mkdir models
touch models/user.js
touch models/todo.js
```

3b. Add the following content to `models/user.js`:

```javascript
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  local : {
    email    : String,
    password : String
  }
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
```

3c. Add the following content to `models/todo.js`:

```javascript
var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title:     { type: String,  required: true },
  completed: { type: Boolean, required: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  { timestamps: true }  // createdAt, updatedAt
);

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

TodoSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

TodoSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};

module.exports = mongoose.model('Todo', TodoSchema);
```

3d. Add a `seeds.js` file with the following content:

```bash
touch seeds.js
```

```javascript
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var User = require('./models/user');
var Todo = require('./models/todo');

mongoose.connect('mongodb://localhost/todos');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old todos...');
Todo.remove({})
.then(function() {
  console.log('removing old users...');
  return User.remove({});
})
.then(function() {
  console.log('creating new users');
  let joe = new User();
  joe.local = { email: 'joe@ga.co', password: joe.encrypt('test1234') };
  let sue = new User();
  sue.local = { email: 'sue@ga.co', password: sue.encrypt('test1234') };
  return [User.create(joe), User.create(sue)];
})
.spread(function(joe, sue) {
  console.log('creating some new todos...');
  var groceries    = new Todo({ title: 'groceries',       completed: false, user: joe._id });
  var feedTheCat   = new Todo({ title: 'feed the cat',    completed: true,  user: joe._id });
  var learnAngular = new Todo({ title: 'Learn AngularJS', completed: true,  user: sue._id });
  var updateResume = new Todo({ title: 'Update Resume',   completed: false, user: sue._id });
  return Todo.create([groceries, feedTheCat, learnAngular, updateResume]);
})
.then(function(savedTodos) {
  console.log('Just saved', savedTodos.length, 'todos.');
  return Todo.find({}).populate('user');
})
.then(function(allTodos) {
  console.log('Printing all todos:');
  allTodos.forEach(function(todo) {
    console.log(todo.toString());
  });
  quit();
}, function(err) {
  return handleError(err);
});
```

3e. Test it out

```bash
node seeds.js
```

3f. Save your work

```bash
git add -A
git commit -m "Added mongoose models and seeds file."
```

## Step 4 - Add Passport Security Configuration

In this step we will add Passport security similar to what was done for Unit 2.

4a. Create the passport configuration files:

```bash
mkdir config
mkdir config/passport
touch config/passport/passport.js
touch config/passport/local-signup-strategy.js
touch config/passport/local-login-strategy.js
```

4b. Add the following to `config/passport/passport`:

```javascript
var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy  = require('./local-login-strategy');
var User = require('../../models/user');

var passportConfig = function(passport) {

  // Strategies
  passport.use('local-signup', localSignupStrategy);
  passport.use('local-login' , localLoginStrategy);

  // Session Support
  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });
};

module.exports = passportConfig;
```

4c. Add the following to `config/passport/local-signup-strategy`:

```javascript
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/user');

var strategy = new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, callback) {
    // Find a user with this e-mail
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);
      if (user) {
        // A user with this email already exists
        return callback(null, false, { message: 'This email is already taken.' });
      }
      else {
        // Create a new user
        var newUser            = new User();
        newUser.local.email    = email;
        newUser.local.password = newUser.encrypt(password);

        newUser.save(function(err) {
          return callback(err, newUser);
        });
      }
    });
  });

module.exports = strategy;

```

4d. Add the following to `config/passport/local-login-strategy`:

```javascript
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/user');

var strategy = new LocalStrategy({
    usernameField : 'email',                 // default is 'username'
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email' : email }, function(err, user) {
      if (err) return callback(err);

      // If no user is found
      if (!user) {
        return callback(null, false, { message: 'User not found.' });
      }

      // Validate password
      if (!user.isValidPassword(password)) {
        return callback(null, false, { message: 'Oops! Wrong password.' });
      }

      return callback(null, user);
    });
  });

module.exports = strategy;
```

4e. Add Passport configuration to `app.js`:

Edit `app.js` and set it to the following:

```javascript
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
var session = require('express-session');

// Routes
var homeRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');

var app = express();

// Connect to database
mongoose.connect('mongodb://localhost/todos');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: 'WDI Rocks!',
                  resave: true,
                  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport with our custom configuration code
require('./config/passport/passport')(passport);

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

console.log('Running in %s mode', app.get('env'));

module.exports = app;
```

4f. Test the App

Start the app via `npm start`. You will not see any functional changes but you want to verify that the app starts up cleanly and nothing that was working is now broken.

4g. Save your work:

```bash
git add -A
git commit -m "Added Passport security configuration."
```

## Step 5 - Add Signup, Login, and Logout Capabilities

For this step we will need Express routes that are RESTful JSON API endpoints. Thus AngularJS will be managing what the user sees for Signup, Login, and Logout but Express will still need to do the actual authentication and session management.

5a. Add routes for `signup`, `login`, and `logout`:

> Note that we do not need routes for forms as AngularJS will be managing the display of forms. We only need routes for processing requests and returning JSON data.

Edit `routes/index.js` and set the content to the following:

```javascript
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mean Stack Starter App' });
});

// =============================================================
// RESTful JSON API Endpoints for signUp, login, logout, and me
// =============================================================

// POST /signup
router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    req.login(user, function(err) {
      if (err) return res.status(401).json(error);
      res.json( { email: user.local.email });
    });
  })(req, res, next);
});

// POST /login
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    req.login(user, function(err) {
      if (err) return res.status(401).json(error);
      res.json( { email: user.local.email } );
    });
  })(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.sendStatus(200);
});

router.get('/me', function(req, res, next) {
  res.json( { email: req.user ? req.user.local.email : '' } );
});

module.exports = router;
```

5b. Create an _Auth_ AngularJS service with the following content

The Auth service will be responsible for calling the Express Server to `signup`, `login`, and `logout`.  The Auth service will also remember the current user that is logged in.

```bash
touch public/javascripts/auth.js
```

```javascript
angular.module('myApp')
.service('Auth', function($http, $q) {

  var currentUser = null;

  this.getCurrentUser = function() {
    return $http.get('/me')
    .then(res => {
      currentUser = res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.getCurrentUserSync = function() {
    return currentUser;
  };

  this.isLoggedIn = function() {
    return currentUser !== null;
  };

  this.login = function(credentials) {
    return $http.post('/login', credentials)
    .then(res => {
      currentUser = res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.logout = function() {
    return $http.get('/logout')
    .then( res => {
      currentUser = null;
    });
  };

  this.createUser = function(user) {
    return $http.post('/signup', user)
    .then(res => {
      currentUser = res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.getCurrentUser();
});
```

5c. Create a `signup` AngularJS component:

It is a *lot* of code, but it's just an HTML form with some fancy form validation logic.

```bash
touch public/javascripts/signup.js
```

```javascript
angular.module('myApp')
.component('signup', {
  template: `
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Sign up</h1>
      </div>
      <div class="col-sm-12">
        <form class="form" name="form" ng-submit="$ctrl.register(form)" novalidate>

          <div class="form-group" ng-class="{ 'has-success': form.name.$valid && $ctrl.submitted,
                                              'has-error': form.name.$invalid && $ctrl.submitted }">
            <label>Name</label>

            <input type="text" name="name" class="form-control" ng-model="$ctrl.user.name"
                   required/>
            <p class="help-block" ng-show="form.name.$error.required && $ctrl.submitted">
              A name is required
            </p>
          </div>

          <div class="form-group" ng-class="{ 'has-success': form.email.$valid && $ctrl.submitted,
                                              'has-error': form.email.$invalid && $ctrl.submitted }">
            <label>Email</label>

            <input type="email" name="email" class="form-control" ng-model="$ctrl.user.email"
                   required
                   mongoose-error/>
            <p class="help-block" ng-show="form.email.$error.email && $ctrl.submitted">
              Doesn't look like a valid email.
            </p>
            <p class="help-block" ng-show="form.email.$error.required && $ctrl.submitted">
              What's your email address?
            </p>
            <p class="help-block" ng-show="form.email.$error.mongoose">
              {{ $ctrl.errors.email }}
            </p>
          </div>

          <div class="form-group" ng-class="{ 'has-success': form.password.$valid && $ctrl.submitted,
                                              'has-error': form.password.$invalid && $ctrl.submitted }">
            <label>Password</label>

            <input type="password" name="password" class="form-control" ng-model="$ctrl.user.password"
                   ng-minlength="3"
                   required
                   mongoose-error/>
            <p class="help-block"
               ng-show="(form.password.$error.minlength || form.password.$error.required) && $ctrl.submitted">
              Password must be at least 3 characters.
            </p>
            <p class="help-block" ng-show="form.password.$error.mongoose">
              {{ $ctrl.errors.password }}
            </p>
          </div>

          <div class="form-group" ng-class="{ 'has-success': form.confirmPassword.$valid && $ctrl.submitted,
                                              'has-error': form.confirmPassword.$invalid && $ctrl.submitted }">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" class="form-control" ng-model="$ctrl.user.confirmPassword"
                   match="$ctrl.user.password"
                   ng-minlength="3" required/>
            <p class="help-block"
               ng-show="form.confirmPassword.$error.match && $ctrl.submitted">
              Passwords must match.
            </p>
          </div>

          <div>
            <button class="btn btn-inverse btn-lg btn-register" type="submit">
              Sign up
            </button>
            <a class="btn btn-default btn-lg btn-login" ui-sref="login">
              Login
            </a>
          </div>

        </form>
      </div>
    </div>
    <hr>
  </div>
  `,
  controller: function(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

    this.register = function(form) {
      this.submitted = true;

      if (form.$valid) {
        return this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to todos
          this.$state.go('todos');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
      }
    };
  }
});
```

5d. Create a `login` AngularJS component:

```bash
touch public/javascripts/login.js
```

```javascript
angular.module('myApp')
.component('login', {
  template: `
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Login</h1>
      </div>
      <div class="col-sm-12">
        <form class="form" name="form" ng-submit="$ctrl.login(form)" novalidate>

          <div class="form-group">
            <label>Email</label>

            <input type="email" name="email" class="form-control" ng-model="$ctrl.user.email" required>
          </div>

          <div class="form-group">
            <label>Password</label>

            <input type="password" name="password" class="form-control" ng-model="$ctrl.user.password" required>
          </div>

          <div class="form-group has-error">
            <p class="help-block" ng-show="form.email.$error.required && form.password.$error.required && $ctrl.submitted">
               Please enter your email and password.
            </p>
            <p class="help-block" ng-show="form.email.$error.email && $ctrl.submitted">
               Please enter a valid email.
            </p>

            <p class="help-block">{{ $ctrl.errors.login }}</p>
          </div>

          <div>
            <button class="btn btn-inverse btn-lg btn-login" type="submit">
              Login
            </button>
            <a class="btn btn-default btn-lg btn-register" ui-sref="signup">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
    <hr>
  </div>
  `,
  controller: function(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
    this.errors = {};

    this.login = function(form) {
      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to todos
          this.$state.go('todos');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
      }
    };
  }
});
```

5e. Create the `todos` AngularJS component:

This is just the beginning of the Todos component. We need to come back and finish it later.

```bash
touch public/javascripts/todos.js
```

```javascript
// TODO: This is just the beginning. More to come later...
angular.module('myApp')
.component('todos', {
  template: `
    <h1>TODOs</h1>
  `,
  controller: function() {
  }
});
```

5f. Add the `login`, `signup`, and `todos` client-side routes

Edit `public/javascripts/client.js` and add the following routes:

```javascript
  .state('login', {
    url: "/login",
    template: "<login></login>"
  })
  .state('signup', {
    url: "/signup",
    template: "<signup></signup>"
  })
  .state('todos', {
    url: "/todos",
    template: "<todos></todos>"
  });
```

5g. Update the NavBar

Add navigation links to the NavBar for `signup`, `login`, `logout` and `todos`

Edit `public/javascripts/navbar.js` and set the content to:

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
            <li ng-class="{ active: $ctrl.$state.includes('about') }" ><a ui-sref="about">About</a></li>
            <li ng-show="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('todos') }" ><a ui-sref="todos">Todos</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li ng-hide="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('login')  }" ><a ui-sref="login">Login</a></li>
            <li ng-hide="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('signup') }" ><a ui-sref="signup">Sign Up</a></li>
            <p ng-show="$ctrl.Auth.isLoggedIn()" class="navbar-text">Signed in as {{ $ctrl.Auth.getCurrentUserSync().email }}</p>
            <button ng-show="$ctrl.Auth.isLoggedIn()" type="button" class="btn btn-default navbar-btn" ng-click="$ctrl.logout()">Logout</button>
          </ul>
        </div>
      </div>
    </nav>
  `,
  controller: function(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

    this.logout = function() {
      this.Auth.logout()
      .then( res => {
        this.$state.go('login');
      });
    };
  }
});
```

5h. Add the following script tags to `views/index.ejs`:

```html
<script type="text/javascript" src="/javascripts/auth.js" defer></script>
<script type="text/javascript" src="/javascripts/login.js" defer></script>
<script type="text/javascript" src="/javascripts/signup.js" defer></script>
<script type="text/javascript" src="/javascripts/todos.js" defer></script>
```

5i. Test it out

Try the following and verify the content of the NavBar and how the routes get loaded:

* Signup
* Logout
* Login
* Navigate to the `home`, `about` and `todos` routes

5j. Save your work

```bash
git add -A
git commit -m "Added signup, login, and logout"
```

## Step 6 - Add CRUD features for TODOs

LAB TIME:

Add the AngularJS routes and the Express RESTful endpoints for the following TODO CRUD operations

* Show All Todos
* Create A New Todo
* Edit a Todo
* Delete a Todo

All views and forms should be managed by AngularJS and the Express endpoints should only process and return JSON data.

Also consider security for the TODO CRUD operations:

* If a user tries to view/edit/delete a Todo that does not belong to them, have the server return a 404 error, i.e.

```javascript
  return res.status(404).json('Not Found');
```

* If any TODO route is accessed without a login session, have the server return a 401 error to the client. Then have AngularJS redirect the user to the login page.

Server code:

```javascript
  return res.status(401).json('Not Authorized');
```

Client code:

```javascript
this.$state.go('login');
```
