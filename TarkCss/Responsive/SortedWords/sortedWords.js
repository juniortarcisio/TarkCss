app.controller('sortedWordsCtrl', function ($scope, $rootScope, $location, ServerService, VocabularyService, SpeechService) {
    $scope.languages = VocabularyService.getLanguages();
    $scope.albums = VocabularyService.getWordAlbums();

    $scope.similarWordsGroups = function () {
        var orderedWords = new Array();

        for (var i = 0; i < $scope.albums.length; i++) {
            for (var j = 0; j < $scope.albums[i].decks.length; j++) {
                for (var k = 0; k < $scope.albums[i].decks[j].words.length; k++) {

                    //Ignore math numbers
                    if (i == 2 && j < 4)
                        continue;

                    var word = $scope.albums[i].decks[j].words[k];
                    word.albumName = $scope.albums[i].name;
                    word.deckName = $scope.albums[i].decks[j].name;
                    orderedWords.push(word);
                }
            }
        }

        $scope.albums = null;

        orderedWords = orderedWords.sort(function (a, b) {
            if (a.lang[$rootScope.langLearn.id] > b.lang[$rootScope.langLearn.id])
                return 1;
            else if (a.lang[$rootScope.langLearn.id] < b.lang[$rootScope.langLearn.id])
                return -1;
            else return 0;
        });
        
        var similarWordsGroups = new Array();
        var currentGroupPrefix = ' ';
        var similarityLevel = 3;
            
        for (var i = 0; i < orderedWords.length; i++) {
            if (orderedWords[i].lang[$rootScope.langLearn.id].length < similarityLevel)
                continue;

            var currentWordPrefix = orderedWords[i].lang[$rootScope.langLearn.id].substring(0, similarityLevel);

            //Similarity rule here...
            if (currentWordPrefix != currentGroupPrefix) {

                //Checks if there is a next word and at least the next word is similar
                if (i < orderedWords.length - 1) {
                    var nextWordPrefix = orderedWords[i + 1].lang[$rootScope.langLearn.id].substring(0, similarityLevel);

                    if (currentWordPrefix != nextWordPrefix)
                        continue;
                } else {
                    continue;
                }

                currentGroupPrefix = currentWordPrefix;

                var newWordGroup = {
                    prefix: currentWordPrefix,
                    words: new Array()
                };
                
                similarWordsGroups.push(newWordGroup);
            }

            similarWordsGroups[similarWordsGroups.length - 1].words.push(orderedWords[i]);
        }

        return similarWordsGroups;
    }();

    $scope.formatObs = function (obs) {
        if (obs == null)
            return "";

        return "(" + obs + ")";
    }
});
