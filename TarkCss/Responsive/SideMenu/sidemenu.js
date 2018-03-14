app.controller('sideMenuCtrl', function ($scope, $rootScope) {
    alert($rootScope.currentRoute);
});


app.component('sidemenu', {
    bindings: {
        //value: '=',
        //disabled: '='
    },
    templateUrl: 'SideMenu/sidemenu.html',
    controller: 'sideMenuCtrl'
});