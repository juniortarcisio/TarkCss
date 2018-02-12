app.controller('signUpCtrl', function ($scope, $rootScope, $location, AuthenticationService, GrecaptchaService) {
    $rootScope.title = "Sign Up";

    $scope.signedUp = function (response) {
        alert('ok you were signed in, but it\'s on construction');
        $location.path("/Home");
    }

    $scope.errorCallback = function (response) {
        alert('error: ' + response);
        $location.path("/Home");
    }

    $scope.submit = function () {
        $scope.account.grecaptchaResponse = GrecaptchaService.GetResponse();
        AuthenticationService.SignUp($scope.account, $scope.signedUp, $scope.errorCallback);
    }

    GrecaptchaService.Configure($scope, 'g-recaptcha-sign-up');
});
