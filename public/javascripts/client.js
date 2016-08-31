angular.module('myApp', ['ngMessages', 'ngAnimate', 'ui.router']);

angular.module('myApp')
.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
  .state('home', {
    url: "/home",
    template: "<home></home>"
  })
  .state('about', {
    url: "/about",
    template: "<about></about>"
  })
  .state('login', {
    url: "/login",
    template: "<login></login>"
  })
  .state('signup', {
    url: "/signup",
    template: "<signup></signup>"
  })
  .state('todos', {
    url: "/todos",
    template: "<todos></todos>"
  })
  .state('todo-new', {
    url: "/todos/new",
    template: "<todo-new></todo-new>"
  })
  .state('todo-show', {
    url: "/todos/:id",
    template: "<todo-show></todo-show>"
  })
  .state('todo-edit', {
    url: "/todos/edit/:id",
    template: "<todo-edit></todo-edit>"
  });

});
