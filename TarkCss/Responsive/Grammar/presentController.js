app.controller('simplePresentCtrl', function ($scope, $rootScope, SpeechService) {
    $scope.verbs = [
        ["To Walk", "Andar", "Jalan"],
        ["To Eat", "Comer", "Makan"],
        ["To Drink", "Beber", "Minum"],
        ["To Buy", "Comprar", "Beli"],
        ["To Swim", "Nadar", "Berenang"],
        ["To Sing", "Cantar", "Bernyanyi"],
        ["To Speak", "Falar", "Bicara"],
        ["To Understand", "Entender", "Mergenti"],
        ["To Work", "Trabalhar", "bekerja"],
        ["To Study", "Estudar", "Belajar"],
        ["To Learn", "Aprender", "Belajar"],
        ["To Play", "Jogar", "Bermain"]
    ];

    $scope.negative = false;
    $scope.interrogative = false;
    $scope.selectedVerb = $scope.verbs[0];

    $scope.loadProcessedVerbs = function (verb, speak) {
        var gp_tp = new GrammarProcessor();
        $scope.selectedVerb = verb;
        $scope.engineVerbs = gp_tp.getSimplePresent($rootScope.langFrom.id, $rootScope.langLearn.id, verb[$rootScope.langLearn.id], $scope.negative, $scope.interrogative);

        if (speak) {
            $rootScope.Speak(verb[$rootScope.langFrom.id], $rootScope.langFrom.id);
            $rootScope.Speak(verb[$rootScope.langLearn.id], $rootScope.langLearn.id);
        }
    };

    $scope.format = function (verb) {
        return verb[$rootScope.langFrom.id] + ' -> ' + verb[$rootScope.langLearn.id];
    };

    
    $scope.reload = function () {
        $scope.loadProcessedVerbs($scope.selectedVerb, false);
    }

    $scope.$watch('langFrom', $scope.reload);
    $scope.$watch('langLearn', $scope.reload);
    
    $scope.loadProcessedVerbs($scope.verbs[0], false);
});