app.controller('flashcardsCtrl', function ($scope, ServerService, VocabularyService, SpeechService, AnimationService) {
    $scope.languages = VocabularyService.getLanguages();
    $scope.wordGrups = VocabularyService.getWords();
    $scope.langFrom = $scope.languages[LANGUAGE_EN_US];
    $scope.langTo = $scope.languages[LANGUAGE_ID_ID];

    $scope.selectedWordGroup = $scope.wordGrups[0];
    $scope.correct = 0;
    $scope.wrong = 0;

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $scope.langTo.id);
    }

    $scope.nextWord = function () {
        var randomIndex = Math.floor(Math.random() * $scope.selectedWordGroup.wordSubGroups.length);
        var subGroup = $scope.selectedWordGroup.wordSubGroups[randomIndex];

        randomIndex = Math.floor(Math.random() * subGroup.words.length);
        
        if ($scope.randomWord != null && subGroup.words.length > 1 && $scope.randomWord[$scope.langTo.id] === subGroup.words[randomIndex][$scope.langTo.id]) {
            $scope.nextWord();
            return;
        }

        $scope.randomWord = subGroup.words[randomIndex];

        $scope.response = "";
        AnimationService.focusByName('response');
    }

    $scope.answer = function (ignoreEmpty) {
        $scope.clearError();
        if ($scope.response.length === 0 && !ignoreEmpty) {
            AnimationService.focusByName('response');
            $scope.errorMessage = "Write your response or Skip";
            return;
        }

        if ($scope.randomWord[$scope.langTo.id].toUpperCase().trim() == $scope.response.toUpperCase().trim()) {
            $scope.correct++;
            $scope.showSuccess = true;
            AnimationService.animate('score-right', 'sheen');
        }
        else {
            $scope.wrong++;
            $scope.errorMessage = "The right answer was \"" + $scope.randomWord[$scope.langTo.id] + "\". ";
            AnimationService.animate('score-wrong', 'sheen');
        }

        $scope.lastWord = $scope.response;
        $scope.Speak($scope.randomWord[$scope.langTo.id]);

        $scope.nextWord();
    }

    $scope.clearError = function () {
        $scope.lastWord = "";
        $scope.errorMessage = "";
        $scope.showSuccess = false;
    }

    $scope.skip = function () {
        $scope.answer(true);
    }

    $scope.responseKeyPress = function (e) {
        var key = e.which ? e.which : e.keyCode;
        if (key === 13) {
            AnimationService.createWavesByClassName('waves-blue');
            $scope.answer();
        }
        else if (key === 27) {
            AnimationService.createWavesByClassName('waves-red');
            $scope.skip();
        }
        else
            $scope.clearError();
    }

    $scope.nextWord();
    AnimationService.focusByName('response');
});
