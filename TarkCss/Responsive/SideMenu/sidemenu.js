app.controller('sideMenuCtrl', function () {
});


app.component('sidemenu', {
    bindings: {
        currentRoute: '=',
        sidenavOpen: '='
    },
    scope:true,
    templateUrl: 'SideMenu/sidemenu.html',
    controller: 'sideMenuCtrl'
});