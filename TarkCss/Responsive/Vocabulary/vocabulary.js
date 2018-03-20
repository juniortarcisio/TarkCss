app.controller('vocabularyCtrl', function ($scope, $rootScope, ServerService, VocabularyService, SpeechService) {
    $scope.languages = VocabularyService.getLanguages();
    $scope.wordGrups = VocabularyService.getWords();

    $scope.selectedWordGroup = $scope.wordGrups[0];

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $rootScope.langLearn.id);
    }

    $scope.SpeakSpaced = function (msg) {
        SpeechService.SpeakSpaced(msg, $rootScope.langLearn.id);
    }

});
