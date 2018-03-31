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

var ProcessedVerb = function (prefix, sufix, tagPrefix, tagSufix) {
    if (prefix == null) prefix = '';
    if (sufix == null) sufix = '';
    if (tagPrefix != null) tagPrefix = 'textmark ' + tagPrefix;
    if (tagSufix != null) tagSufix = 'textmark ' + tagSufix;

    return {
        prefix: prefix,
        sufix: sufix,
        tagPrefix: tagPrefix,
        tagSufix: tagSufix
    }
}

var GrammarProcessor = function () {

    function isVowel(c) {
        console.log('isVowel');
        console.log(c);
        return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
    }

    var processors = [
        {
            processToBe: function (verb, model, modelIndex, negative, interrogative) {

                if (!interrogative && !negative) {
                    if (modelIndex == 0)
                        model.subjectToAuxAfter = 'am';
                    else if (model.tags[0] == 'singular' && modelIndex != 1)
                        model.subjectToAuxAfter = 'is';
                    else
                        model.subjectToAuxAfter = 'are';
                }
                else if (interrogative && !negative) {

                    if (modelIndex == 0)
                        model.subjectToAuxBefore = 'Am';
                    else if (model.tags[0] == 'singular' && modelIndex != 1)
                        model.subjectToAuxBefore = 'Is';
                    else
                        model.subjectToAuxBefore = 'Are';
                }
                else if (!interrogative && negative) {
                    if (modelIndex == 0)
                        model.subjectToAuxAfter = 'am not';
                    else if (model.tags[0] == 'singular' && modelIndex != 1)
                        model.subjectToAuxAfter = 'isn\'t';
                    else
                        model.subjectToAuxAfter = 'aren\'t';
                }
                else if (interrogative && negative) {

                    if (modelIndex == 0) {
                        model.subjectToAuxBefore = 'Am';
                        model.subjectToAuxAfter = 'not';
                    }
                    else if (model.tags[0] == 'singular' && modelIndex != 1)
                        model.subjectToAuxBefore = 'Isn\'t';
                    else
                        model.subjectToAuxBefore = 'Aren\'t';
                }

                if (interrogative && modelIndex > 0)
                    model.subjectTo = model.subjectTo.toLowerCase();

                if (interrogative)
                    model.tagSubjectToAuxBefore = 'textmark ' + model.tags[0];
                else
                    model.tagSubjectToAuxAfter = 'textmark ' + model.tags[0];

                verb = verb.replace('To ', '');

                return ProcessedVerb('', null, null, null);
            },
            processSimplePresent: function (verb, model, modelIndex, negative, interrogative) {
                var sufix = null;
                var tagSufix = null;
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

                    tagSufix = model.tags[0];
                }
                
                if (negative && !interrogative)
                    model.subjectToAuxAfter = ' ' + (_3rdPersonSingular ? 'doesn\'t' : 'don\'t');

                else if (interrogative) {
                    if (modelIndex > 0)
                        model.subjectTo = model.subjectTo.toLowerCase();

                    if (!negative)
                        model.subjectToAuxBefore = (_3rdPersonSingular ? 'Does' : 'Do');
                    else 
                        model.subjectToAuxBefore = (_3rdPersonSingular ? 'Doesn\'t' : 'Don\'t') ;
                }

                if (interrogative)
                    model.tagSubjectToAuxBefore = 'textmark ' + model.tags[0];
                else if (negative)
                    model.tagSubjectToAuxAfter = 'textmark ' + model.tags[0];

                return ProcessedVerb(verb, sufix, null, tagSufix);
            },
            processPresentContinuous: function (verb, model, modelIndex, negative, interrogative) {

                if (!interrogative && !negative) {
                    if (modelIndex == 0) 
                        model.subjectToAuxAfter = 'am';
                    else if (model.tags[0] == 'singular' && modelIndex != 1)
                        model.subjectToAuxAfter = 'is';
                    else
                        model.subjectToAuxAfter = 'are';
                }
                else if (interrogative && !negative) {

                    if (modelIndex == 0)
                        model.subjectToAuxBefore = 'Am';
                    else if (model.tags[0] == 'singular' && modelIndex != 1)
                        model.subjectToAuxBefore = 'Is';
                    else
                        model.subjectToAuxBefore = 'Are';
                }
                else if (!interrogative && negative) {
                    if (modelIndex == 0)
                        model.subjectToAuxAfter = 'am not';
                    else if (model.tags[0] == 'singular' && modelIndex != 1)
                        model.subjectToAuxAfter = 'isn\'t';
                    else
                        model.subjectToAuxAfter = 'aren\'t';
                }
                else if (interrogative && negative) {

                    if (modelIndex == 0) {
                        model.subjectToAuxBefore = 'Am';
                        model.subjectToAuxAfter = 'not';
                    }
                    else if (model.tags[0] == 'singular' && modelIndex != 1)
                        model.subjectToAuxBefore = 'Isn\'t';
                    else
                        model.subjectToAuxBefore = 'Aren\'t';
                }

                if (interrogative && modelIndex > 0)
                    model.subjectTo = model.subjectTo.toLowerCase();

                if (interrogative)
                    model.tagSubjectToAuxBefore = 'textmark ' + model.tags[0];
                else
                    model.tagSubjectToAuxAfter = 'textmark ' + model.tags[0];

                verb = verb.replace('To ', '');

                return ProcessedVerb(verb, 'ing', null, 'gray');
            },
            processSimplePast: function (verb, model, modelIndex, negative, interrogative) {
                var sufix = null;
                var tagSufix = null;
                verb = verb.replace('To ', '').toLowerCase();

                var _3rdPersonSingular = model.tags.indexOf('singular') >= 0 && modelIndex > 1;

                var irregularVerbs = [
                    ["eat","ate"],
                    ["drink", "drank"],
                    ["swim", "swam"],
                    ["sing", "sang"],
                    ["speak", "spoke"],
                    ["understand", "understood"],
                    ["study", "studied"],
                    ["learn", "learnt"]
                ];

                //TODO: add irregular verbs
                if (!negative && !interrogative) {
                    var irregularVerb = irregularVerbs.filter(function (el) { return el[0] == verb; });

                    if (irregularVerb.length > 0) {
                        verb = '';
                        sufix = irregularVerb[0][1];
                    }
                    else {
                        sufix = 'ed';
                    }
                    tagSufix = 'gray';
                }
                else if (negative && !interrogative)                    
                    model.subjectToAuxAfter = _3rdPersonSingular ? ' doesn\'t' : ' don\'t';
                else if (interrogative) {
                    if (modelIndex > 0)
                        model.subjectTo = model.subjectTo.toLowerCase();

                    if (!negative)
                        model.subjectToAuxBefore = (_3rdPersonSingular ? 'Does' : 'Do');
                    else if (negative)
                        model.subjectToAuxBefore = (_3rdPersonSingular ? 'Doesn\'t' : 'Don\'t');
                }

                if (interrogative)
                    model.tagSubjectToAuxBefore = 'textmark ' + model.tags[0];
                else if (negative)
                    model.tagSubjectToAuxAfter = 'textmark ' + model.tags[0];

                return ProcessedVerb(verb, sufix, null, tagSufix);
            },
            processPastContinuous: function (verb, model, modelIndex, negative, interrogative) {

                if (!interrogative && !negative) {
                    if (model.tags[0] == 'singular' || modelIndex == 0)
                        model.subjectToAuxAfter = 'was';
                    else
                        model.subjectToAuxAfter = 'were';
                }
                else if (interrogative && !negative) {
                    if (model.tags[0] == 'singular' || modelIndex == 0)
                        model.subjectToAuxBefore = 'Was';
                    else
                        model.subjectToAuxBefore = 'Were';
                }
                else if (!interrogative && negative) {
                    if (model.tags[0] == 'singular' || modelIndex == 0)
                        model.subjectToAuxAfter = 'wasn\'t';
                    else
                        model.subjectToAuxAfter = 'weren\'t';
                }
                else if (interrogative && negative) {
                    if (model.tags[0] == 'singular' || modelIndex == 0)
                        model.subjectToAuxBefore = 'Wasn\'t';
                    else
                        model.subjectToAuxBefore = 'Weren\'t';
                }

                if (interrogative && modelIndex > 0)
                    model.subjectTo = model.subjectTo.toLowerCase();

                if (interrogative)
                    model.tagSubjectToAuxBefore = 'textmark ' + model.tags[0];
                else
                    model.tagSubjectToAuxAfter = 'textmark ' + model.tags[0];

                verb = verb.replace('To ', '');

                return ProcessedVerb(verb, 'ing', null, 'gray');
            },
            processSimpleFuture: function (verb, model, modelIndex, negative, interrogative) {
                verb = verb.replace('To ', '');

                if (!interrogative) {
                    model.tagSubjectToAuxAfter = 'textmark gray';

                    if (!negative && !interrogative)
                        model.subjectToAuxAfter = 'will';
                    else if (negative && !interrogative)
                        model.subjectToAuxAfter = 'won\'t';
                }
                else {
                    model.tagSubjectToAuxBefore = 'textmark gray';

                    if (!negative && interrogative)
                        model.subjectToAuxBefore = 'Will';
                    else if (negative && interrogative)
                        model.subjectToAuxBefore = 'Won\'t';
                }

                return ProcessedVerb(verb, null, null);
            }
        },
        {
            processToBe: function (verb, model, modelIndex, negative, interrogative) {
                var sufix;

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                switch (model.tags[0]) {
                    case 'myself':
                        verb = 'S';
                        sufix = 'ou'
                        break;
                    case 'singular':
                        verb = '';
                        sufix = 'é'
                        break;
                    case 'plural':
                        verb = 'S';
                        sufix = 'ão'
                        break;
                    case 'ourselves':
                        verb = 'S';
                        sufix = 'omos'
                        break;
                }

                return ProcessedVerb(verb, sufix, null, model.tags[0]);
            },
            processSimplePresent: function (verb, model, modelIndex, negative, interrogative) {
                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];
                
                switch (model.tags[0]) {
                    case 'myself':
                        return ProcessedVerb(verb.substr(0, verb.length - 2), 'o', null, model.tags[0]);
                    case 'singular':
                        return ProcessedVerb(verb.substr(0, verb.length - 1), null, model.tags[0]);
                    case 'plural':
                        return ProcessedVerb(verb.substr(0, verb.length - 1), 'm', null, model.tags[0]);
                    case 'ourselves':
                        return ProcessedVerb(verb.substr(0, verb.length - 1), 'mos', null, model.tags[0]);
                }
            },
            processPresentContinuous: function (verb, model, modelIndex, negative, interrogative) {

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                switch (model.tags[0]) {
                    case 'myself':
                        model.subjectToAuxAfter = ' estou';
                        break;
                    case 'singular':
                        model.subjectToAuxAfter = ' está';
                        break;
                    case 'plural':
                        model.subjectToAuxAfter = ' estão';
                        break;
                    case 'ourselves':
                        model.subjectToAuxAfter = ' estamos';
                        break;
                }

                model.tagSubjectToAuxAfter = 'textmark ' + model.tags[0];

                verb = verb.substring(0, verb.length - 1);

                return ProcessedVerb(verb, 'ndo', null, 'gray');
            },
            processSimplePast: function (verb, model, modelIndex, negative, interrogative) {
                var sufix = null;
                var tagSufix = null;

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                var verbLowerCase = verb.toLowerCase();

                switch (model.tags[0]) {
                    case 'myself':
                        verb = verb.substr(0, verb.length - 2);

                        if (/(gar$)/.test(verbLowerCase))  //jogar, joguei
                            sufix = 'uei';
                        else if (/(ar$)/.test(verbLowerCase))  //andar, andei
                            sufix = 'ei';
                        else if (/(er$)|(ir$)/.test(verbLowerCase))  //correr-corri, fugir-fugi
                            sufix = 'i';

                        break;
                    case 'singular':
                        verb = verb.substr(0, verb.length - 2);

                        if (/(ar$)/.test(verbLowerCase)) //andar, andou
                            sufix = 'ou';
                        else if (/(er$)/.test(verbLowerCase)) //correr, correu
                            sufix = 'eu';
                        else if (/(ir$)/.test(verbLowerCase)) //fugir, fugiu
                            sufix = 'iu';

                        break;
                    case 'plural':
                        verb = verb.substr(0, verb.length - 1);
                        sufix = 'ram';
                        break;
                    case 'ourselves':
                        verb = verb.substr(0, verb.length - 1);
                        sufix = 'mos';
                        break;
                }

                tagSufix = model.tags[0];

                return ProcessedVerb(verb, sufix, null, tagSufix);
            },
            processPastContinuous: function (verb, model, modelIndex, negative, interrogative) {

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                switch (model.tags[0]) {
                    case 'myself':
                        model.subjectToAuxAfter = ' estava';
                        break;
                    case 'singular':
                        model.subjectToAuxAfter = ' estava';
                        break;
                    case 'plural':
                        model.subjectToAuxAfter = ' estavão';
                        break;
                    case 'ourselves':
                        model.subjectToAuxAfter = ' estavamos';
                        break;
                }

                model.tagSubjectToAuxAfter = 'textmark ' + model.tags[0];

                verb = verb.substring(0, verb.length - 1);

                return ProcessedVerb(verb, 'ndo', null, 'gray');
            },
            processSimpleFuture: function (verb, model, modelIndex, negative, interrogative) {
                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[1];

                switch (model.tags[0]) {
                    case 'myself':
                        model.subjectToAuxAfter = ' vou';
                        break;
                    case 'singular':
                        model.subjectToAuxAfter = ' vai';
                        break;
                    case 'plural':
                        model.subjectToAuxAfter = ' vão';
                        break;
                    case 'ourselves':
                        model.subjectToAuxAfter = ' vamos';
                        break;
                }

                model.tagSubjectToAuxAfter = 'textmark ' + model.tags[0];

                return ProcessedVerb(verb, null, null);
            }

        },
        {
            processToBe: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative) {
                    model.subjectToAuxBefore = 'Apakah ';
                    model.subjectTo = model.subjectTo.toLowerCase();
                }

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                return ProcessedVerb('adalah', null, 'textmark gray', null);
            },
            processSimplePresent: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative) {
                    model.subjectToAuxBefore = 'Apakah ';
                    model.subjectTo = model.subjectTo.toLowerCase();
                }

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                return ProcessedVerb(verb, null, null);
            },
            processPresentContinuous: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative) {
                    model.subjectToAuxBefore = 'Apakah ';
                    model.subjectTo = model.subjectTo.toLowerCase();
                }

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                model.subjectToAuxAfter = 'sedang';
                model.tagSubjectToAuxAfter = 'textmark gray';

                return ProcessedVerb(verb, null, null);
            },
            processSimplePast: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative) {
                    model.subjectToAuxBefore = 'Apakah ';
                    model.subjectTo = model.subjectTo.toLowerCase();
                }

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                model.subjectToAuxAfter = 'telah';
                model.tagSubjectToAuxAfter = 'textmark gray';

                return ProcessedVerb(verb, null, null);
            },
            processPastContinuous: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative) {
                    model.subjectToAuxBefore = 'Apakah ';
                    model.subjectTo = model.subjectTo.toLowerCase();
                }

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                model.subjectToAuxAfter = 'telah sedang';
                model.tagSubjectToAuxAfter = 'textmark gray';

                return ProcessedVerb(verb, null, null);

            },
            processSimpleFuture: function (verb, model, modelIndex, negative, interrogative) {
                if (interrogative) {
                    model.subjectToAuxBefore = 'Apakah ';
                    model.subjectTo = model.subjectTo.toLowerCase();
                }

                if (negative)
                    model.subjectTo += ' ' + _baseNotWord[2];

                model.subjectToAuxAfter = 'akan';
                model.tagSubjectToAuxAfter = 'textmark gray';

                return ProcessedVerb(verb, null, null);
            }
        }
    ];
    
    return {
        getVerbalTense: function (langFrom, langTo, verb, negative, interrogative, tense) {
            var model = new Array(_baseModelLanguages.length);

            for (var i = 0; i < _baseModelLanguages.length; i++) {
                model[i] = new Object();
                model[i].tags = _baseTags[i];

                model[i].subjectFrom = _baseModelLanguages[i][langFrom];
                model[i].subjectTo = _baseModelLanguages[i][langTo];

                switch (tense) {
                    case 0:
                        model[i].verbTo = processors[langTo].processToBe(verb, model[i], i, negative, interrogative);
                        break;
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

                //if (typeof verb.subjectToAuxBefore == "undefined")
                //    verb.subjectToAuxBefore = '';
                //if (typeof verb.subjectToAuxAfter == "undefined")
                //    verb.subjectToAuxAfter = '';
            }

            return model;
        },
        getAllVerbalTensesByPronoun: function (langFrom, langTo, verb, negative, interrogative, pronoun) {
            var model = new Array(5);

            for (var i = 0; i < model.length; i++) {
                model[i] = new Object();
                model[i].subjectFrom = _baseModelLanguages[pronoun][langFrom];
                model[i].subjectTo = _baseModelLanguages[pronoun][langTo];
                model[i].tags = _baseTags[pronoun];
            }

            model[0].verbTo = processors[langTo].processSimplePresent(verb, model[0], pronoun, negative, interrogative);
            model[1].verbTo = processors[langTo].processPresentContinuous(verb, model[1], pronoun, negative, interrogative);
            model[2].verbTo = processors[langTo].processSimplePast(verb, model[2], pronoun, negative, interrogative);
            model[3].verbTo = processors[langTo].processPastContinuous(verb, model[3], pronoun, negative, interrogative);
            model[4].verbTo = processors[langTo].processSimpleFuture(verb, model[4], pronoun, negative, interrogative);

            model[0].tenseName = 'Simple Present';
            model[1].tenseName = 'Present Continuous';
            model[2].tenseName = 'Simple Past';
            model[3].tenseName = 'Past Continuous';
            model[4].tenseName = 'Simple Future';

            for (var i = 0; i < model.length; i++) {
                if (interrogative)
                    model[i].verbTo.after = '?';
            }

            return model;
        }
    }
};
