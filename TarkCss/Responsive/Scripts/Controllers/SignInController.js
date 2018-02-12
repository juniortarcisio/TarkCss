app.controller('signInCtrl', function ($scope, $rootScope, AuthenticationService) {
    $rootScope.title = "Sign In";

    $scope.signedUp = function (response) {
        alert('ok you were signed in, but it\'s on construction');
    }

    $scope.errorCallback = function (response) {
        alert('error: ' + response);
    }

    $scope.submit = function () {
        AuthenticationService.SignIn($scope.user, $scope.signedUp, $scope.errorCallback);
    }
});
