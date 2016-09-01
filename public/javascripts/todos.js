angular.module('myApp')
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
});

angular.module('myApp')
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
