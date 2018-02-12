app.controller('signInCtrl', function ($scope, $rootScope, $location, AuthenticationService) {
    $rootScope.title = "Sign In";

    $scope.signedUp = function (response) {
        alert('ok you were signed in, but it\'s on construction');
        $location.path("/Home");
    }

    $scope.errorCallback = function (response) {
        alert('error: ' + response);
        $location.path("/Home");
    }

    $scope.submit = function () {
        AuthenticationService.SignIn($scope.user, $scope.signedUp, $scope.errorCallback);
    }
});
