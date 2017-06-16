var app = angular.module('myApp', ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
    .when("/Result", {
        templateUrl: "2result.html", controller: "resultCtrl"
    })
    .when("/Configuration", {
        templateUrl: "3configuration.html", controller: "configurationCtrl"
    })
    .otherwise({
        templateUrl: "1execution.html", controller: "executionCtrl"
    });
});

app.filter('highlight', ['$sce', function ($sce) {
    return function (json) {
        //by http://jsfiddle.net/KJQ9K/554/
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };
}]);

app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


app.controller('executionCtrl', function ($scope, $rootScope) {
    $rootScope.page = 'Execution';
    if ($rootScope.CamposUser == null)
        $rootScope.CamposUser = [
            { Campo: "Name", Tipo: "text", Required: true, Valor: null },
            { Campo: "Address", Tipo: "text", Required: false, Valor: null },
            { Campo: "AddressNumber", Tipo: "number", Required: false, Valor: null },
            {
                Campo: "UF", Tipo: "select", Required: true, Valor: null, Opcoes: [
                    { Text: "Amazonas", Value: "AM" },
                    { Text: "Roraima", Value: "RO" },
                    { Text: "Paraná", Value: "PR" },
                    { Text: "Mato grosso", Value: "MT" },
                    { Text: "Rio grande do Sul", Value: "RS" },
                    { Text: "Santa Catarina", Value: "SC" },
                    { Text: "Minas Gerais", Value: "MG" },
                    { Text: "São Paulo", Value: "SP", Default: true },
                    { Text: "Rio de Janeiro", Value: "RJ" },
                ]
            },
            { Campo: "AcceptTerms", Tipo: "checkbox", Required: false, Valor: false }
        ];
});

app.controller('resultCtrl', function ($scope, $rootScope) {
    $rootScope.page = 'Result';
    
    

});

app.controller('configurationCtrl', function ($scope, $rootScope) {
    $rootScope.page = 'Configuration';
    $scope.Delete = function (campo) {
        var index = $rootScope.CamposUser.indexOf(campo);
        $rootScope.CamposUser.splice(index, 1);
    }

    $scope.Add = function () {
        var newCampo = {
            Campo: "NewField", Tipo: "text", Required: false
        };
        $rootScope.CamposUser.push(newCampo)
    }

    $scope.ChangeType = function (campo) {
        if (campo.Tipo == 'checkbox') {
            campo.Required = false;
            campo.Valor = false;
        }
    }
});