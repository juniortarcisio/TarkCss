﻿app.service('AnimationService', function ($http, $q) {

    this.focusByName = function (name) {
            setTimeout(function () {
                var element = document.getElementsByName(name);
                if (element.length > 0)
                    element[0].focus();
            }, 10);
    }

    this.focusByClass = function (name) {
        var elements = document.getElementsByClassName(name);
        var firstVisibleElement = null;

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].offsetParent != null)
                firstVisibleElement = elements[i];
        }

        if (firstVisibleElement != null)
            setTimeout(function () {
                firstVisibleElement.focus();
                console.log('focused:');
                console.log(firstVisibleElement);
            }, 10);
        else
            console.log('AnimationService.focusByClass: visibile element not found');
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
