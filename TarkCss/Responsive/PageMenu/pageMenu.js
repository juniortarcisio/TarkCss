app.controller('pageMenuCtrl', function ($scope, $rootScope) {
    if ($rootScope.currentRoute == null)
        $rootScope.currentRoute = new Object();

    if ($rootScope.currentRoute.name == null) 
        $rootScope.currentRoute.name = 'Home';

    $scope.menuGroups = [
        {
            name: ['General','Geral','Umum'], closed:false, items: [
                { name: ['Home', 'Principal', 'Utama'], href: '#!General/Home', icon: 'fa-home' },
                { name: ['About', 'Sobre', 'Tentang'], href: '#!General/About', icon: 'fa-address-card' }
            ]
        },
        {
            name: ['Grammar', 'Gramática', 'Tatabahasa'], closed: false, items: [
                { name: ['To Be Verb', 'Verbo To be', 'Kata Kerja To Be'], href: '#!Lessons/ToBeVerb', icon: 'fa-book' },
                { name: ['Simple Present', 'Presente simples', 'Bulang-ulang'], href: '#!Lessons/SimplePresent', icon: 'fa-book' },
                { name: ['Present Continuous', 'Presente Contínuo', 'Sedang Terjadi'], href: '#!Lessons/PresentContinuous', icon: 'fa-book' },
                { name: ['Simple Past', 'Passado Simples', 'Lampau'], href: '#!Lessons/SimplePast', icon: 'fa-book' },
                { name: ['Past Continuous', 'Passado Contínuo', 'Sedang berjadi wkt dulu'], href: '#!Lessons/PastContinuous', icon: 'fa-book' },
                { name: ['Simple Future', 'Futuro simples', 'Akan berjadi'], href: '#!Lessons/SimpleFuture', icon: 'fa-book' },
                { name: ['Tenses Comparison', 'Comparação de tempos', 'Perbandingan Tenses'], href: '#!Lessons/TensesComparison', icon: 'fa-book' },
                { name: ['Prototype Exercise', 'Exercício Protótipos', 'Latihan Prototype'], href: '#!PrototypeExercises', icon: 'fa-edit' }
            ]
        },
        {
            name: ['Vocabulary', 'Vocabulário', 'Kosa kata'], closed: false, items: [
                { name: ['Vocabulary', 'Vocabulário', 'Kosa kata'], href: '#!Lessons/Vocabulary', icon: 'fa-book' },
                { name: ['Flashcards', 'Flashcards', 'Flashcards'], href: '#!Exercises/Flashcards', icon: 'fa-edit' }
            ]
        },
        {
            name: ['Community', 'Comunidade', 'Masyarakat'], closed: false, items: [
                { name: ['Forum', 'Fórum', 'Forum'], href: '#!Construction', icon: 'fa-wpforms' },
                { name: ['Chat', 'Bate-papo', 'Obrolan'], href: '#!Construction', icon: 'fa-comments' },
                { name: ['People', 'Pessoas', 'Orang-orang'], href: '#!Construction', icon: 'fa-users' }
            ]
        }
    ];
});


app.component('pageMenu', {
    bindings: {
    },
    scope:true,
    templateUrl: 'PageMenu/pageMenu.html',
    controller: 'pageMenuCtrl'
});