var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).json( { message: 'Please signup or login.'} );
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the todos and render the index view
  Todo.find({ user: req.user }).sort('-createdAt')
  .then(function(todos) {
    res.json(todos);
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var todo = new Todo({
    title: req.body.title,
    completed: req.body.completed ? true : false,
    user: req.user
  });
  todo.save()
  .then(function(saved) {
    res.json(todo);
  }, function(err) {
    return next(err);
  });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(todo.user)) return next(makeError(res, 'You do not own that Todo', 401));
    res.json(todo);
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(todo.user)) return next(makeError(res, 'Unauthorized', 401));
    todo.title = req.body.title;
    todo.completed = req.body.completed ? true : false;
    return todo.save();
  })
  .then(function(todo) {
    res.json(todo);
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(todo.user)) return next(makeError(res, 'Unauthorized', 401));
    return Todo.remove( { _id: todo._id } );
  })
  .then(function() {
    res.status(204).end();
  }, function(err) {
    return next(err);
  });
});

// TOGGLE completed status
router.get('/:id/toggle', authenticate, function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(todo.user)) return next(makeError(res, 'Unauthorized', 401));
    todo.completed = !todo.completed;
    return todo.save();
  })
  .then(function(todo) {
    res.json(todo);
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
