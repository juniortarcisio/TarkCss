﻿app.controller('signUpCtrl', function ($scope, $rootScope, $location, AuthenticationService, GrecaptchaService) {
    $rootScope.title = "Sign Up";

    $scope.signedUp = function (response) {
        alert('ok you were signed in, but it\'s yet on construction');
        $rootScope.home();
    }

    $scope.errorCallback = function (response) {
        $scope.errorMessage = response;
    }

    $scope.submit = function () {
        $scope.errorMessage = "";
        $scope.account.GrecaptchaResponse = GrecaptchaService.GetResponse();

        if ($scope.account.GrecaptchaResponse == null || $scope.account.GrecaptchaResponse.length == 0) {
            $scope.errorMessage = "You must prove you aren't a robot on recaptcha";
            return;
        }

        AuthenticationService.SignUp($scope.account).then(
            function (result) {
                console.log('okctrl')
                $rootScope.home();
            }, function (err) {
                console.log('errctrl')
                $scope.errorMessage = err;
                GrecaptchaService.Reload();
            }).catch(function (data) {
                console.log('catchctrl')
                $scope.errorMessage = "internal client error";
                console.log(data);
                GrecaptchaService.Reload();
            });
    }

    GrecaptchaService.Configure($scope, 'g-recaptcha-sign-up');
});
