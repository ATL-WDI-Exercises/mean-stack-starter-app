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
