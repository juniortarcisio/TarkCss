var app = angular.module('myApp', ["ngRoute"]);

app.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
}]);

app.controller('serversCtrl', function ($scope, $rootScope, $http, $location) {
    $rootScope.pageTitle = "Servers";
    $rootScope.username = "Player One";

    $scope.SelectServer = function(server) {
        $scope.selectedServer = server;
    };

    $scope.RefreshServer = function () {
        $http.get("http://localhost:50907/Server/1")
        .then(function (response) {
            $scope.servers = response.data;
        }, function myError(response) {
            $scope.servers = response.statusText;
        });
        $scope.selectedServer = null;
    };

    $scope.ConnectToServer = function (server) {
        $rootScope.connectedServer = server;
        $location.path("/home");
    };

    $scope.RefreshServer();
});

app.controller('homeCtrl', function ($scope, $rootScope, $interval) {
    $rootScope.pageTitle = "Home";
    $scope.welcomeMessage = "You are soon to enter in a new experience inside a parallel  world which is related to the reality...<br/>I warn you to be ready and to don't expect anything and at the same time be ready for everything";
    $scope.writtingCount = 0;

    $scope.Write = function () {
        if ($scope.writtingCount < $scope.welcomeMessage.length) {
            $scope.writtingCount++;
        }
        else
            $interval.cancel($scope.stopWritting);
    };

    $scope.stopWritting = $interval($scope.Write, 30);
});

app.config(function ($routeProvider) {
    $routeProvider
    .when("/Servers", {
        templateUrl: "servers.html", controller: "serversCtrl"
    })
    .otherwise({
        templateUrl: "home.html", controller: "homeCtrl"
    });
});