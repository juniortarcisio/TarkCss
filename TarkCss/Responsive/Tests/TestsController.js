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
    editor.session.setMode("ace/mode/javascript");

    $scope.aceTheme = "ace/theme/monokai";
    $scope.selectTheme = function () {
        editor.setTheme($scope.aceTheme);
    }

    $scope.selectTheme();

    $scope.msglog = [];
    $scope.ws = new WebSocket("ws://localhost:8080/");
    $scope.ws.onopen = function () {
        $scope.msglog.push({
            sender: 'server',
            time: new Date(),
            content: 'connected'
        });
    };

    $scope.sendChat = function () {
        $scope.ws.send($scope.chatText);
    }

    $scope.ws.onmessage = function (evt) {
        var received_msg = evt.data;
        $scope.msglog.push({
            sender : 'unnamed',
            time : new Date(),
            content: received_msg
        });
        $scope.$apply();
        console.log(evt);
    };

    $scope.ws.onclose = function () {
        $scope.msglog.push({
            sender: 'server',
            time: new Date(),
            content: 'disconnected'
        });
    }; 

});
