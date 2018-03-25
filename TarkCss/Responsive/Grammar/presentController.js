app.controller('simplePresentCtrl', function ($scope, $rootScope, SpeechService) {
    $scope.verbs = basicList;
    $scope.negative = false;
    $scope.interrogative = false;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.loadProcessedVerbs = function (verb, speak) {
        var gp_tp = new GrammarProcessorPT();
        $scope.selectedVerb = verb;
        $scope.engineVerbs = gp_tp.getSimplePresent(verb.Portuguese, $scope.negative, $scope.interrogative);

        if (speak) {
            $rootScope.Speak(verb.English, 0);
            $rootScope.Speak(verb.Portuguese, 1);
        }
    };

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };

    $scope.loadProcessedVerbs($scope.verbs[0], false);
});