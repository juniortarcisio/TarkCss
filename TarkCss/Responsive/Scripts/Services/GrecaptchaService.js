app.service('GrecaptchaService', function () {

    this.GetResponse = function () {
        var respElement = document.getElementsByName('g-recaptcha-response');
        if (respElement.length == 0)
            return null;

        return respElement[0].value;
    }

    this.Configure = function (scope, elementId) {
        window.grecatpchaRender = function () {
            if (typeof grecaptcha != "undefined" && grecaptcha != null)
                grecaptcha.render(elementId, { 'sitekey': '6LedLCETAAAAAKsdcNjpK5lFNQ65Ak6f3iRWHZdx' });
        }

        scope.$on('$viewContentLoaded', function () {
            window.grecatpchaRender();
        });
    }
});

