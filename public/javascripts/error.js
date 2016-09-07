angular.module('myApp')
.component('error', {
  template: `
    <section class="container text-center error">
      <h1>ERROR</h1>
      <dl class="dl-horizontal">
        <dt>Status</dt><dd>{{ $ctrl.error.status }}</dd>
        <dt>Message</dt><dd>{{ $ctrl.error.message }}</dd>
      </dl>
    </section>
  `,
  controller: function($stateParams, $http) {
    this.error = $stateParams.error;
  }
});
