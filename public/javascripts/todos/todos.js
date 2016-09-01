angular.module('myApp')
.component('todos', {
  template: `
    <h1>TODOs</h1>

    <div class="todos" ng-repeat = "todo in $ctrl.todos">
      <span ng-show="todo.completed" ng-click="$ctrl.toggle(todo)" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
      <span ng-hide="todo.completed" ng-click="$ctrl.toggle(todo)" class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
      <a ng-click="$ctrl.show(todo)">{{ todo.title }}</a>
      <button ng-click="$ctrl.delete(todo)" class="btn btn-xs btn-danger">X</button>
    </div>
    <hr/>
    <a ui-sref="todo-new" class="btn btn-primary">New</a>
  `,
  controller: function(todoService, $state) {
    this.todos = null;

    this.getTodos = function() {
      todoService.getTodos()
      .then( res => {
        this.todos = res.data;
      });
    };

    this.getTodos();

    this.show = function(todo) {
      $state.go('todo-show', { id: todo._id });
    };

    this.toggle = function(todo) {
      todoService.toggle(todo)
      .then( res => {
        this.getTodos();
      });
    };

    this.delete = function(todo) {
      todoService.delete(todo)
      .then( res => {
        this.getTodos();
      });
    };
  }
});
