app.service('SpeechService', function ($http, $rootScope, $q) {
    this._currentSpeech = null;

    this.getLanguageCode = function(langId) {
        switch (langId) {
            case LANGUAGE_EN_US:
                return 'en-us';
            case LANGUAGE_PT_BR:
                return 'pt-br';
            case LANGUAGE_ID_ID:
                return 'id-id';
            default:
                return 'en-us';        
        }
    }

    this.Speak = function (text, langId) {
        if (!this.BrowseSupported)
            return;
        var msg = new SpeechSynthesisUtterance();
        msg.voiceURI = 'native';
        msg.volume = 1;
        msg.rate = 1;
        msg.text = text;

        if (typeof langId != "undefined")
            msg.lang = this.getLanguageCode(langId);
        else
            msg.lang = 'en-us';
        
        this._currentSpeech = msg;
        window.speechSynthesis.speak(msg);
    };

    this.SpeakSpaced = function (text, langId) {
        if (!this.BrowseSupported)
            return;

        var words = text.split(' ');

        for (var i = 0; i < words.length; i++) {
            var msg = new SpeechSynthesisUtterance();
            msg.voiceURI = 'native';
            msg.volume = 1;
            msg.rate = 1;
            msg.text = words[i];

            if (typeof langId != "undefined")
                msg.lang = this.getLanguageCode(langId);
            else
                msg.lang = 'en-us';

            this._currentSpeech = msg;
            window.speechSynthesis.speak(msg);
        }        
    };

    this.Voices = function () {
        if (!this.BrowseSupported)
            return null;

        return window.speechSynthesis.getVoices();
    }

    this.Stop = function () {
        if (!this.BrowseSupported)
            return;

        window.speechSynthesis.cancel();
    }

    this.BrowseSupported = function () {
        return typeof SpeechSynthesisUtterance != "undefined";
    }

    this.IsGoogleChrome = function () { return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); }
    
});