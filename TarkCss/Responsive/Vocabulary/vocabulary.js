app.controller('vocabularyCtrl', function ($scope, $rootScope, $location, ServerService, VocabularyService, SpeechService) {
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

    $scope.practice = function (albumId, deckId) {
        $location.path("Vocabulary/Flashcards/" + albumId + "/" + deckId);
    }

    $scope.filterWordShow = function (value, index, array) {
        if (value.show)
            return value.show[$rootScope.langLearn.id] || value.show[$rootScope.langFrom.id];

        return true;
    }

    $scope.calculateDeckAndWords = function () {
        $scope.totalDecks = 0;
        $scope.totalWords = 0;

        for (var i = 0; i < $scope.albums.length; i++){
            $scope.totalDecks += $scope.albums[i].decks.length;

            for (var j = 0; j < $scope.albums[i].decks.length; j++) 
                $scope.totalWords += $scope.albums[i].decks[j].words.length;
        }
    };

    $scope.calculateDeckAndWords();
});
