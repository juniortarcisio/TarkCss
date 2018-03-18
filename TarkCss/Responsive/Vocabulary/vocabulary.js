app.controller('vocabularyCtrl', function ($scope, ServerService, VocabularyService, SpeechService) {
    $scope.languages = VocabularyService.getLanguages();
    $scope.wordGrups = VocabularyService.getWords();
    $scope.langFrom = $scope.languages[LANGUAGE_EN_US];
    $scope.langTo = $scope.languages[LANGUAGE_ID_ID];

    $scope.selectedWordGroup = $scope.wordGrups[0];

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $scope.langTo.id);
    }

    $scope.SpeakSpaced = function (msg) {
        SpeechService.SpeakSpaced(msg, $scope.langTo.id);
    }

});
