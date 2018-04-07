app.controller('pageMenuCtrl', function ($scope, $rootScope, $timeout, $location) {
    if ($rootScope.currentRoute == null)
        $rootScope.currentRoute = new Object();

    if ($rootScope.currentRoute.name == null) 
        $rootScope.currentRoute.name = 'Home';

    $rootScope.hideMenuHelp = function (playSound) {
        $rootScope.menuHelp = false;

        if (playSound)
            new Audio('../Media/blop.mp3').play();
    }
    $rootScope.showMenuHelp = function (playSound) {
        $rootScope.sidenavOpen = true;
        $rootScope.menuHelp = true;

        if ($rootScope.prmsHiddingMenuHelp)
            $timeout.cancel($rootScope.prmsHiddingMenuHelp);

        $rootScope.prmsHiddingMenuHelp = $timeout($rootScope.hideMenuHelp, 7000);

        if (playSound)
            new Audio('../Media/blop.mp3').play();
    }

    $rootScope.toggleShowMobUser = function () {
        $rootScope.showMobUser = !$rootScope.showMobUser;
    };

    $rootScope.toggleShowMobServer = function () {
        $rootScope.showMobServer = !$rootScope.showMobServer;
    };

    $rootScope.toggleSivenav = function () {
        $rootScope.menuHelp = false;
        $rootScope.sidenavOpen = !$rootScope.sidenavOpen;
    };

    $scope.menuGroups = [
        {
            name: ['General','Geral','Umum'], closed:false, items: [
                { name: ['Home', 'Principal', 'Utama'], href: '#!General/Home', icon: 'fa-home' },
                { name: ['About', 'Sobre', 'Tentang'], href: '#!General/About', icon: 'fa-address-card' }
            ]
        },
        {
            name: ['Beginning', 'Iniciando', 'Awal'], closed: false, items: [
                { name: ['How To Learn', 'Como Aprender', 'Bagaimana belajar'], href: '#!Beginning/HowToLearn', icon: 'fa-book' },
                { name: ['To Be Verb', 'Verbo To be', 'Kata Kerja To Be'], href: '#!Beginning/ToBeVerb', icon: 'fa-book' }
            ]
        },
        {
            name: ['Verbal tenses', 'Tempos Verbais', 'Verbal tenses'], closed: false, items: [
                { name: ['Simple Present', 'Presente simples', 'Bulang-ulang'], href: '#!VerbalTenses/SimplePresent', icon: 'fa-book' },
                { name: ['Present Continuous', 'Presente Contínuo', 'Sedang Terjadi'], href: '#!VerbalTenses/PresentContinuous', icon: 'fa-book' },
                { name: ['Simple Past', 'Passado Simples', 'Lampau'], href: '#!VerbalTenses/SimplePast', icon: 'fa-book' },
                { name: ['Past Continuous', 'Passado Contínuo', 'Sedang terjadi waktu dulu'], href: '#!VerbalTenses/PastContinuous', icon: 'fa-book' },
                { name: ['Simple Future', 'Futuro simples', 'Akan terjadi'], href: '#!VerbalTenses/SimpleFuture', icon: 'fa-book' },
                { name: ['Tenses Comparison', 'Comparação de tempos', 'Perbandingan Tenses'], href: '#!VerbalTenses/TensesComparison', icon: 'fa-book' }
            ]
        },
        {
            name: ['Vocabulary', 'Vocabulário', 'Kosa kata'], closed: false, items: [
                { name: ['Word Albuns', 'Album de Palavras', 'Album kata'], href: '#!Vocabulary/WordAlbuns', icon: 'fa-book' },
                { name: ['Flashcards', 'Flashcards', 'Flashcards'], href: '#!Vocabulary/Flashcards', icon: 'fa-edit' }
            ]
        },
        {
            name: ['Community', 'Comunidade', 'Masyarakat'], closed: false, items: [
                { name: ['Forum', 'Fórum', 'Forum'], href: '#!Construction', icon: 'fa-wpforms' },
                { name: ['Chat', 'Bate-papo', 'Obrolan'], href: '#!Construction', icon: 'fa-comments' },
                { name: ['People', 'Pessoas', 'Orang-orang'], href: '#!Construction', icon: 'fa-users' },
                { name: ['Smart profiles', 'Smart profiles', 'Smart profiles'], href: '#!Construction', icon: 'fa-users' }
            ]
        },
        {
            name: ['Tests/Prototypes', 'Testes e Protótipos', 'Tes'], closed: false, items: [
                { name: ['Test Page', 'Página de testes', 'Halaman tes'], href: '#!Tests', icon: 'fa-wrench' },
                { name: ['Prototype Exercise', 'Exercício Protótipo', 'Latihan Prototype'], href: '#!PrototypeExercises', icon: 'fa-edit' }
            ]
        }
    ];

    $scope.currentMenuGroupIndex = function () {
        for (var i = 0; i < $scope.menuGroups.length; i++) {
            if ($scope.menuGroups[i].name[0].trim().toLowerCase() == $rootScope.currentRoute.name.trim().toLowerCase())
                return i;
        }
        return -1;
    }();

    $scope.navigate = function(url) {
        $location.path(url.replace("#!",""));
    }

});


app.component('pageMenu', {
    bindings: {
    },
    scope:true,
    templateUrl: 'PageMenu/pageMenu.html',
    controller: 'pageMenuCtrl'
});