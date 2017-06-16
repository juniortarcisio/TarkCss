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
            { Campo: "Number", Tipo: "number", Required: false, Valor: null },
            {
                Campo: "UF", Tipo: "select", Required: true, Valor: null, Opcoes: [
                    { Text: "Acre", Value: "AC" },
                    { Text: "Alagoas", Value: "AL" },
                    { Text: "Amapá", Value: "AP" },
                    { Text: "Amazonas", Value: "AM" },
                    { Text: "Bahia", Value: "BH" },
                    { Text: "Ceará", Value: "CE" },
                    { Text: "Distrito Federal", Value: "DF" },
                    { Text: "Espírito Santos", Value: "ES" },
                    { Text: "Goiás", Value: "GO" },
                    { Text: "Maranhão", Value: "MA" },
                    { Text: "Mato Grosso", Value: "MT" },
                    { Text: "Mato Grosso do Sul", Value: "MS" },
                    { Text: "Minas Gerais", Value: "MG" },
                    { Text: "Pará", Value: "PA" },
                    { Text: "Paraiba", Value: "PB" },
                    { Text: "Paraná", Value: "PR" },
                    { Text: "Pernambuco", Value: "PE" },
                    { Text: "Piauí", Value: "PI" },
                    { Text: "Rio de Janeiro", Value: "RJ" },
                    { Text: "Rio grande do norte", Value: "RN" },
                    { Text: "Rio grande do Sul", Value: "RS" },
                    { Text: "Rondônia", Value: "RO" },
                    { Text: "Roraima", Value: "RO" },
                    { Text: "Santa Catarina", Value: "SC" },
                    { Text: "São Paulo", Value: "SP", Default: true },
                    { Text: "Sergipe", Value: "SE" },
                    { Text: "Tocantins", Value: "TO" }
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

    $scope.add = function () {
        var newCampo = {
            Campo: "NewField", Tipo: "text", Required: false
        };
        $rootScope.CamposUser.push(newCampo)
    }

    $scope.delete = function (campo) {
        var index = $rootScope.CamposUser.indexOf(campo);
        $rootScope.CamposUser.splice(index, 1);
    }

    $scope.moveUp = function (campo) {
        var index = $rootScope.CamposUser.indexOf(campo);
        if (index == 0)
            return;

        var aboveItem = $rootScope.CamposUser[index - 1];
        $rootScope.CamposUser[index - 1] = campo;
        $rootScope.CamposUser[index] = aboveItem;
    }

    $scope.moveDown = function (campo) {
        var index = $rootScope.CamposUser.indexOf(campo);
        if (index == $rootScope.CamposUser.length - 1)
            return;

        var underItem = $rootScope.CamposUser[index + 1];
        $rootScope.CamposUser[index + 1] = campo;
        $rootScope.CamposUser[index] = underItem;
    }

    $scope.index = function (campo) {
        return $rootScope.CamposUser.indexOf(campo);
    }

    $scope.changeType = function (campo) {
        if (campo.Tipo == 'checkbox') {
            campo.Required = false;
            campo.Valor = false;
        }
    }
});