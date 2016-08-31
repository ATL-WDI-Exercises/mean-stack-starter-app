// TODO: This is just the beginning. More to come later...
angular.module('myApp')
.service('todoService', function($http) {

  this.getTodos = function() {
    return $http.get('/todos');
  };

  this.getTodo = function(id) {
    console.log('getting todo with id:', id);
    return $http.get('/todos/' + id);
  };

  this.toggle = function(todo) {
    return $http.get('/todos/' + todo._id + '/toggle');
  };

  this.delete = function(todo) {
    return $http.delete('/todos/' + todo._id);
  };
})
.component('todos', {
  template: `
    <h1>TODOs</h1>

    <div ng-repeat = "todo in $ctrl.todos">
      <span ng-show="todo.completed" ng-click="$ctrl.toggle(todo)" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      <span ng-hide="todo.completed" ng-click="$ctrl.toggle(todo)" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
      <a ng-click="$ctrl.show(todo)">{{ todo.title }}</a>
      <button ng-click="$ctrl.delete(todo)" class="btn btn-xs btn-danger">X</button>
    </div>

    <a ui-sref="todo-new" class="btn btn-primary">New</a>
  `,
  controller: function(todoService, $state) {
    this.todoService = todoService;
    this.$state = $state;
    this.todos = null;

    this.getTodos = function() {
      todoService.getTodos()
      .then( res => {
        this.todos = res.data;
      });
    };

    this.getTodos();

    this.show = function(todo) {
      this.$state.go('todo-show', { id: todo._id });
    };

    this.toggle = function(todo) {
      this.todoService.toggle(todo)
      .then( res => {
        this.getTodos();
      });
    };

    this.delete = function(todo) {
      this.todoService.delete(todo)
      .then( res => {
        this.getTodos();
      });
    };
  }
})
.component('todoShow', {
  template: `
    <h3>SHOW</h3>
    <p><b>Title: </b>{{ $ctrl.todo.title }}</p>
    <p><b>ID: </b>{{ $ctrl.todo._id }}</p>
    <p><b>Completed: </b>
      <span ng-show="$ctrl.todo.completed" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      <span ng-hide="$ctrl.todo.completed" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
    </p>
    <p><b>Created: </b>{{ $ctrl.todo.updatedAt | date : "medium" }}</p>
    <p><b>Last Updated: </b>{{ $ctrl.todo.createdAt | date : "medium" }}</p>

    <a ui-sref="todos" class="btn btn-primary">Back</a>
    <a ng-click="$ctrl.edit(todo)" class="btn btn-warning">Edit</a>
    <!-- I could not get the opts to work this way:
    <!-- <a ui-sref="todo-edit" ui-sref-opts="{ id: $ctrl.todo._id }" class="btn btn-primary">Edit</a> -->
  `,
  controller: function(todoService, $state, $stateParams) {
    this.todoService = todoService;
    this.$state = $state;
    this.todo = null;

    this.edit = function() {
      this.$state.go('todo-edit', { id: this.todo._id });
    };

    todoService.getTodo($stateParams.id)
    .then( res => {
      this.todo = res.data;
      console.log('this.todo:', JSON.stringify(this.todo));
    });
  }
})
.component('todoNew', {
  template: `
    <h3>NEW</h3>
    <p>TODO: finish this.</p>

    <a ui-sref="todos" class="btn btn-primary">Back</a>
  `,
  controller: function(todoService, $state, $stateParams) {
    this.todoService = todoService;
    this.$state = $state;
    this.todo = null;
  }
})
.component('todoEdit', {
  template: `
    <h3>EDIT</h3>
    <p>TODO: finish this.</p>

    <a ng-click="$ctrl.show()" class="btn btn-primary">Back</a>
  `,
  controller: function(todoService, $state, $stateParams) {
    this.todoService = todoService;
    this.$state = $state;
    this.todo = null;

    this.show = function() {
      this.$state.go('todo-show', { id: this.todo._id });
    };

    todoService.getTodo($stateParams.id)
    .then( res => {
      this.todo = res.data;
      console.log('this.todo:', JSON.stringify(this.todo));
    });
  }
});
