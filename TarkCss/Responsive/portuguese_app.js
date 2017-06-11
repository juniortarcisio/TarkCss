var app = angular.module('myApp', ["ngRoute"]);
app.controller('regularVerbsCtrl', function ($scope, $http) {
    $scope.verbs = [
        { Portuguese: "Andar", English: "Walk" },
        { Portuguese: "Comer", English: "Eat" },
        { Portuguese: "Beber", English: "Drink" },
        { Portuguese: "Comprar", English: "Buy" },
        { Portuguese: "Nadar", English: "Swim" },
        { Portuguese: "Cantar", English: "Sing" },
        { Portuguese: "Falar", English: "Speak" },
        { Portuguese: "Entender", English: "Understand" },
        { Portuguese: "Trabalhar", English: "Work" },
        { Portuguese: "Estudar", English: "Study" },
        { Portuguese: "Aprender", English: "Learn" },
        { Portuguese: "Jogar", English: "Play" }
    ];

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };

});

app.filter('RemoveLastChar', function () {
    return function (x, q) {
        if (typeof q == "undefined")
            q = 1;
        return x.substr(0, x.length - q);
    };
});

app.controller('simplePresentCtrl', function ($scope, $rootScope) {
    $rootScope.title = "SimplePresent";
});

app.controller('toBeCtrl', function ($scope, $rootScope) {
    $rootScope.title = "To be verb";
});

app.controller('settingsCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Settings";
});

app.controller('aboutCtrl', function ($scope, $rootScope) {
    $rootScope.title = "About";
});

app.controller('homeCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Home";
});

app.config(function ($routeProvider) {
    $routeProvider
    .when("/SimplePresent", {
        templateUrl: "portuguese_present.html", controller: "simplePresentCtrl"
    })
    .when("/ToBe", {
        templateUrl: "portuguese_tobe.html", controller: "toBeCtrl"
    })
    .when("/Settings", {
        templateUrl: "portuguese_settings.html", controller: "settingsCtrl"
    })
    .when("/About", {
        templateUrl: "portuguese_about.html", controller: "aboutCtrl"
    })
    .otherwise({
        templateUrl: "portuguese_home.html", controller: "homeCtrl"
    });
});