app.controller('vocabularyCtrl', function ($scope, $rootScope, ServerService, VocabularyService, SpeechService) {
    $scope.languages = VocabularyService.getLanguages();
    $scope.albums = VocabularyService.getWordAlbums();

    $scope.selectedAlbum = $scope.albums[0];

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $rootScope.langLearn.id);
    }

    $scope.SpeakSpaced = function (msg) {
        SpeechService.SpeakSpaced(msg, $rootScope.langLearn.id);
    }

    $scope.formatObs = function(obs) {
        if (obs == null)
            return "";

        return "(" + obs + ")";
    }

});
