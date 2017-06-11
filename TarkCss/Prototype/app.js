var app = angular.module('myApp', ["ngRoute"]);
app.controller('serversCtrl', function ($scope, $http) {

    $http.get("http://localhost:50907/Server/1")
    .then(function (response) {
        $scope.servers = response.data;
    }, function myError(response) {
        $scope.servers = response.statusText;
    });

    $scope.SelectServer = function(server) {
        $scope.selectedServer = server;
        $scope.selectedName = server.Name;
    };

    //$http({
    //    method: "GET",
    //    url: "welcome.htm"
    //}).then(function mySuccess(response) {
    //    $scope.results = response.data;
    //}, function myError(response) {
    //    $scope.results = response.statusText;
    //});

});


//app.controller('simplePresentCtrl', function ($scope, $rootScope) {
//    $rootScope.title = "SimplePresent";
//});

//app.controller('toBeCtrl', function ($scope, $rootScope) {
//    $rootScope.title = "To be verb";
//});

//app.controller('settingsCtrl', function ($scope, $rootScope) {
//    $rootScope.title = "Settings";
//});

//app.controller('aboutCtrl', function ($scope, $rootScope) {
//    $rootScope.title = "About";
//});

//app.controller('homeCtrl', function ($scope, $rootScope) {
//    $rootScope.title = "Home";
//});

//app.config(function ($routeProvider) {
//    $routeProvider
//    .when("/SimplePresent", {
//        templateUrl: "portuguese_present.html", controller: "simplePresentCtrl"
//    })
//    .when("/ToBe", {
//        templateUrl: "portuguese_tobe.html", controller: "toBeCtrl"
//    })
//    .when("/Settings", {
//        templateUrl: "portuguese_settings.html", controller: "settingsCtrl"
//    })
//    .when("/About", {
//        templateUrl: "portuguese_about.html", controller: "aboutCtrl"
//    })
//    .otherwise({
//        templateUrl: "portuguese_home.html", controller: "homeCtrl"
//    });
//});