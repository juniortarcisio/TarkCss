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

//var createTag = function (tagName, cssClass) {
//    return { name: tagName, cssClass : cssClass};
//}

var createModelBase = function () {
    var _arr = new Array();
    _arr[SUBJECT_1P] = { subject: "I", tags: ["myself"] };
    _arr[SUBJECT_2P] = { subject: "You", tags: ["singular"] };
    _arr[SUBJECT_MALE] = { subject: "He", tags: ["singular", "male"] };
    _arr[SUBJECT_FEMALE] = { subject: "She", tags: ["singular", "female"] };
    _arr[SUBJECT_NEAR] = { subject: "It/This", tags: ["singular", "near"] };
    _arr[SUBJECT_FAR] = { subject: "It/That", tags: ["singular", "far"] };
    _arr[SUBJECT_2P_PLURAL] = { subject: "You", tags: ["plural"] };
    _arr[SUBJECT_MALE_PLURAL] = { subject: "They/He", tags: ["plural", "male"] };
    _arr[SUBJECT_FEMALE_PLURAL] = { subject: "They/She", tags: ["plural", "female"] };
    _arr[SUBJECT_NEAR_PLURAL] = { subject: "It/These", tags: ["plural", "near"] };
    _arr[SUBJECT_FAR_PLURAL] = { subject: "It/Those", tags: ["plural", "far"] };
    _arr[SUBJECT_1P_PLURAL] = { subject: "We", tags: ["ourselves"] };

    return _arr;
};

//TODO: create css style for tags
//TODO: conditions for each language, eg: maybe some types of model grammar aren't interesting for some languages
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
var GrammarProcessorPT = function () {
    var _verb = new String();

    var _createModelBase = function () {
        var arr = createModelBase();
        arr[SUBJECT_1P].targetsubject = 'Eu';
        arr[SUBJECT_2P].targetsubject = 'Você';
        arr[SUBJECT_MALE].targetsubject = 'Ele';
        arr[SUBJECT_FEMALE].targetsubject = 'Ela';
        arr[SUBJECT_NEAR].targetsubject = 'Isto';
        arr[SUBJECT_FAR].targetsubject = 'Aquilo';
        arr[SUBJECT_2P_PLURAL].targetsubject = 'Vocês';
        arr[SUBJECT_MALE_PLURAL].targetsubject = 'Eles';
        arr[SUBJECT_FEMALE_PLURAL].targetsubject = 'Elas';
        arr[SUBJECT_NEAR_PLURAL].targetsubject = 'Estes';
        arr[SUBJECT_FAR_PLURAL].targetsubject = 'Aqueles';
        arr[SUBJECT_1P_PLURAL].targetsubject = 'Nós';
        return arr;
    }

    /*PT verb must have at least 3 characters and ends with r*/
    var validadeVerb = function (verb) {
        if (verb.length < 3)
            return false;

        return _verb.lastIndexOf('r', 0) != _verb.length - 1? false : true;
    }

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
    
    return {
        addItem: function (item) {
            items.push(item);
        },
        getSimplePresent: function (verb) {
            _verb = verb;
            var model = _createModelBase();

            for (var i = 0; i < model.length; i++) {
                switch (model[i].tags[0]) {
                    case 'myself':
                        model[i].targetverb = getSP_Myself(verb);
                        break;
                    case 'singular':
                        model[i].targetverb = getSP_Singular(verb);
                        break;
                    case 'plural':
                        model[i].targetverb = getSP_Plural(verb);
                        break;
                    case 'ourselves':
                        model[i].targetverb = getSP_Ourselves(verb);
                        break;
                }
            }

            return model;
        },
        getCompleteVerbTenses: function () {
            return items.pop();
        }
    }
};


var modelGrammarResult = [

];
