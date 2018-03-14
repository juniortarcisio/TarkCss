var ReferencesLoader = function (version, bottom) {
    var _version = version;
    var _bottom = (bottom ===true?true:false);
    var _loadElement = function (element) {
        if (!_bottom) {
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(element);
        }
        else {
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(element);
        }
    }

    return {
        loadScript: function (uri, callback) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = uri + '?v=' + _version;

            if (typeof callback != "undefined") {
                script.onreadystatechange = callback;
                script.onload = callback;
            }

            _loadElement(script);
        },
        loadStyle: function (uri, callback) {
            var stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = uri + '?v=' + _version;

            _loadElement(stylesheet);
        }
    };
}

