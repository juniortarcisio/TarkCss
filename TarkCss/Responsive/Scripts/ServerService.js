app.service('ServerService', function ($http, $rootScope) {

    this.config = {
        headers: { 'token': null },
        timeout: 60000
    };

    this.GetLastServer = function (filtros, successCallback, errorCallback) {
        var startTime = new Date();
        $http.get("http://tarksapi.azurewebsites.net/Server?serviceId=2")
        .then(function (response) {
            var endTime = new Date();
            var latency = endTime - startTime;

            $rootScope.server = response.data[0];
            $rootScope.server.LatencyAzure = latency;
            console.log(response);


            var startTimePing = new Date();
            $http.get("http://" + $rootScope.server.Address + ":27500/TarkServer/api/Ping")
            .then(function (response) {
                var endTime = new Date();
                var latency = endTime - startTimePing;

                console.log(response);
                $rootScope.server.Latency = latency;
                $rootScope.server.Online = true;
            }, function (response) {
                console.log(response);
                $rootScope.server.Online = false;
            });

        }, function myError(response) {
            $rootScope.error = response;
        });
    }
});