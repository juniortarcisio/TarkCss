app.controller('sortedWordsCtrl', function ($scope, $rootScope, $location, ServerService, VocabularyService, SpeechService) {
    $scope.languages = VocabularyService.getLanguages();
    $scope.albums = VocabularyService.getWordAlbums();

});
