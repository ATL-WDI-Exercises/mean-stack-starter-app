angular.module('myApp')
.component('todoNew', {
  template: `
    <h3>NEW</h3>

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

      <a ui-sref="todos" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  `,
  controller: function(todoService, $state) {
    this.todo = {
      title: '',
      completed: false
    };

    this.save = function() {
      todoService.create(this.todo)
      .then( res => {
        $state.go('todos');
      });
    };
  }
});
