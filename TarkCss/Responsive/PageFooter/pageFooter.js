app.controller('pageFooterCtrl', function ($scope, $rootScope) {
    $scope.selectLanguageFrom = function (index) {
        $rootScope.langFrom = $rootScope.languages[index];
    }

});


app.component('pageFooter', {
    bindings: {
    },
    scope: true,
    templateUrl: 'PageFooter/pageFooter.html',
    controller: 'pageFooterCtrl'
});