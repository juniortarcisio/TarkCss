app.controller('vocabularyCtrl', function ($scope, ServerService, VocabularyService, SpeechService) {
    $scope.wordGrups = VocabularyService.getWords();
    $scope.langFrom = LANGUAGE_EN_US;
    $scope.langTo = LANGUAGE_ID_ID;

    $scope.selectedWordGroup = $scope.wordGrups[0];

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $scope.langTo);
    }

    $scope.SpeakSpaced = function (msg) {
        SpeechService.SpeakSpaced(msg, $scope.langTo);
    }

});
