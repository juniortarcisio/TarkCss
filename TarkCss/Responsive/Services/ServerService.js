app.service('ServerService', function ($http, $rootScope, $q) {

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

    this.GetLastServer = function () {
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

            service.handleHttpAction($http.get, "Ping")
            .then(function (response) {
                $rootScope.server.Online = true;
            }, function (response, status) {
                $rootScope.server.Online = false;
            });

        }, function myError(response) {
            $rootScope.error = response;
        });
    }

    this.get = function (route) {
        return this.handleHttpAction($http.get, route, null);
    }

    this.post = function (route, data) {
        return this.handleHttpAction($http.post, route, data);
    }

    this.put = function (route, data) {
        return this.handleHttpAction($http.put, route, data);
    }

    this.delete = function (route) {
        return this.handleHttpAction($http.delete, route, null);
    }

    this.handleHttpAction = function(action, route, data) {
        var startTime = new Date();

        if ($rootScope.server == null || typeof $rootScope.server == "undefined" || !$rootScope.server.Online) {
            return $q.reject('Sorry but we cannot attend your request due the server is offline. Please try again later.');
        }

        var fullRoute = this.getServerAddress() + route;

        console.log("handleHttpAction: ");
        console.log(fullRoute);

        console.log("request payload: ");
        console.log(data);

        return action(fullRoute, data, this.getConfig())
        .then(function (response) {
            var endTime = new Date();
            var latency = endTime - startTime;

            $rootScope.server.Latency = latency;
            $rootScope.server.LastResponse = response;

            console.log("response: ");
            console.log(response);

            return response;

        }, function (response, status) {
            $rootScope.server.LastResponse = response;
            $rootScope.error = response;

            return $q.reject(response);
        });
    }
});