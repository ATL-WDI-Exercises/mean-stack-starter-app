angular.module('myApp')
.service('todoService', function($http) {

  this.getTodos = function() {
    return $http.get('/todos');
  };

  this.getTodo = function(id) {
    return $http.get('/todos/' + id);
  };

  this.toggle = function(todo) {
    return $http.get('/todos/' + todo._id + '/toggle');
  };

  this.create = function(todo) {
    return $http.post('/todos', todo);
  };

  this.update = function(todo) {
    return $http.put('/todos/' + todo._id, todo);
  };

  this.delete = function(todo) {
    return $http.delete('/todos/' + todo._id);
  };
});
