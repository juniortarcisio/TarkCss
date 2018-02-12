app.controller('signUpCtrl', function ($scope, $rootScope, AuthenticationService) {
    $rootScope.title = "Sign Up";

    $scope.submit = function () {
        AuthenticationService.SignUp($scope.signUp);
    }
});
