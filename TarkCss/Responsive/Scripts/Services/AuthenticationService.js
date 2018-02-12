app.service('AuthenticationService', function (ServerService) {
    this.SignUp = function (data, successCallback, errorCallback) {
        ServerService.post("/SignUp", data, successCallback, errorCallback);
    }
});