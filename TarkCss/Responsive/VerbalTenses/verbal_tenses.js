app.controller('verbalTensesCtrl', function ($scope, $rootScope, SpeechService) {
    $scope.verbalTenses = [
        { id: 0, name: 'To Be' },
        { id: 1, name: 'Simple Present' },
        { id: 2, name: 'Present Continuous' },
        { id: 3, name: 'Simple Past' },
        { id: 4, name: 'Past Continuous' },
        { id: 5, name: 'Simple Future' }
    ];

    $scope.verbs = [
        ["To Walk", "Andar", "Berjalan"],
        ["To Eat", "Comer", "Makan"],
        ["To Drink", "Beber", "Minum"],
        ["To Buy", "Comprar", "Membeli"],
        ["To Swim", "Nadar", "Berenang"],
        ["To Sing", "Cantar", "Bernyanyi"],
        ["To Speak", "Falar", "Berbicara"],
        ["To Understand", "Entender", "Mergenti"],
        ["To Work", "Trabalhar", "Bekerja"],
        ["To Study", "Estudar", "Belajar"],
        ["To Learn", "Aprender", "Belajar"],
        ["To Play", "Jogar", "Bermain"],
        ["To Ask", "Pedir", "Minta"]
    ];

    $scope.negative = false;
    $scope.interrogative = false;
    $scope.selectedVerb = $scope.verbs[0];
    $scope.selectedTense = $scope.verbalTenses[0];

    this.$onInit = function () {
        if (typeof $scope.$ctrl.tense != "undefined") {
            $scope.hideTenses = true;        
            $scope.selectedTense = $scope.verbalTenses[$scope.$ctrl.tense];
        }
    }

    $scope.loadProcessedVerbs = function (verb, speak, effect) {
        
        if (effect) {
            var audio = new Audio('../Media/blop.mp3');
            audio.play();
        }

        var gp_tp = new GrammarProcessor();
        $scope.selectedVerb = verb;
        $scope.engineVerbs = gp_tp.getVerbalTense($rootScope.langFrom.id, $rootScope.langLearn.id, verb[$rootScope.langLearn.id], $scope.negative, $scope.interrogative, $scope.selectedTense.id);

        if (speak) {
            $rootScope.Speak(verb[$rootScope.langFrom.id], $rootScope.langFrom.id);
            $rootScope.Speak(verb[$rootScope.langLearn.id], $rootScope.langLearn.id);
        }
    };

    $scope.selectVerbalTense = function(verbalTense) {
        $scope.selectedTense = verbalTense;
        $scope.loadProcessedVerbs($scope.selectedVerb, false);
    }

    $scope.format = function (verb) {
        return verb[$rootScope.langFrom.id] + ' -> ' + verb[$rootScope.langLearn.id];
    };

    
    $scope.reload = function () {
        $scope.loadProcessedVerbs($scope.selectedVerb, false);
    }

    $scope.$watch('$root.langFrom', $scope.reload);
    $scope.$watch('$root.langLearn', $scope.reload);
    
    $scope.loadProcessedVerbs($scope.verbs[0], false);
});

app.component('verbalTenses', {
    bindings: {
        tense: '<'
    },
    scope: true,
    templateUrl: 'VerbalTenses/verbal_tenses.html',
    controller: 'verbalTensesCtrl'
});