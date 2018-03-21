app.controller('pageHeaderCtrl', function ($scope, $rootScope) {
    $scope.selectLanguageFrom = function (language) {
        $rootScope.langFrom = language;
    }
    $scope.selectLanguageLearn = function (language) {
        $rootScope.langLearn = language;
    }

    $scope.invertLanguages = function () {
        var oldlearn = $rootScope.langLearn;
        $rootScope.langLearn = $rootScope.langFrom;
        $rootScope.langFrom = oldlearn;
    }
});

app.component('pageHeader', {
    bindings: {
    },
    scope: true,
    templateUrl: 'PageHeader/pageHeader.html',
    controller: 'pageHeaderCtrl'
}); 