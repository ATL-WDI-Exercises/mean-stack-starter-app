angular.module('myApp')
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
    this.todo = null;

    this.edit = function() {
      $state.go('todo-edit', { id: this.todo._id });
    };

    todoService.getTodo($stateParams.id)
    .then( res => {
      this.todo = res.data;
    });
  }
});
