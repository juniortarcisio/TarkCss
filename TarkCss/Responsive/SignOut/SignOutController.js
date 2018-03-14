app.controller('signOutCtrl', function ($scope, $rootScope, AuthenticationService) {
    $rootScope.title = "Sign Out";

    AuthenticationService.SignOut();
});
