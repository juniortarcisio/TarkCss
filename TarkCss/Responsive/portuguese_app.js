//This app is a very kiss prototype, I am gonna refactor it if I decide it's a good and viable project
var app = angular.module('myApp', ["ngRoute"]);

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

app.directive('clickAnywhereButHere', function ($document) {
    return {
        link: function postLink(scope, element, attrs) {
            var onClick = function (event) {
                var isChild = element[0].contains(event.target);
                var isSelf = element[0] == event.target;
                var isInside = isChild || isSelf;
                if (!isInside) {
                    scope.$apply(attrs.clickAnywhereButHere)
                }
            }
            scope.$watch(attrs.isActive, function (newValue, oldValue) {
                if (newValue !== oldValue && newValue == true) {
                    $document.bind('click', onClick);
                }
                else if (newValue !== oldValue && newValue == false) {
                    $document.unbind('click', onClick);
                }
            });
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

app.controller('tenseComparisonCtrl', function ($scope, $rootScope) {
    $scope.verbs = [
        ["To Walk", "Andar", "Berjalan"],
        ["To Eat", "Comer", "Makan"],
        ["To Drink", "Beber", "Minum"],
        ["To Buy", "Comprar", "Membeli"],
        ["To Swim", "Nadar", "Berenang"],
        ["To Sing", "Cantar", "Bernyanyi"],
        ["To Speak", "Falar", "Berbicara"],
        ["To Understand", "Entender", "Mergenti"],
        ["To Work", "Trabalhar", "Bekerja"],
        ["To Study", "Estudar", "Belajar"],
        ["To Learn", "Aprender", "Belajar"],
        ["To Play", "Jogar", "Bermain"],
        ["To Ask", "Pedir", "Minta"]
    ];
    
    $scope.pronouns = new Array();
    for (var i = 0; i < _baseModelLanguages.length; i++) {
        $scope.pronouns[i] = new Object();
        $scope.pronouns[i].id = i;
        $scope.pronouns[i].name = _baseModelLanguages[i];
        $scope.pronouns[i].tags = _baseTags[i];
    }

    $scope.negative = false;
    $scope.interrogative = false;
    $scope.selectedVerb = $scope.verbs[0];
    $scope.selectedPronoun = $scope.pronouns[0];

    $scope.loadProcessedVerbs = function (verb, speak, effect) {

        if (effect) {
            var audio = new Audio('../Media/blop.mp3');
            audio.play();
        }

        var gp_tp = new GrammarProcessor();
        $scope.selectedVerb = verb;
        $scope.engineVerbs = gp_tp.getAllVerbalTensesByPronoun($rootScope.langFrom.id, $rootScope.langLearn.id, verb[$rootScope.langLearn.id], $scope.negative, $scope.interrogative, $scope.selectedPronoun.id);

        if (speak) {
            $rootScope.Speak(verb[$rootScope.langFrom.id], $rootScope.langFrom.id);
            $rootScope.Speak(verb[$rootScope.langLearn.id], $rootScope.langLearn.id);
        }
    };

    $scope.formatPronoun = function (pronoun) {
        var tagsDescription = "";
        for (var i = 0; i < pronoun.tags.length; i++) {
            if (i > 0)
                tagsDescription += ", ";

            tagsDescription += pronoun.tags[i];
        }

        return pronoun.name[$rootScope.langFrom.id] + ' -> ' + pronoun.name[$rootScope.langLearn.id] + ' [' + tagsDescription + ']';
    }

    $scope.reload = function () {
        $scope.loadProcessedVerbs($scope.selectedVerb, false);        
    }

    $scope.$watch('$root.langFrom', $scope.reload);
    $scope.$watch('$root.langLearn', $scope.reload);

    $scope.loadProcessedVerbs($scope.verbs[0], false);
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


app.controller('aboutCtrl', function ($scope, $rootScope, SpeechService) {
    $rootScope.mainClass = "bgmv";
    $scope.easterEggExecuted = false;
    $scope.easterEgg = function () {
        if ($scope.easterEggExecuted == true)
            return;
        SpeechService.Speak('They are pretty cute ham?');
        $scope.easterEggExecuted = true;
    }
    var audiost = document.getElementById('audiost');
    audiost.volume = 0.3;
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
        templateUrl: "portuguese_home.html"
    })
    .when("/General", {
        templateUrl: "PageMenu/pageMenuGroup.html", controller: "pageMenuCtrl"
    })
    .when("/General/About", {
        templateUrl: "portuguese_about.html", controller: "aboutCtrl"
    })
    .when("/General/Home", {
        templateUrl: "portuguese_home.html"
    })
    .when("/Account", {
        templateUrl: "PageMenu/pageMenuGroup.html", controller: "pageMenuCtrl"
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
    .when("/Beginning", {
        templateUrl: "PageMenu/pageMenuGroup.html", controller: "pageMenuCtrl"
    })
    .when("/Beginning/HowToLearn", {
        templateUrl: "howto.html"
    })
    .when("/Beginning/ToBeVerb", {
        templateUrl: "portuguese_tobe.html"
    })
    .when("/VerbalTenses", {
        templateUrl: "PageMenu/pageMenuGroup.html", controller: "pageMenuCtrl"
    })
    .when("/VerbalTenses/SimplePresent", {
        templateUrl: "portuguese_present.html"
    })
    .when("/VerbalTenses/PresentContinuous", {
        templateUrl: "portuguese_presentContinuous.html"
    })    
    .when("/VerbalTenses/SimplePast", {
        templateUrl: "portuguese_past.html"
    })
    .when("/VerbalTenses/PastContinuous", {
        templateUrl: "portuguese_pastContinuous.html"
    })
    .when("/VerbalTenses/SimpleFuture", {
        templateUrl: "portuguese_future.html"
    })
    .when("/VerbalTenses/TensesComparison", {
        templateUrl: "portuguese_tenseComparison.html", controller: "tenseComparisonCtrl"
    })
    .when("/Vocabulary", {
        templateUrl: "PageMenu/pageMenuGroup.html", controller: "pageMenuCtrl"
    })
    .when("/Vocabulary/WordAlbums", {
        templateUrl: "Vocabulary/vocabulary.html", controller: "vocabularyCtrl"
    })
    .when("/Vocabulary/Flashcards", {
        templateUrl: "Flashcards/flashcards.html", controller: "flashcardsCtrl"
    })
    .when("/Vocabulary/Flashcards/:album/:deck", {
        templateUrl: "Flashcards/flashcards.html", controller: "flashcardsCtrl"
    })
    .when("/PrototypeExercises", {
        templateUrl: "portuguese_exercises.html", controller: "exercisesCtrl"
    })
    .when("/Construction", {
        templateUrl: "construction.html"
    })
    .when("/Tests", {
        templateUrl: "Tests/tests.html", controller: "testsCtrl"
    })
    .otherwise({
        templateUrl: "notfound.html"
    });
});

app.run(function ($window, $rootScope, $location, ServerService, AuthenticationService, SpeechService, AnimationService, VocabularyService) {
    console.log('$location.path()');
    console.log($location.path());
    if ($location.path() == '' || $location.path().indexOf('Home') > 0) {
        var audio = new Audio('../Media/start.mp3');
        audio.volume = 0.3;
        audio.play();
    }

    ServerService.GetLastServer();
    AuthenticationService.TryLoadStorageSession();

    if (typeof localStorage.mute != "undefined")
        $rootScope.mute = localStorage.mute == "true";
    else
        $rootScope.mute = false;

    $rootScope.languages = VocabularyService.getLanguages();

    if (typeof localStorage.langFrom != "undefined")
        $rootScope.langFrom = $rootScope.languages[localStorage.langFrom];
    else
        $rootScope.langFrom = $rootScope.languages[0];

    if (typeof localStorage.langLearn != "undefined")
        $rootScope.langLearn = $rootScope.languages[localStorage.langLearn];
    else
        $rootScope.langLearn = $rootScope.languages[1];
        

    SpeechService.Speak('Welcome to Where In The Planet');

    //if ($rootScope.account != null && $rootScope.account.authenticated)
    //    SpeechService.Speak('Nice to see you again' + $rootScope.account.email + ', you have no new messages.');
    
    $rootScope.$on('$viewContentLoaded', function () {        
        if ($location.hash())
            $anchorScroll();
        else
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

        if ($rootScope.currentRoute != null && current != null) {
            SpeechService.Speak($rootScope.currentRoute.name);
        }
    });

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

