angular.module('myApp')
.component('login', {
  template: `
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Login</h1>
      </div>
      <div class="col-sm-12">
        <form class="form" name="form" ng-submit="$ctrl.login(form)" novalidate>

          <div class="form-group">
            <label>Email</label>

            <input type="email" name="email" class="form-control" ng-model="$ctrl.user.email" required>
          </div>

          <div class="form-group">
            <label>Password</label>

            <input type="password" name="password" class="form-control" ng-model="$ctrl.user.password" required>
          </div>

          <div class="form-group has-error">
            <p class="help-block" ng-show="form.email.$error.required && form.password.$error.required && $ctrl.submitted">
               Please enter your email and password.
            </p>
            <p class="help-block" ng-show="form.email.$error.email && $ctrl.submitted">
               Please enter a valid email.
            </p>

            <p class="help-block">{{ $ctrl.errors.login }}</p>
          </div>

          <div>
            <button class="btn btn-inverse btn-lg btn-login" type="submit">
              Login
            </button>
            <a class="btn btn-default btn-lg btn-register" ui-sref="signup">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
    <hr>
  </div>
  `,
  controller: function(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
    this.errors = {};

    this.login = function(form) {
      this.submitted = true;

      if (form.$valid) {
        this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to todos
          this.$state.go('todos');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
      }
    };
  }
});
