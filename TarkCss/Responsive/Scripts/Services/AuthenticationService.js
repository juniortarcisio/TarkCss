app.service('AuthenticationService', function (ServerService) {
    this.SignUp = function (data, successCallback, errorCallback) {
        ServerService.post("/Account/SignUp", data, successCallback, errorCallback);
    }

    this.SignIn = function (data, successCallback, errorCallback) {
        ServerService.post("/Account/SignIn", data, successCallback, errorCallback);
    }
});