app.service('SpeechService', function ($http, $rootScope, $q) {
    this.Speak = function (text, lang) {
        var msg = new SpeechSynthesisUtterance();
        msg.voiceURI = 'native';
        msg.volume = 1;
        msg.rate = 1;
        msg.text = text;

        if (typeof lang != "undefined")
            msg.lang = lang;
        
        window.speechSynthesis.speak(msg);
    };

    this.SpeakSpaced = function (text, lang) {
        var words = text.split(' ');

        for (var i = 0; i < words.length; i++) {
            var msg = new SpeechSynthesisUtterance();
            msg.voiceURI = 'native';
            msg.volume = 1;
            msg.rate = 1;
            msg.text = words[i];

            if (typeof lang != "undefined")
                msg.lang = lang;

            window.speechSynthesis.speak(msg);
        }        
    };

    this.Voices = function () {
        return window.speechSynthesis.getVoices();
    }

    this.BrowseSupported = function () {
        return typeof SpeechSynthesisUtterance != "undefined";
    }

    this.IsGoogleChrome = function () { return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); }
    
});