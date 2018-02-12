app.service('ServerService', function ($http, $rootScope) {

    this.getAzureServerAddress = function () {
        return "http://tarksapi.azurewebsites.net/Server?serviceId=2";
    }

    this.getServerAddress = function () {
        return "http://" + $rootScope.server.Address + ":27500";
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
            console.log(response);

            service.handleHttpAction($http.get, "/TarkServer/api/Ping", null,
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

    this.handleHttpAction = function(action, route, data, successCallBack, errorCallback) {
        var startTime = new Date();
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
                successCallBack();

        }, function myError(response) {
            $rootScope.error = response;

            if (typeof errorCallback != "undefined")
                errorCallback();
        });
    }
});