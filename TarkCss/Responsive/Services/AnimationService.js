app.service('AnimationService', function ($http, $q) {

    this.focusByName = function(name) {
        document.getElementsByName(name)[0].focus();
    }
    
    this.animate = function (cssTarget, cssAnimation) {
        document.getElementsByClassName(cssTarget)[0].classList.remove(cssAnimation);
        setTimeout(function () {
            document.getElementsByClassName(cssTarget)[0].classList.add(cssAnimation);
        }, 10)
    }

    this.createWavesByClassName = function (className) {
        var _this, firedOnce, posX, posY, waves;

        var _this = document.getElementsByClassName(className)[0];
        if (_this == null) return;

        firedOnce = false;
        posX = Math.floor(_this.clientWidth / 2);
        posY = Math.floor(_this.clientHeight / 2);

        waves = document.createElement('div');
        waves.classList.add('effect-waves__waves');
        waves.style.left = posX + 'px';
        waves.style.top = posY + 'px';
        _this.appendChild(waves).focus();
        waves.classList.add('effect-waves__waves--in');
        return waves.addEventListener('transitionend', function (_this) {
            if (firedOnce) {
                return waves.parentNode.removeChild(waves);
            } else {
                return firedOnce = true;
            }
        });
    }

    this.loadEffectWaves = function () {
        var waveElements;

        function createWaves(e) {
            var _this, firedOnce, posX, posY, waves;
            _this = this;
            firedOnce = false;
            posX = e.offsetX;
            posY = e.offsetY;
            waves = document.createElement('div');
            waves.classList.add('effect-waves__waves');
            waves.style.left = posX + 'px';
            waves.style.top = posY + 'px';
            _this.appendChild(waves).focus();
            waves.classList.add('effect-waves__waves--in');
            return waves.addEventListener('transitionend', function (e) {
                if (firedOnce) {
                    return waves.parentNode.removeChild(waves);
                } else {
                    return firedOnce = true;
                }
            });
        }

        waveElements = document.querySelectorAll('.effect-waves');

        Array.prototype.forEach.call(waveElements, function (el, i) {
            if (el.loadedWaves === true)
                return;

            el.loadedWaves = true;
            el.addEventListener('click', createWaves);
        });
    }
});
