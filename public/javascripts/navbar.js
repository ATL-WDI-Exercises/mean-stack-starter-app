angular.module('myApp')
.component('navbar', {
  template: `
    <nav class="navbar navbar-fixed-top navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" ui-sref="home">
            <span class="glyphicon glyphicon-home"></span> MEAN Stack Starter App
          </a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
          <ul class="nav navbar-nav">
            <li ng-class="{ active: $ctrl.$state.includes('home') }" ><a ui-sref="home">Home</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li ng-class="{ active: $ctrl.$state.includes('about') }" ><a ui-sref="about">About</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  controller: function navbarCtrl($state) {
    this.$state = $state;
  }
});
