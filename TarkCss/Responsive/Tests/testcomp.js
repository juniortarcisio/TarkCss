app.controller('testcompCtrl', function () {

});


app.component('testcomp', {
    bindings: {
        value: '='
    },
    scope: true,
    templateUrl: 'Tests/testcomp.html',
    controller: 'testcompCtrl'
});