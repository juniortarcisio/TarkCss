app.controller('pageHeaderCtrl', function ($scope, $rootScope) {
    $scope.selectLanguageFrom = function (language) {
        $rootScope.langFrom = language;
        localStorage.langFrom = $rootScope.langFrom.id;
    }
    $scope.selectLanguageLearn = function (language) {
        $rootScope.langLearn = language;
        localStorage.langLearn = $rootScope.langLearn.id;
    }

    $scope.invertLanguages = function () {
        var oldlearn = $rootScope.langLearn;
        $rootScope.langLearn = $rootScope.langFrom;
        $rootScope.langFrom = oldlearn;

        localStorage.langFrom = $rootScope.langFrom.id;
        localStorage.langLearn = $rootScope.langLearn.id;
    }
});

app.component('pageHeader', {
    bindings: {
    },
    scope: true,
    templateUrl: 'PageHeader/pageHeader.html',
    controller: 'pageHeaderCtrl'
}); 