app.controller('flashcardsCtrl', function ($scope, $rootScope, $timeout, $routeParams, $document, ServerService, VocabularyService, SpeechService, AnimationService) {
    $scope.languages = VocabularyService.getLanguages();
    $scope.albums = VocabularyService.getWordAlbums();

    $scope.STAGE_ALBUM_SELECTION = 0;
    $scope.STAGE_DECK_SELECTION = 1;
    $scope.STAGE_RUNNING = 2;
    $scope.STAGE_RESULTS = 3;
    $scope.WORDS_COUNT = 10;
    $scope.selectedStage = $scope.STAGE_ALBUM_SELECTION;
    this.response = "";
    
    $scope.navigateToStage = function (stageId) {
        new Audio('../Media/blop.mp3').play();
        $scope.selectedStage = stageId;
    }

    $scope.selectAlbum = function (album) {
        new Audio('../Media/blop.mp3').play();
        $scope.selectedAlbum = album;

        if (album == null) {
            $scope.startRunning();
            return;
        }
        
        $scope.selectedStage = $scope.STAGE_DECK_SELECTION;
    }

    $scope.selectDeck = function (deck) {
        new Audio('../Media/blop.mp3').play();
        $scope.selectedDeck = deck;
        $scope.startRunning();
    }
    
    $scope.startRunning = function () {
        var currentAlbumId = 0;
        var currentDeckId = 0;

        //Uma das tips pode ser album e deck?
        $scope.sortedWords = new Array($scope.WORDS_COUNT);

        for (var i = 0; i < $scope.sortedWords.length; i++) {
            if ($scope.selectedAlbum == null)
                currentAlbumId = Math.floor(Math.random() * $scope.albums.length)
            else
                currentAlbumId = $scope.selectedAlbum.id;

            if ($scope.selectedDeck == null)
                currentDeckId = Math.floor(Math.random() * $scope.albums[currentAlbumId].decks.length)
            else
                currentDeckId = $scope.selectedDeck.id;
            
            var currentDeckWords = $scope.albums[currentAlbumId].decks[currentDeckId].words.filter(function (word) {
                return word.show == null || word.show[$rootScope.langLearn.id] == true;
            });
            
            var randomIndex = Math.floor(Math.random() * currentDeckWords.length);
            var word = currentDeckWords[randomIndex];

            //Only validate duplicated if the deck is bigger enough
            if (currentDeckWords.length >= $scope.WORDS_COUNT) {
                //console.log('### Validating the word: ' + word[$rootScope.langFrom.id]);
                var repeatedWordFound = false;

                for (var j = 0; j < i; j++) {
                    //console.log($scope.sortedWords[j].langLearn + " - " + word[$rootScope.langLearn.id]);
                    if ($scope.sortedWords[j].langLearn === word.lang[$rootScope.langLearn.id])
                    {
                        //console.log('@@@ já existe, tentando novamente');
                        repeatedWordFound = true;
                        break;
                    }
                }

                if (repeatedWordFound) {
                    i--;
                    continue;
                }
            }
            
            var obs = "";
            if (word.obs != null && word.obs[$rootScope.langLearn.id] != null)
                obs = "(" + word.obs[$rootScope.langLearn.id] + ")";
            
            $scope.sortedWords[i] = {
                album: $scope.albums[currentAlbumId].name,
                deck: $scope.albums[currentAlbumId].decks[currentDeckId].name,
                langFrom: word.lang[$rootScope.langFrom.id],
                langLearn: word.lang[$rootScope.langLearn.id],
                obs: obs
            };
        }

        $scope.clearError();
        $scope.answered = false;
        $scope.correct = 0;
        $scope.wrong = 0;
        $scope.response = "";
        $scope.currentlangLearn = $rootScope.langLearn;
        $scope.currentSortedWordIndex = 0;
        $scope.selectedStage = $scope.STAGE_RUNNING;
        AnimationService.focusByName('response');
    }

    $scope.nextWord = function (e) {
        $scope.clearError();
        if (!$scope.answered)
            return;
        
        if ($scope.currentSortedWordIndex >= 9)
        {
            $scope.showResult();
            $scope.selectedStage = $scope.STAGE_RESULTS;
            return;
        }

        $scope.answered = false;
        $scope.currentSortedWordIndex++;
        $scope.response = "";
        AnimationService.focusByName('response');

        if (e && e.stopPropagation)
            e.stopPropagation();
    }

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $scope.currentlangLearn.id);
    }

    $scope.answer = function (ignoreEmpty) {
        $scope.clearError();

        if ($scope.response.length === 0 && ignoreEmpty != true) {
            AnimationService.focusByName('response');
            $scope.errorMessage = "Write your response or Skip";
            return;
        }

        var response = $scope.response.toUpperCase().trim();
        var sortedWord = $scope.sortedWords[$scope.currentSortedWordIndex].langLearn.toUpperCase().trim();

        if (response.normalize) { //ES6
            response = response.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            sortedWord = sortedWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        }

        if (sortedWord === response) {
            new Audio('../Media/sms5.mp3').play();
            $scope.correct++;
            $scope.showSuccess = true;
            AnimationService.animate('score-right', 'sheen');
        }
        else {
            new Audio('../Media/error.mp3').play();
            $scope.wrong++;
            $scope.errorMessage = "The right answer was \"" + $scope.sortedWords[$scope.currentSortedWordIndex].langLearn + "\". ";
            AnimationService.animate('score-wrong', 'sheen');
        }

        $scope.lastWord = $scope.response;
        $scope.Speak($scope.sortedWords[$scope.currentSortedWordIndex].langLearn);

        $scope.answered = true;
        AnimationService.focusByName('continue');
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

    $scope.showResult = function () {
        $scope.stars = new Array();

        var audio = new Audio('../Media/coin1.mp3');

        var addStar = function () {
            var star = new Object();
            star.class = "fa-star";
            $scope.stars.push(star);
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        };
                
        for (var i = 0; i < $scope.correct - 5; i++)
            $timeout(addStar, i * 650);

        AnimationService.focusByName('continue');
    };

    if ($routeParams.album && $routeParams.deck) {
        $scope.selectedAlbum = $scope.albums[$routeParams.album];
        $scope.selectedDeck = $scope.albums[$routeParams.album].decks[$routeParams.deck];
        $scope.startRunning();
    }

    //$scope.wrong = 0;
    //$scope.correct = 10;
    //$scope.selectedStage = $scope.STAGE_RESULTS;
    //$scope.showResult();

});
