app.controller('pageMenuCtrl', function () {
    //$scope.menuGroups = [
    //    { name: 'General' }
    //];
});


app.component('pageMenu', {
    bindings: {
    },
    scope:true,
    templateUrl: 'PageMenu/pageMenu.html',
    controller: 'pageMenuCtrl'
});