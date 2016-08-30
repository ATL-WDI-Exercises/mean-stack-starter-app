angular.module('myApp')
.component('home', {
  template: `
  <section class="container well text-center">
    <h1>Welcome to the</h1>
    <h1>{{ $ctrl.name }}</h1>
  </section>
  `,
  controller: function homeCtrl() {
    this.name = 'MEAN Stack Starter App';
  }
});
