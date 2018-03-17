﻿app.controller('flashcardsCtrl', function ($scope, ServerService, VocabularyService, SpeechService) {
    $scope.wordGrups = VocabularyService.getWords(LANGUAGE_ID_ID);
    $scope.lang = 'id-id'
    $scope.selectedWordGroup = $scope.wordGrups[0];
    $scope.correct = 0;
    $scope.wrong = 0;

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $scope.lang);
    }

    $scope.nextWord = function () {
        var randomIndex = Math.floor(Math.random() * $scope.selectedWordGroup.wordSubGroups.length);
        var subGroup = $scope.selectedWordGroup.wordSubGroups[randomIndex];

        randomIndex = Math.floor(Math.random() * subGroup.words.length);
        $scope.randomWord = subGroup.words[randomIndex];

        $scope.response = "";
        document.getElementsByName('response')[0].focus();
    }

    $scope.answer = function (ignoreEmpty) {
        $scope.clearError();
        if ($scope.response.length === 0 && !ignoreEmpty) {
            document.getElementsByName('response')[0].focus();
            $scope.errorMessage = "Write your response or Skip";
            return;
        }

        if ($scope.randomWord.word.toUpperCase() == $scope.response.toUpperCase()) {
            $scope.correct++;
            $scope.showSuccess = true;
        }
        else {
            $scope.wrong++;
            $scope.errorMessage = "The right answer was \"" + $scope.randomWord.word + "\"";
        }

        $scope.nextWord();
    }

    $scope.clearError = function () {
        $scope.errorMessage = "";
        $scope.showSuccess = false;
    }

    $scope.skip = function () {
        $scope.answer(true);
    }

    $scope.responseKeyPress = function (e) {
        var key = e.which ? e.which : e.keyCode;
        if (key === 13)
            $scope.answer();
        else if (key === 27)
            $scope.skip();
        else
            $scope.clearError();
    }

    $scope.nextWord();
});