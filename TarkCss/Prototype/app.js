var app = angular.module('myApp', ["ngRoute"]);

app.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
}]);

app.controller('serversCtrl', function ($scope, $rootScope, $http, $location) {
    $rootScope.pageTitle = "Servers";
    $rootScope.username = "Player One";

    $scope.SelectServer = function (server) {
        $scope.selectedServer = server;
    };

    $scope.RefreshServer = function () {
        $http.get("http://200.153.165.174:27500/TarkNoIP/Server/1")
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
    $scope.welcomeMessage = "You are soon entering in a new experience inside a parallel world...                              Which is related to the reality...                            <br>.....                                I warn you to be ready...                              Don't expect anything and at the same time                             be ready for everything.";
    $scope.writtingCount = 0;

    if ($rootScope.keyboardSound == null)
        $rootScope.keyboardSound = new Audio('keyboard.mp4');

    $scope.Write = function () {
        if ($rootScope.keyboardSound.paused)
        {
            $rootScope.keyboardSound.play();
        }
        if ($scope.writtingCount < $scope.welcomeMessage.length) {
            $scope.writtingCount++;

            //ignore html tags
            if ($scope.welcomeMessage.charAt($scope.writtingCount) == "<") {
                while($scope.writtingCount < $scope.welcomeMessage.length)
                {
                    $scope.writtingCount++;
                    if ($scope.welcomeMessage.charAt($scope.writtingCount) == ">")
                        return;
                }
            }
        }
        else {
            $interval.cancel($scope.stopWritting);
            $rootScope.keyboardSound.pause();
        }
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