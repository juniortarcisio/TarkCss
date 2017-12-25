var app = angular.module('myApp', ["ngRoute"]);

var basicList = [
        { Portuguese: "Andar", English: "To Walk" },
        { Portuguese: "Comer", English: "To Eat" },
        { Portuguese: "Beber", English: "To Drink" },
        { Portuguese: "Comprar", English: "To Buy" },
        { Portuguese: "Nadar", English: "To Swim" },
        { Portuguese: "Cantar", English: "To Sing" },
        { Portuguese: "Falar", English: "To Speak" },
        { Portuguese: "Entender", English: "To Understand" },
        { Portuguese: "Trabalhar", English: "To Work" },
        { Portuguese: "Estudar", English: "To Study" },
        { Portuguese: "Aprender", English: "To Learn" },
        { Portuguese: "Jogar", English: "To Play" }
];

app.controller('regularVerbsCtrl', function ($scope, $http) {


});

app.filter('RemoveLastChar', function () {
    return function (x, q) {
        if (typeof q == "undefined")
            q = 1;
        return x.substr(0, x.length - q);
    };
});

app.controller('simplePresentCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Simple Present";
    $scope.verbs = basicList;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});

app.controller('presentContinuousCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Present Continuous";
    $scope.verbs = basicList;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});

app.controller('simplePastCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Simple Past";

    $scope.verbs = [
        { Portuguese: "Andar", English: "To Walk" },
        { Portuguese: "Comprar", English: "To Buy" },
        { Portuguese: "Nadar", English: "To Swim" },
        { Portuguese: "Cantar", English: "To Sing" },
        { Portuguese: "Falar", English: "To Speak" },
        { Portuguese: "Trabalhar", English: "To Work" },
        { Portuguese: "Estudar", English: "To Study" },
        { Portuguese: "Jogar", English: "To Play" }
    ];

    $scope.selectedVerb = $scope.verbs[0];

    $scope.verbsE = [
        { Portuguese: "Comer", English: "To Eat" },
        { Portuguese: "Beber", English: "To Drink" },
        { Portuguese: "Entender", English: "To Understand" },
        { Portuguese: "Aprender", English: "To Learn" }
    ];

    $scope.selectedVerbE = $scope.verbsE[0];


    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});


app.controller('pastContinuousCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Present Continuous";
    $scope.verbs = basicList;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});

app.controller('simpleFutureCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Simple Future";
    $scope.verbs = basicList;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});


app.controller('tenseComparisonCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Tenses Comparison";
    $scope.verbs = [
        { Portuguese: "Andar", English: "To Walk" },
        { Portuguese: "Comprar", English: "To Buy" },
        { Portuguese: "Nadar", English: "To Swim" },
        { Portuguese: "Cantar", English: "To Sing" },
        { Portuguese: "Falar", English: "To Speak" },
        { Portuguese: "Trabalhar", English: "To Work" },
        { Portuguese: "Estudar", English: "To Study" },
        { Portuguese: "Jogar", English: "To Play" }
    ];

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
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
    .when("/ToBe", {
        templateUrl: "portuguese_tobe.html", controller: "toBeCtrl"
    })
    .when("/SimplePresent", {
        templateUrl: "portuguese_present.html", controller: "simplePresentCtrl"
    })
    .when("/PresentContinuous", {
        templateUrl: "portuguese_presentContinuous.html", controller: "presentContinuousCtrl"
    })    
    .when("/SimplePast", {
        templateUrl: "portuguese_past.html", controller: "simplePastCtrl"
    })
    .when("/PastContinuous", {
        templateUrl: "portuguese_pastContinuous.html", controller: "pastContinuousCtrl"
    })
    .when("/SimpleFuture", {
        templateUrl: "portuguese_future.html", controller: "simpleFutureCtrl"
    })
    .when("/Settings", {
        templateUrl: "portuguese_settings.html", controller: "settingsCtrl"
    })
    .when("/About", {
        templateUrl: "portuguese_about.html", controller: "aboutCtrl"
    })
    .when("/TenseComparison", {
        templateUrl: "portuguese_tenseComparison.html", controller: "tenseComparisonCtrl"
    })    
    .otherwise({
        templateUrl: "portuguese_home.html", controller: "homeCtrl"
    });
});