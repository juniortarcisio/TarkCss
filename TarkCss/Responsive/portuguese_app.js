//This app is a very kiss prototype, I am gonna refactor it if I decide it's a good and viable project
var app = angular.module('myApp', ["ngRoute"]);

var basicList = [
        { Portuguese: "Andar", English: "To Walk" },
        { Portuguese: "Comer", English: "To Eat" },
        { Portuguese: "Beber", English: "To Drink" },
        { Portuguese: "Comprar", English: "To Buy" },
        { Portuguese: "Nadar", English: "To Swim" },
        { Portuguese: "Cantar", English: "To Sing" },
        { Portuguese: "Falar", English: "To Speak" },
        { Portuguese: "Entender", English: "To Understand" },
        { Portuguese: "Trabalhar", English: "To Work" },
        { Portuguese: "Estudar", English: "To Study" },
        { Portuguese: "Aprender", English: "To Learn" },
        { Portuguese: "Jogar", English: "To Play" }
];

app.directive('startfocus', function ($timeout) {
    return {
        restrict: 'AC',
        link: function (_scope, _element) {
            $timeout(function () {
                for (var i = 0; i < _element.length; i++) {
                    _element[i].focus();
                }
            }, 300);
        }
    };
});

app.filter('RemoveLastChar', function () {
    return function (x, q) {
        if (typeof q == "undefined")
            q = 1;
        return x.substr(0, x.length - q);
    };
});

app.controller('regularVerbsCtrl', function ($scope, $http) {

});

app.controller('simplePresentCtrl', function ($scope, $rootScope, SpeechService) {
    $scope.verbs = basicList;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.loadProcessedVerbs = function (verb) {
        var gp_tp = new GrammarProcessorPT();
        $scope.selectedVerb = verb;
        $scope.engineVerbs = gp_tp.getSimplePresent(verb.Portuguese);
    };

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };

    $scope.loadProcessedVerbs($scope.verbs[0]);
});

app.controller('presentContinuousCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Present Continuous";
    $scope.verbs = basicList;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});

app.controller('simplePastCtrl', function ($scope, $rootScope) {
    $scope.verbs = [
        { Portuguese: "Andar", English: "To Walk" },
        { Portuguese: "Comprar", English: "To Buy" },
        { Portuguese: "Nadar", English: "To Swim" },
        { Portuguese: "Cantar", English: "To Sing" },
        { Portuguese: "Falar", English: "To Speak" },
        { Portuguese: "Trabalhar", English: "To Work" },
        { Portuguese: "Estudar", English: "To Study" },
        { Portuguese: "Jogar", English: "To Play" }
    ];

    $scope.selectedVerb = $scope.verbs[0];

    $scope.verbsE = [
        { Portuguese: "Comer", English: "To Eat" },
        { Portuguese: "Beber", English: "To Drink" },
        { Portuguese: "Entender", English: "To Understand" },
        { Portuguese: "Aprender", English: "To Learn" }
    ];

    $scope.selectedVerbE = $scope.verbsE[0];


    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});


app.controller('pastContinuousCtrl', function ($scope, $rootScope) {
    $scope.verbs = basicList;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});

app.controller('simpleFutureCtrl', function ($scope, $rootScope) {
    $scope.verbs = basicList;

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});


app.controller('tenseComparisonCtrl', function ($scope, $rootScope) {
    $rootScope.title = "Tenses Comparison";
    $scope.verbs = [
        { Portuguese: "Andar", English: "To Walk" },
        { Portuguese: "Comprar", English: "To Buy" },
        { Portuguese: "Nadar", English: "To Swim" },
        { Portuguese: "Cantar", English: "To Sing" },
        { Portuguese: "Falar", English: "To Speak" },
        { Portuguese: "Trabalhar", English: "To Work" },
        { Portuguese: "Estudar", English: "To Study" },
        { Portuguese: "Jogar", English: "To Play" }
    ];

    $scope.selectedVerb = $scope.verbs[0];

    $scope.format = function (verb) {
        return verb.English + ' -> ' + verb.Portuguese;
    };
});

function shuffle(array) {
    /* source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


app.controller('exercisesCtrl', function ($scope, $rootScope, SpeechService) {
    $scope.questions = [
        {
            parts: [
                { type: "text", value: "Frango frito" },
                { type: "answer", correctAnswer: "é", options: ["ser", "era", "é", "com"] },
                { type: "text", value: "uma delícia" }
            ]
        },
        {
            parts: [
                { type: "text", value: "A Fitria" },
                { type: "answer", correctAnswer: "canta", options: ["cantou", "cantar", "canta", "catalonia"] },
                { type: "text", value: "muito bem" }
            ]
        },
        {
            parts: [
                { type: "text", value: "Eu" },
                { type: "answer", correctAnswer: "entendo", options: ["entender", "entendo", "entendi", "entendemos"] },
                { type: "text", value: "um pouco de português e também" },
                { type: "answer", correctAnswer: "falo", options: ["falei", "falar", "fala", "falo"] },
                { type: "text", value: "apenas um pouco" }
            ]
        },
        {
            parts: [
                { type: "text", value: "Ele" },
                { type: "answer", correctAnswer: "joga", options: ["joga", "jogar", "jogava", "jogamos"] },
                { type: "text", value: "futebol muito bem, mas" },
                { type: "answer", correctAnswer: "trabalha", options: ["trabalha", "trabalhar", "trabalhava", "trabalhou"] },
                { type: "text", value: "pouco" }
            ]
        },
        {
            parts: [
                { type: "text", value: "Nós" },
                { type: "answer", correctAnswer: "comemos", options: ["comemos", "comer", "comiamos", "comeremos"] },
                { type: "text", value: "muitos panetones no natal. Panetone" },
                { type: "answer", correctAnswer: "é", options: ["é", "era", "ser", "seria"] },
                { type: "text", value: "muito caro" }
            ]
        },
        {
            parts: [
                { type: "text", value: "Vocês" },
                { type: "answer", correctAnswer: "trabalham", options: ["trabalhar", "trabalho", "trabalham", "trabalhou"] },
                { type: "text", value: "muito todos os dias, e" },
                { type: "answer", correctAnswer: "bebem", options: ["bebem", "beber", "bebo", "beberam"] },
                { type: "text", value: "muita água também" }
            ]
        },
        {
            parts: [
                { type: "text", value: "Você" },
                { type: "answer", correctAnswer: "estuda", options: ["estuda", "estudar", "estudo", "estudaram"] },
                { type: "text", value: "bastante nesta escola, esta escola" },
                { type: "answer", correctAnswer: "é", options: ["é", "era", "seria", "será"] },
                { type: "text", value: "a melhor escola de todas" }
            ]
        },
        {
            parts: [
                { type: "text", value: "Este cachorro" },
                { type: "answer", correctAnswer: "nada", options: ["nada", "nadava", "nadar", "nadara"] },
                { type: "text", value: "uma longa distância todos os dias, ele" },
                { type: "answer", correctAnswer: "anda", options: ["anda", "andava", "andara", "andas"] },
                { type: "text", value: "bastante também" }
            ]
        },
        {
            parts: [
                { type: "text", value: "Eu" },
                { type: "answer", correctAnswer: "gosto", options: ["gosto", "gosta", "gostava", "gostaria"] },
                { type: "text", value: "de trabalhar, mas eu não" },
                { type: "answer", correctAnswer: "gosto", options: ["gosto", "gosta", "gostava", "gostaria"] },
                { type: "text", value: "muito de estudar" }
            ]
        },
        {
            parts: [
                { type: "text", value: "Esta casa" },
                { type: "answer", correctAnswer: "é", options: ["é", "era", "seria", "sera"] },
                { type: "text", value: "muito cara, mas" },
                { type: "answer", correctAnswer: "parece", options: ["parece", "parecia", "pareceria", "parecer"] },
                { type: "text", value: "muito segura" }
            ]
        }
    ];

    $scope.rightAnswer = function(question) {
        for (var i = 0; i < question.parts.length; i++) {
            var part = question.parts[i];
            if (part.type == "answer" && part.answer != part.correctAnswer) {
                if (part.answer == null || part.answer == "")
                    return null;
                else
                    return false;
            }
        }
        return true;
    };

    for (var i = 0; i < $scope.questions.length; i++) {
        for (var j = 0; j < $scope.questions[i].parts.length; j++) {
            if ($scope.questions[i].parts[j].type == "answer") {
                $scope.questions[i].parts[j].options = shuffle($scope.questions[i].parts[j].options);
            }
        }
    }

    $scope.questions = shuffle($scope.questions);

    $scope.SpeakQuestion = function (question) {
        var text = new String();
        for (var i = 0; i < question.parts.length; i++) {
            if (question.parts[i].type == "text") {
                text += question.parts[i].value;
            } else if (question.parts[i].type == "answer") {
                text += question.parts[i].answer;
            }
        }
        SpeechService.Speak(text, 'pt-br');
    };

    $scope.Speak = function (text) {
        SpeechService.Speak(msg, 'pt-br');
    };

    $scope.IsGoogleChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    
});

app.controller('toBeCtrl', function ($scope, $rootScope) {
});

app.controller('settingsCtrl', function ($scope, $rootScope) {
});

app.controller('aboutCtrl', function ($scope, $rootScope, SpeechService) {
    $rootScope.mainClass = "bgmv";
    $scope.easterEggExecuted = false;
    $scope.easterEgg = function () {
        if ($scope.easterEggExecuted == true)
            return;
        SpeechService.Speak('They are pretty cute ham?');
        $scope.easterEggExecuted = true;
    }
});

app.controller('homeCtrl', function ($scope, $rootScope) {
});

app.controller('constructionCtrl', function ($scope, $rootScope) {
    $rootScope.mainClass = "bgmtx";
});

app.filter('highlight', ['$sce', function ($sce) {
    return function (json) {
        if (typeof (json) == "undefined") return undefined;
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

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "portuguese_home.html", controller: "homeCtrl"
    })
    .when("/General", {
        templateUrl: "construction.html", controller: "aboutCtrl"
    })
    .when("/General/About", {
        templateUrl: "portuguese_about.html", controller: "aboutCtrl"
    })
    .when("/General/Home", {
        templateUrl: "portuguese_home.html", controller: "homeCtrl"
    })
    .when("/Account", {
        templateUrl: "construction.html", controller: "aboutCtrl"
    })
    .when("/Account/SignUp", {
        templateUrl: "SignUp/sign_up.html", controller: "signUpCtrl"
    })
    .when("/Account/SignIn", {
        templateUrl: "SignIn/sign_in.html", controller: "signInCtrl"
    })
    .when("/Account/SignOut", {
        templateUrl: "SignOut/sign_out.html", controller: "signOutCtrl"
    })
    .when("/Lessons", {
        templateUrl: "construction.html", controller: "toBeCtrl"
    })
    .when("/Lessons/ToBeVerb", {
        templateUrl: "portuguese_tobe.html", controller: "toBeCtrl"
    })
    .when("/Lessons/SimplePresent", {
        templateUrl: "portuguese_present.html", controller: "simplePresentCtrl"
    })
    .when("/Lessons/PresentContinuous", {
        templateUrl: "portuguese_presentContinuous.html", controller: "presentContinuousCtrl"
    })    
    .when("/Lessons/SimplePast", {
        templateUrl: "portuguese_past.html", controller: "simplePastCtrl"
    })
    .when("/Lessons/PastContinuous", {
        templateUrl: "portuguese_pastContinuous.html", controller: "pastContinuousCtrl"
    })
    .when("/Lessons/SimpleFuture", {
        templateUrl: "portuguese_future.html", controller: "simpleFutureCtrl"
    })
    .when("/Lessons/TensesComparison", {
        templateUrl: "portuguese_tenseComparison.html", controller: "tenseComparisonCtrl"
    })
    .when("/Lessons/Vocabulary", {
        templateUrl: "Vocabulary/vocabulary.html", controller: "vocabularyCtrl"
    })
    .when("/Exercises/Flashcards", {
        templateUrl: "Flashcards/flashcards.html", controller: "flashcardsCtrl"
    })
    .when("/PrototypeExercises", {
        templateUrl: "portuguese_exercises.html", controller: "exercisesCtrl"
    })
    .when("/Construction", {
        templateUrl: "construction.html", controller: "constructionCtrl"
    })
    .when("/Tests", {
        templateUrl: "Tests/tests.html", controller: "testsCtrl"
    })
    .otherwise({
        templateUrl: "notfound.html", controller: "homeCtrl"
    });
});



app.run(function ($window, $rootScope, $location, ServerService, AuthenticationService, SpeechService, AnimationService, VocabularyService) {

    ServerService.GetLastServer();
    AuthenticationService.TryLoadStorageSession();

    if (localStorage.mute)
        $rootScope.mute = localStorage;
    else
        $rootScope.mute = false;

    $rootScope.languages = VocabularyService.getLanguages();
    $rootScope.langFrom = $rootScope.languages[0];
    $rootScope.langLearn = $rootScope.languages[1];
    
    SpeechService.Speak('Welcome to INGES');

    //if ($rootScope.account != null && $rootScope.account.authenticated)
    //    SpeechService.Speak('Nice to see you again' + $rootScope.account.email + ', you have no new messages.');
    
    $rootScope.$on('$viewContentLoaded', function () {
        $window.document.getElementsByTagName('main')[0].scrollTo(0, 0);
        AnimationService.loadEffectWaves();
    });

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
    });

    //TODO: move to BreadcrumbService or view/component
    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        $rootScope.mainClass = "";
        if ($window.gtag) {
            var page = $location.path().replace('#', '');
            gtag('config', 'UA-115424551-1', { 'page_path': page });
        }
        //ServerSide pushstate... (history) can't work well on github hosting
        $rootScope.sidenavOpen = false;
        $rootScope.showMobUser = false;
        $rootScope.showMobServer = false;

        var routes = $location.path().split('/').filter(function (v) { return v !== '' });
        var breadcrumbs = [];

        //routes.unshift('Portuguese');

        for (var i = 0; i <= routes.length - 1; i++) {
            var route_i = new Object();
            route_i.name = routes[i].replace(/([A-Z])/g, ' $1').trim();
            route_i.link = '';

            for (var j = i; j >= 0; j--)                
                route_i.link = routes[j] + '/' + route_i.link;

            route_i.link = '#!' + route_i.link;

            breadcrumbs.push(route_i);
        }
                
        $rootScope.breadcrumbs = breadcrumbs;
        $rootScope.currentRoute = breadcrumbs[breadcrumbs.length - 1];

        if (current != null) {
            SpeechService.Speak($rootScope.currentRoute.name);
        }
    });

    $rootScope.toggleShowMobUser = function () {
        $rootScope.showMobUser = !$rootScope.showMobUser;
    };

    $rootScope.toggleShowMobServer = function () {
        $rootScope.showMobServer = !$rootScope.showMobServer;
    };

    $rootScope.toggleSivenav = function () {
        $rootScope.sidenavOpen = !$rootScope.sidenavOpen;
    };

    $rootScope.home = function () {
        $location.path("/General/Home");
    }

    $rootScope.Speak = function (text, langId) {
        console.log(langId);
        SpeechService.Speak(text, langId);
    };

    $rootScope.toggleMute = function () {
        if ($rootScope.mute == null || $rootScope.mute == false) {
            $rootScope.mute = true;
            SpeechService.Stop();
        }
        else 
            $rootScope.mute = false;

        localStorage.mute = $rootScope.mute;
    }

});

