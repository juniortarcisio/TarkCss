app.service('ServerService', function ($http, $rootScope) {

    this.getAzureServerAddress = function () {
        return "http://tarksapi.azurewebsites.net/Server?serviceId=2";
    }

    this.getServerAddress = function () {
        //TODO: refactor the schema, port, virtual route in the server side
        return "http://" + $rootScope.server.Address + ":27500/TarkServer/";
    }

    this.getConfig = function () {
        return {
            headers: { 'token': null },
            timeout: 60000
        };
    }

    this.GetLastServer = function (filtros, successCallback, errorCallback) {
        var startTime = new Date();
        var service = this;

        $http.get(this.getAzureServerAddress())
        .then(function (response) {
            var endTime = new Date();
            var latency = endTime - startTime;

            $rootScope.server = response.data[0];
            $rootScope.server.LatencyAzure = latency;
            $rootScope.server.Online = true;
            console.log(response);

            service.handleHttpAction($http.get, "Ping", null,
            function () {
                $rootScope.server.Online = true;
            }, function () {
                $rootScope.server.Online = false;
            });

        }, function myError(response) {
            $rootScope.error = response;
        });
    }

    this.get = function (route, successCallback, errorCallback) {
        this.handleHttpAction($http.get, route, null, successCallback, errorCallback);
    }

    this.post = function (route, data, successCallback, errorCallback) {
        this.handleHttpAction($http.post, route, data, successCallback, errorCallback);
    }

    this.put = function (route, data, successCallback, errorCallback) {
        this.handleHttpAction($http.put, route, data, successCallback, errorCallback);
    }

    this.delete = function (route, successCallback, errorCallback) {
        this.handleHttpAction($http.delete, route, null, successCallback, errorCallback);
    }

    this.handleHttpAction = function(action, route, data, successCallBack, errorCallback) {
        var startTime = new Date();

        if ($rootScope.server == null || typeof $rootScope.server == "undefined" || !$rootScope.server.Online) {
            alert('Sorry but we cannot attend your request due the server is offline. Please try again later.');
            return;
        }

        var fullRoute = this.getServerAddress() + route;

        console.log("handleHttpAction: ");
        console.log(fullRoute);

        console.log("request payload: ");
        console.log(data);

        action(fullRoute, data, this.getConfig())
        .then(function (response) {
            var endTime = new Date();
            var latency = endTime - startTime;

            $rootScope.server.Latency = latency;
            console.log("response: ");
            console.log(response);

            if (typeof successCallBack != "undefined")
                successCallBack(response);

        }, function myError(response) {
            $rootScope.error = response;

            if (typeof errorCallback != "undefined")
                errorCallback(response);
        });
    }
});