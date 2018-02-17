app.controller('signUpCtrl', function ($scope, $rootScope, $location, AuthenticationService, GrecaptchaService) {
    $rootScope.title = "Sign Up";

    $scope.signedUp = function (response) {
        alert('ok you were signed in, but it\'s yet on construction');
        $location.path("/Home");
    }

    $scope.errorCallback = function (response) {
        $scope.errorMessage = response;
    }

    $scope.submit = function () {
        $scope.errorMessage = "";
        $scope.account.grecaptchaResponse = GrecaptchaService.GetResponse();

        if ($scope.account.grecaptchaResponse == null || $scope.account.grecaptchaResponse.length == 0) {
            $scope.errorMessage = "You must prove you aren't a robot on recaptcha";
            console.log("invalid recaptcha")
            return;
        }


        AuthenticationService.SignUp($scope.account, $scope.signedUp, $scope.errorCallback);
    }

    GrecaptchaService.Configure($scope, 'g-recaptcha-sign-up');
});
