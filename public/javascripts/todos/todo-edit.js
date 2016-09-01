angular.module('myApp')
.component('todoEdit', {
  template: `
    <h3>EDIT</h3>

    <form ng-submit="$ctrl.save()">

      <div class="form-group">
        <label for="title">Title</label>
        <input type="text"
               class="form-control"
               name="title"
               ng-model="$ctrl.todo.title">
      </div>

      <div class="form-group">
        <label for="completed">Completed</label>
        <input type="checkbox"
               class="form-control"
               name="completed"
               ng-model="$ctrl.todo.completed">
      </div>

      <a ng-click="$ctrl.show()" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(todoService, $state, $stateParams) {
    this.todo = null;

    this.show = function() {
      $state.go('todo-show', { id: this.todo._id });
    };

    this.save = function() {
      todoService.update(this.todo)
      .then( res => {
        $state.go('todos');
      });
    };

    todoService.getTodo($stateParams.id)
    .then( res => {
      this.todo = res.data;
    });
  }
});
