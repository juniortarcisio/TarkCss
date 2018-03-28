var SUBJECT_1P = 0;
var SUBJECT_2P = 1;
var SUBJECT_MALE = 2;
var SUBJECT_FEMALE = 3;
var SUBJECT_NEAR = 4;
var SUBJECT_FAR = 5;
var SUBJECT_2P_PLURAL = 6;
var SUBJECT_MALE_PLURAL = 7;
var SUBJECT_FEMALE_PLURAL = 8;
var SUBJECT_NEAR_PLURAL = 9;
var SUBJECT_FAR_PLURAL = 10;
var SUBJECT_1P_PLURAL = 11;

var _baseModelLanguages = new Array();
_baseModelLanguages[SUBJECT_1P] = ["I", "Eu", "Saya"];
_baseModelLanguages[SUBJECT_2P]=["You", "Você", "Kamu"];
_baseModelLanguages[SUBJECT_MALE] = ["He", "Ele", "Dia"];
_baseModelLanguages[SUBJECT_FEMALE]=["She", "Ela", "Dia"];
_baseModelLanguages[SUBJECT_NEAR] = ["This", "Isto", "Ini"];
_baseModelLanguages[SUBJECT_FAR] = ["That", "Aquilo", "Itu"];
_baseModelLanguages[SUBJECT_2P_PLURAL] = ["You", "Vocês", "Kamu"];
_baseModelLanguages[SUBJECT_MALE_PLURAL] = ["They", "Eles", "Mereka"];
_baseModelLanguages[SUBJECT_FEMALE_PLURAL]=["They", "Elas", "Mereka"];
_baseModelLanguages[SUBJECT_NEAR_PLURAL] = ["These", "Estes", "Ini"];
_baseModelLanguages[SUBJECT_FAR_PLURAL] = ["Those", "Aqueles", "Itu"];
_baseModelLanguages[SUBJECT_1P_PLURAL] = ["We", "Nós", "Kami"];

var _baseNotWord = ['don\'t', 'não', 'tidak'];

var _baseTags = new Array();
_baseTags[SUBJECT_1P] = ["myself"];
_baseTags[SUBJECT_2P] = ["singular"];
_baseTags[SUBJECT_MALE] = ["singular", "male"];
_baseTags[SUBJECT_FEMALE] = ["singular", "female"];
_baseTags[SUBJECT_NEAR] = ["singular", "near"];
_baseTags[SUBJECT_FAR] = ["singular", "far"];
_baseTags[SUBJECT_2P_PLURAL] = ["plural"];
_baseTags[SUBJECT_MALE_PLURAL] = ["plural", "male"];
_baseTags[SUBJECT_FEMALE_PLURAL] = ["plural", "female"];
_baseTags[SUBJECT_NEAR_PLURAL] = ["plural", "near"];
_baseTags[SUBJECT_FAR_PLURAL] = ["plural", "far"];
_baseTags[SUBJECT_1P_PLURAL] = ["ourselves"];

//TODO: conditions for each language, eg: maybe some types of model grammar aren't interesting for some languages?
var ProcessedVerb = function (prefix, sufix, aux) {
    if (sufix == null)
        sufix = '';
    return {
        verb: prefix + sufix,
        prefix: prefix,
        sufix: sufix,
        aux: aux
    }
}

/*TODO: Irregular verbs exception*/
var GrammarProcessor = function () {

    function isVowel(c) {
        console.log('isVowel');
        console.log(c);
        return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
    }

    var processors = [
        {
            processSimplePresent: function (verb, model, modelIndex, negative, interrogative) {
                var sufix = null;
                verb = verb.replace('To ', '');

                var _3rdPersonSingular = model.tags.indexOf('singular') >= 0 && modelIndex > 1;

                if (_3rdPersonSingular && !negative && !interrogative) {
                    var verbToTest = verb.toLowerCase();

                    if (/(o$)|(s$)|(sh$)|(ch$)|(x$)|(z$)/.test(verbToTest))
                        sufix = 'es';
                    else if (/y$/.test(verbToTest) && !isVowel(verbToTest.substring(verb.length - 2, verb.length - 1))) {
                        verb = verb.substring(0, verb.length - 1);
                        sufix = 'ies';
                    }
                    else if (verb == 'have')
                        verb = 'has';
                    else
                        sufix = 's';
                }

                
                if (negative && !interrogative)
                    model.subjectTo += ' ' + (_3rdPersonSingular ? 'doesn\'t' : 'don\'t');

                else if (interrogative) {
                    if (modelIndex > 0)
                        model.subjectTo = model.subjectTo.toLowerCase();

                    if (!negative)
                        model.subjectTo = (_3rdPersonSingular ? 'Does' : 'Do') + ' ' + model.subjectTo;
                    else 
                        model.subjectTo = (_3rdPersonSingular ? 'Doesn\'t' : 'Don\'t') + ' ' + model.subjectTo;
                }

                return ProcessedVerb(verb, sufix, null);
            },
            processPresentContinuous: function (verb, model, modelIndex, negative, interrogative) {

                if (modelIndex == 0) {
                    if (!interrogative && !negative)
                        model.subjectTo += '\'m';
                    else if (interrogative && !negative)
                        model.subjectTo = 'Am ' + model.subjectTo;
                    else if (!interrogative && negative)
                        model.subjectTo += '\'m not';
                    else if (interrogative && negative)
                        model.subjectTo = 'Am ' + model.subjectTo + ' not';
                }
                else if (modelIndex == 1 || model.tags[0] == 'plural' || model.tags[0] == 'ourselves') {
                    if (!interrogative && !negative)
                        model.subjectTo += ' are';
                    else if (interrogative && !negative)
                        model.subjectTo = 'Are ' + model.subjectTo.toLowerCase();
                    else if (!interrogative && negative)
                        model.subjectTo += ' aren\'t';
                    else if (interrogative && negative)
                        model.subjectTo = 'Aren\'t ' + model.subjectTo.toLowerCase();
                }
                    
                else if (model.tags[0] == 'singular') {
                    if (!interrogative && !negative)
                        model.subjectTo += ' is';
                    else if (interrogative && !negative)
                        model.subjectTo = 'Is ' + model.subjectTo.toLowerCase();
                    else if (!interrogative && negative)
                        model.subjectTo += ' isn\'t';
                    else if (interrogative && negative)
                        model.subjectTo = 'Isn\'t ' + model.subjectTo.toLowerCase();
                }

                verb = verb.replace('To ', '');
                verb += 'ing';

                return ProcessedVerb(verb, null, null);
            },
            processSimplePast: function (verb, model, modelIndex, negative, interrogative) {

                verb = verb.replace('To ', '');
                verb += 'ed';
                return ProcessedVerb(verb, null, null);
            },
            processPastContinuous: function (verb, model, modelIndex, negative, interrogative) {

                if (modelIndex == 0 || model.tags[0] == 'singular') {
                    if (!interrogative && !negative)
                        model.subjectTo += ' was';
                    else if (interrogative && !negative)
                        model.subjectTo = 'Was ' + model.subjectTo;
                    else if (!interrogative && negative)
                        model.subjectTo += ' Wasn\'t ';
                    else if (interrogative && negative)
                        model.subjectTo = 'Wasn\'t ' + model.subjectTo;
                }
                else if (modelIndex == 1 || model.tags[0] == 'plural' || model.tags[0] == 'ourselves') {
                    if (!interrogative && !negative)
                        model.subjectTo += ' were';
                    else if (interrogative && !negative)
                        model.subjectTo = 'Were ' + model.subjectTo.toLowerCase();
                    else if (!interrogative && negative)
                        model.subjectTo += ' weren\'t';
                    else if (interrogative && negative)
                        model.subjectTo = 'Weren\'t ' + model.subjectTo.toLowerCase();
                }

                verb = verb.replace('To ', '');
                verb += 'ing';

                return ProcessedVerb(verb, null, null);
            },
            processSimpleFuture: function (verb, model, modelIndex, negative, interrogative) {
                verb = verb.replace('To ', '');
                model.subjectTo += ' will';
                return ProcessedVerb(verb, null, null);
            }
        },
        {
            processSimplePresent: function (verb, model, modelIndex, negative, interrogative) {

                var getSP_Myself = function (verb) {
                    var prefix = verb.substr(0, verb.length - 2);
                    var sufix = 'o';
                    return ProcessedVerb(prefix, sufix, null);
                }

                var getSP_Singular = function (verb) {
                    var prefix = verb.substr(0, verb.length - 1);
                    var sufix = '';
                    return ProcessedVerb(prefix, sufix, null);
                }

                var getSP_Plural = function (verb) {
                    var prefix = verb.substr(0, verb.length - 1);
                    var sufix = 'm';
                    return ProcessedVerb(prefix, sufix, null);
                }

                var getSP_Ourselves = function (verb) {
                    var prefix = verb.substr(0, verb.length - 1);
                    var sufix = 'mos';
                    return ProcessedVerb(prefix, sufix, null);
                }

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];
                
                switch (model.tags[0]) {
                    case 'myself':
                        return getSP_Myself(verb);
                    case 'singular':
                        return model.verbTo = getSP_Singular(verb);
                    case 'plural':
                        return model.verbTo = getSP_Plural(verb);
                    case 'ourselves':
                        return model.verbTo = getSP_Ourselves(verb);
                }
            },
            processPresentContinuous: function (verb, model, modelIndex, negative, interrogative) {

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                switch (model.tags[0]) {
                    case 'myself':
                        model.subjectTo += ' estou';
                        break;
                    case 'singular':
                        model.subjectTo += ' está';
                        break;
                    case 'plural':
                        model.subjectTo += ' estão';
                        break;
                    case 'ourselves':
                        model.subjectTo += ' estamos';
                        break;
                }

                verb = verb.substring(0, verb.length - 1) + 'ndo';

                return ProcessedVerb(verb, null, null);
            },
            processSimplePast: function (verb, model, modelIndex, negative, interrogative) {

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                var verbLowerCase = verb.toLowerCase();

                switch (model.tags[0]) {
                    case 'myself':
                        if (/(gar$)/.test(verbLowerCase))  //jogar, joguei
                            verb = verb.substr(0, verb.length - 2) + 'uei';
                        else if (/(ar$)/.test(verbLowerCase))  //andar, andei
                            verb = verb.substr(0, verb.length - 2) + 'ei';
                        else if (/(er$)|(ir$)/.test(verbLowerCase))  //correr-corri, fugir-fugi
                            verb = verb.substr(0, verb.length - 2) + 'i';
                        break;
                    case 'singular':
                        if (/(ar$)/.test(verbLowerCase))  //andar, andou
                            verb = verb.substr(0, verb.length - 2) + 'ou';
                        else if (/(er$)/.test(verbLowerCase))  //correr, correu
                            verb = verb.substr(0, verb.length - 2) + 'eu';
                        else if (/(ir$)/.test(verbLowerCase))  //fugir, fugiu
                            verb = verb.substr(0, verb.length - 1) + 'u';
                        break;
                    case 'plural':
                        verb = verb.substr(0, verb.length - 1) + 'ram';
                        break;
                    case 'ourselves':
                        verb = verb.substr(0, verb.length - 1) + 'mos';
                        break;
                }

                return ProcessedVerb(verb, null, null);
            },
            processPastContinuous: function (verb, model, modelIndex, negative, interrogative) {

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                switch (model.tags[0]) {
                    case 'myself':
                        model.subjectTo += ' estava';
                        break;
                    case 'singular':
                        model.subjectTo += ' estava';
                        break;
                    case 'plural':
                        model.subjectTo += ' estavão';
                        break;
                    case 'ourselves':
                        model.subjectTo += ' estavamos';
                        break;
                }

                verb = verb.substring(0, verb.length - 1) + 'ndo';

                return ProcessedVerb(verb, null, null);
            },
            processSimpleFuture: function (verb, model, modelIndex, negative, interrogative) {

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                switch (model.tags[0]) {
                    case 'myself':
                        model.subjectTo += ' vou';
                        break;
                    case 'singular':
                        model.subjectTo += ' vai';
                        break;
                    case 'plural':
                        model.subjectTo += ' vão';
                        break;
                    case 'ourselves':
                        model.subjectTo += ' vamos';
                        break;
                }

                return ProcessedVerb(verb, null, null);
            }

        },
        {
            processSimplePresent: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative)
                    model.subjectTo = 'Apakah ' + model.subjectTo;

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                return ProcessedVerb(verb, null, null);
            },
            processPresentContinuous: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative)
                    model.subjectTo = 'Apakah ' + model.subjectTo;

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                model.subjectTo += ' sedang';
                return ProcessedVerb(verb, null, null);
            },
            processSimplePast: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative)
                    model.subjectTo = 'Apakah ' + model.subjectTo;

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                model.subjectTo += ' telah';
                return ProcessedVerb(verb, null, null);
            },
            processPastContinuous: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative)
                    model.subjectTo = 'Apakah ' + model.subjectTo;

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                model.subjectTo += ' telah sedang';
                return ProcessedVerb(verb, null, null);

            },
            processSimpleFuture: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative)
                    model.subjectTo = 'Apakah ' + model.subjectTo;

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                model.subjectTo += ' akan';
                return ProcessedVerb(verb, null, null);
            }
        }
    ];

    
    return {
        getSimplePresent: function (langFrom, langTo, verb, negative, interrogative, tense) {
            var model = new Array(_baseModelLanguages.length);

            for (var i = 0; i < _baseModelLanguages.length; i++) {
                model[i] = new Object();
                model[i].tags = _baseTags[i];

                model[i].subjectFrom = _baseModelLanguages[i][langFrom];
                model[i].subjectTo = _baseModelLanguages[i][langTo];

                switch (tense) {
                    case 1:
                        model[i].verbTo = processors[langTo].processSimplePresent(verb, model[i], i, negative, interrogative);
                        break;
                    case 2:
                        model[i].verbTo = processors[langTo].processPresentContinuous(verb, model[i], i, negative, interrogative);
                        break;
                    case 3:
                        model[i].verbTo = processors[langTo].processSimplePast(verb, model[i], i, negative, interrogative);
                        break;
                    case 4:
                        model[i].verbTo = processors[langTo].processPastContinuous(verb, model[i], i, negative, interrogative);
                        break;
                    case 5:
                        model[i].verbTo = processors[langTo].processSimpleFuture(verb, model[i], i, negative, interrogative);
                        break;
                }

                if (interrogative)
                    model[i].verbTo.after = '?';
            }

            return model;
        }
    }
};


var modelGrammarResult = [

];
