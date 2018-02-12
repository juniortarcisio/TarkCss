app.controller('signUpCtrl', function ($scope, $rootScope, AuthenticationService) {
    $rootScope.title = "Sign Up";

    $scope.signedUp = function (response) {
        alert('ok you were signed in, but it\'s on construction');
    }

    $scope.errorCallback = function (response) {
        alert('error: ' + response);
    }

    $scope.submit = function () {
        AuthenticationService.SignUp($scope.newUser, $scope.signedUp, $scope.errorCallback);
    }
});
