app.controller('testsCtrl', function ($scope, $rootScope, ServerService) {
    $rootScope.title = "Tests";
    $scope.testxpto = "abc";

    $scope.successCallback = function (response) {
        console.log(response);
        $scope.response = response;
    }

    $scope.errorCallback = function (response) {
        console.log(response);
        $scope.response = response;
    }

    $scope.testRequestOk = function () {
        ServerService.get("Values/1", $scope.successCallback, $scope.errorCallback);
    }

    $scope.testRequestError = function () {
        ServerService.get("Values/2", $scope.successCallback, $scope.errorCallback);
    }
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
});
