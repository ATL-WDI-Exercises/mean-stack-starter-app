
/* The authInterceptor is connected to $httpProvider in the config section
   below. With an interceptor each $http request and/or response can be
   intercepted and handled by the interceptor. What we have implemented is a
   (client side) redirect to the login state for 401 errors or a redirect to
   the error state (all other errors).
*/
function authInterceptor($rootScope, $q, $injector) {
  let state;
  return {
    // Intercept 401s and redirect you to login
    responseError(response) {
      state = state || $injector.get('$state');
      if (response.status === 401) {
        console.log('error:', response.data);
        state.go('login');
      }
      else {
        console.log('error:', response.data);
        state.go('error', { error: response.data });
      }
      return $q.reject(response);
    }
  };
}


angular.module('myApp')
.factory('authInterceptor', authInterceptor)
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
