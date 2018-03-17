app.controller('vocabularyCtrl', function ($scope, ServerService, VocabularyService, SpeechService) {
    $scope.wordGrups = VocabularyService.getWords(LANGUAGE_ID_ID);
    $scope.lang = 'id-id'

    $scope.selectedWordGroup = $scope.wordGrups[0];

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $scope.lang);
    }

    $scope.SpeakSpaced = function (msg) {
        SpeechService.SpeakSpaced(msg, $scope.lang);
    }

});
