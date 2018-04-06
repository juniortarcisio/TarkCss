app.controller('pageHeaderCtrl', function ($scope, $rootScope, $timeout) {
    $scope.selectLanguageFrom = function (language) {
        $rootScope.langFrom = language;
        localStorage.langFrom = $rootScope.langFrom.id;
        
        new Audio('../Media/blop.mp3').play();
        $rootScope.hideLangHelp();
    }
    $scope.selectLanguageLearn = function (language) {
        $rootScope.langLearn = language;
        localStorage.langLearn = $rootScope.langLearn.id;
        
        new Audio('../Media/blop.mp3').play();
        $rootScope.hideLangHelp();
    }

    $scope.invertLanguages = function () {
        var oldlearn = $rootScope.langLearn;
        $rootScope.langLearn = $rootScope.langFrom;
        $rootScope.langFrom = oldlearn;

        localStorage.langFrom = $rootScope.langFrom.id;
        localStorage.langLearn = $rootScope.langLearn.id;

        new Audio('../Media/blop.mp3').play();
        $rootScope.hideLangHelp();
    }

    $rootScope.hideLangHelp = function (playSound) {
        $rootScope.langHelp = false;

        if (playSound)
            new Audio('../Media/blop.mp3').play();
    }
    $rootScope.showLangHelp = function (playSound) {
        $rootScope.langHelp = true;

        if ($rootScope.prmsHiddingLangHelp)
            $timeout.cancel($rootScope.prmsHiddingLangHelp);

        $rootScope.prmsHiddingLangHelp = $timeout($rootScope.hideLangHelp, 7000);

        if (playSound)
            new Audio('../Media/blop.mp3').play();
    }
    $rootScope.showLangHelp();
});

app.component('pageHeader', {
    bindings: {
    },
    scope: true,
    templateUrl: 'PageHeader/pageHeader.html',
    controller: 'pageHeaderCtrl'
}); 