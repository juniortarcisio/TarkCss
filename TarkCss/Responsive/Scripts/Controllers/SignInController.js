app.controller('signInCtrl', function ($scope, $rootScope, $location, AuthenticationService, GrecaptchaService) {
    $rootScope.title = "Sign In";

    $scope.successCallback = function (response) {
        alert('ok you were signed in, but it\'s on construction');
        $location.path("/Home");
    }

    $scope.errorCallback = function (response) {
        alert('error: ' + response);
        $location.path("/Home");
    }

    $scope.submit = function () {
        $scope.account.grecaptchaResponse = GrecaptchaService.GetResponse();

        if ($scope.account.grecaptchaResponse == null || $scope.account.grecaptchaResponse.length == 0) {
            $scope.errorMessage = "You must prove you aren't a robot on recaptcha";
            console.log("invalid recaptcha")
            return;
        }

        AuthenticationService.SignIn($scope.account, $scope.successCallback, $scope.errorCallback);
    }

    $scope.recaptchaValid = function() {
        var recaptchaValue = GrecaptchaService.GetResponse();
        return recaptchaValue != null && typeof recaptchaValue != "undefined" && recaptchaValue.length > 0;
    }

    GrecaptchaService.Configure($scope, 'g-recaptcha-sign-in');
});
