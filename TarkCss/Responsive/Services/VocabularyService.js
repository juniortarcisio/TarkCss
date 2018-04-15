var LANGUAGE_EN_US = 0;
var LANGUAGE_PT_BR = 1;
var LANGUAGE_ID_ID = 2;

app.service('VocabularyService', function ($http, $q, $rootScope) {
 
    $rootScope.LANGUAGE_EN_US = 0;
    $rootScope.LANGUAGE_PT_BR = 1;
    $rootScope.LANGUAGE_ID_ID = 2;

    this.languages = new Array();

    this.languages[LANGUAGE_EN_US] = new Object();
    this.languages[LANGUAGE_EN_US].name = 'English';
    this.languages[LANGUAGE_EN_US].id = LANGUAGE_EN_US;         
    this.languages[LANGUAGE_EN_US].flag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMjExNEYyMDE3OEExMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMjExNEYyMTE3OEExMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyMTE0RjFFMTc4QTExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyMTE0RjFGMTc4QTExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+EXnauAAABW1JREFUeNrEVm1QVGUUfu7dXZBYvuRj1yATNT5FxCClTNLUFNBJrfxRZjOKkVLqGA2okGGDhA44ToqT1pigA9qAhkho4kiCqRhgCKwBg5IiLCDs8rEid0/vvVfWGD/K/nR27u7Ofc85z/Oe9znnXi52S4Eh49sy9DS1AE6OgJsdYDYDhOFWr8fi+Ej8kByBuoDX0FOtA6dUwVrrignNlxG1vQT7Yg8B492Gx3HsUvBAmxHoNEAdFoyYqDAoUzeF2322djbS0k9h53el6NXdAEY6Aa6PIfBvTQTkGaBeBOxmgCFYFz0Dy5z0GJe7FbzxdAlc1CokJ4SjoSoRsQkLoXawAXTNLKhHZss9JaAY085idbdgN9EbcQfWo2JTIJLOpoCbOw0VR8+BvzUrDFe8X4Th5Blo7K2RmjQfjZWJiE9aBHtnW5lAe69IH9wTCMhrDLCD+epuwiHIFwmHGGCcH5LPpYCfHYrKY2VwPJyHoNYGoKXwNAlvRVItK2qVTzAZi0toyNqNAxT7eT6px2xkBQ+nsI+OSPdrJ4TRJWipXPkc/e4xWbq3OKGI+USSOmwPxX1fQ01nLhB9+AHVs7y/uXpSR3auJa+JXYB/Gi1LKaXiXTlUExRKvzDHinGB1L430+LYqjfS8k8yacmmEyQMCg8BCwN3KSqthN5dtZ+u7s4iYekS+kPMM8qL2nPyLHkq6jto6apDBJuPCVOXHSSvyH0UnVVPOrbYf7Gc6uYtpLqIt6kzt4AeZdV+IrCGyhUeVOkeRGbpw6zpGvVGR1PtjHl0p/DnYTFX20y08ouT5D13D730/kHiSNo2s/4+GE1m2DmpLec2qO8Ap1KxtlGAFwWj4iEYTagJjcTdaw1SOyldRsL31+Ow0joDBna+Ls6WeBIEUL9J+t9nuge1rTVgYyNromb8VBqSI+MNQSBwCgXTCSe3khhMw3vK3Nsnt9p9VfG2z7Af5q9UyqoW/QeFYZ2oUDA/jsdQfyp7G5ufukWVjg7si5dzMJB7f7Y8RO6fjMf/ZEqbMR4PGpGxFszDmXPi9JGalKTyihuTSi08KLXKYxT+3uTc0NSCnJNYHM+OjruPIflYxMUSm7qMsGJCkhZUSnDW1g8YiGAsl8BEUsvEZRoSlysTV1k+E5eLRMZsloFEwrza1hJ+19gHazsrca/yjhfFF+B2UycCfLWIWfkqArQjLM791XW4uXUbnNlIdYpbC3j6QGEjKYXxNMsCEzU1ij0YrKyGnV33ybPQ7z8gbg2jN3wKvb8f0nOv43xeKVw1avB5KbkYYerFmzPHW0CNpRdRHTwDTQG+eL6tAb0+gVifcRkrvipmIjdLupIQWekUolJZ0dZ8XYaYuBx0G+X2cZg1BXYhITCeKcWlCf4whM7E67fK4f6CB37MY3OyubXH0uTGkjK6Mmka1bBUg/PfoJajJyg9V0djlxxmx7GQQpdnP3ZkLogvZD7zyNk7kRKTC6mzX7Dk7TpeRJWeE6VpZn7vHbp+oph4Dzdb9F24jOrJ03F9+svwfXYE3PILsSc6A1Myu7Bu0Q405rNBCi3cNXaPValGfKBgDDpuG5C04TDGTtyML7efgmGA4BAxB4GNVXA5Voiqs9Uwhc8ELwI2TQ2G32hbaAqKsGvFboRkGRATsQ03fjoPeLkC7k6S+J7Uq/IaO3M3e8B7NLraepAQmw3PgM1gFUD3gBmOC+Zi0o2r0OQXQemjscKd3HxkWPkjPfMSGrLT2FhTyYBSrqd8ExAJsOknvclo7NHZasCWjUew+8AFrF3xCtasmQ2HyDlQ7lr9jXFnVjkac1IZIJO6l9t/A3wUAbpPQGuPjpZuqQI79p7D6qhp+EuAAQB9e+n65ZcRTgAAAABJRU5ErkJggg==";
    this.languages[LANGUAGE_EN_US].countryRef = 'England';

    this.languages[LANGUAGE_PT_BR] = new Object();
    this.languages[LANGUAGE_PT_BR].name = 'Portuguese';
    this.languages[LANGUAGE_PT_BR].id = LANGUAGE_PT_BR;
    this.languages[LANGUAGE_PT_BR].flag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRDhGOEMxMTE3NzIxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRDhGOEMxMjE3NzIxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJEOEY4QzBGMTc3MjExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJEOEY4QzEwMTc3MjExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TFbakQAABKdJREFUeNq8ll1sU2UYx3+n7en6uZVa1oGDwtYxnCw0EhiCxjgjH14oiV6Ampj4GRONRpQ4ZZEYvTAhwSxGjRFilO2GDy8gZuEGTAS2xUHmBvuAuVG70U0o++ranq6tz2mHc8YB48KTnL7pec/7/p////k/z3kV6h4ZAJz8v9e4SX4Wz3uZkoGEFWQgL343wE6Djj4vwJTEOpHPA64/qXIPw6Qj90yfmwdjw529N72pDjJlYufybloD52gKnOfDkk55ZpQ55+x3b8dBcjx2yxzrTJJmiFtYt2CIH9adY0VJCq5PY3ggeEXhueY1/HK9SKRPgFnujHJLxnMD64D6YmFpMCX4pOQSNRuvQKeRfYeqaOv2kpa4K/3DvPd0CwQ09p1ZQs3lMhJJG1gnwJCeK4A5gLPmsWSZbiocoK60i/LKGCe/9/HMru1Eki5MJNG3TGLGbR6j/tMjbHmpm76OPN7qXcmxcDGoU6JA7L/Ax41sXVaje3OGpeQr6qTAEqOu7AKf+3vw+KY4edBF9c7XUdIKRWoILX0VG2N4raPEkk72n6ii2tdD4OEIO8xDlNjHOT1ewGS0AEzJHHv+DkCbYayDxkWitIEdi4LsW96F1y4Ri2K4TRxsq+NseDXL3EFsihOTptLRc4X2kyEutPZzjWKqK4Y40XAAY1L2kvgjk0Z29pfz3eDSHKg1epP9DGNFSmKVbYKvy9rZXdKPQ0mTEJWMLujtdPPlkScYutjDxeYQkXCUPNWE11/A5h2VrKpeQrhjkKZujSfX9LO4YpK4mM9pzrCtSMrOHuGikBrWLGRydaSZssOUSrGq0bT6LPYFZB0bE2UMEpySD6FwHocOt4mBY7icZnpbhvkx+SsWye8Kv5fHX72f3Q1bqf8mTGjwOGt0frI2Jua2agi3CJtdzfhbH6JPwHXpc8DGKa6mjGzqWEvtkl62FEawSlrisghpTIWuKL4FThxWG+lUFNVqodCejyqsB4IR9u5qJFDp5/nabWzwecgMhciI2lapQomNU0EXe4KlhISgjqVfhpummjKmODPiYetvVbzSeR/jkmuL9AvxD+WrR6RsBgjd8OB2W9CSKWFkkFvBas9j+T0uLrRbOFa7n4X2ThTJr742LuBvdpXzaNt6fr5RSFI32HSHm+lcmenkSwP49o9Syls30jDozXrCKMO7LzQyGosRDOfjcJjErfHsnZ9vImNeKkG4eefln6BA9BUdj4YXslL2+KJ/hbDWcnv/45pdTjqKHpGAT4gZjg4V0x6zUpUeIfDYCGvdA9QfLyU46mE8qnJtTCUkKtnUNF99cICnXuxhsE/lte4Kai9XMJoSne0T0yxn1bJ2684lchNziIMn2VvWwxsPSu7OW/i4YT0dl4qkYyqU+8LUbG/CsSHG/pZFvN21komEHWzC0JCaZ+f6dwCaCJLIo9ozSP36cxRJUyI83asXwY2r8OzZAI3D94qsydyn8q579Rx9WzoHe3yX+cjfl5367Hcf7/eXSe+UMrHpsqZvBzoP4FlfKjV7CNjoDaHK/1Pig+zXSPrAHQDOOoHc+bFH39gkdaiOcfq6N2cYneXNuXmcQP4SYAD5sNLFPECeSAAAAABJRU5ErkJggg==";
    this.languages[LANGUAGE_PT_BR].countryRef = 'Brasil';

    this.languages[LANGUAGE_ID_ID] = new Object();
    this.languages[LANGUAGE_ID_ID].name = 'Bahasa';
    this.languages[LANGUAGE_ID_ID].id = LANGUAGE_ID_ID;
    this.languages[LANGUAGE_ID_ID].flag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMEUwNDkxMDE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMEUwNDkxMTE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRTA0OTBFMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAwRTA0OTBGMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+D76wCAAAAG9JREFUeNpiPCeo9pSBgUEKiD8z0AfwAvEzFiiDAYmmi+VMDAMERi0etZhmgOXP+w8DYzGbtOQ/KPsfHUP5H+Of9x/fAxkCQPyXThYzA/EHFmYBPmYkAXoB5tHsNGrxqMXUK7mgTR5eOjd9PgMEGACLNBM7Kx9mIgAAAABJRU5ErkJggg==";
    this.languages[LANGUAGE_ID_ID].countryRef = 'Indonesia';

    this.albums = [
        {
            id: 0, name: "Basic Words", icon: "fa-cubes",
            decks: [
                {
                    id: 0,
                    name: "Subjects",
                    words: [
                        { lang: ["I", "Eu", "Saya"], obs: [null, null, "formal"] },
                        { lang: ["I", "Eu", "Aku"], obs: [null, null, "informal"], show: [false, false, true] },
                        { lang: ["You", "Você", "Anda"], obs: [null, null, "formal"] },
                        { lang: ["You", "Você", "Kamu"], obs: [null, null, "informal"], show: [false, false, true] },
                        { lang: ["He", "Ele", "Dia"], obs: ["Male", "Male", null] },
                        { lang: ["She", "Ela", "Dia"], obs: ["Female", "Female", null], show: [true, true, false] },
                        { lang: ["They", "Eles", "Mereka"], obs: ["Male", "Male", null] },
                        { lang: ["They", "Elas", "Mereka"], obs: [null, "Female", null], show: [false, true, false] },
                        { lang: ["This", "Este", "Ini"] },
                        { lang: ["These", "Estes", "Ini"], obs: ["Plural", "Plural", null], show: [true, true, false] },
                        { lang: ["That", "Aquele", "Itu"] },
                        { lang: ["Those", "Aqueles", "Itu"], obs: ["Plural", "Plural", null], show: [true, true, false] },
                        { lang: ["We", "Nós", "Kami"], obs: [null, null, "Excludes the listener"] },
                        { lang: ["We", "Nós", "Kita"], obs: [null,null,"Includes the listener"], show: [false,false,true] }
                    ]
                },
                {
                    id: 1,
                    name: "Question Words",
                    words: [
                        { lang: ["What", "O que", "Apa"] },
                        { lang: ["Who", "Quem", "Siapa"] },
                        { lang: ["Where", "Onde", "Di mana"] },
                        { lang: ["When", "Quando", "Kapan"] },
                        { lang: ["How", "Como", "Bagaimana"] },
                        { lang: ["How long", "Quanto tempo", "Berapa lama"] },
                        { lang: ["How much", "Quanto", "Berapa banyak"] },
                        { lang: ["How old", "Quantos anos", "Berapa umur"] },
                        { lang: ["How far", "Quão longe", "Berapa Jauh"] },
                        { lang: ["Question", "Pergunta", "Tanya"] }
                    ]
                },
                {
                    id: 2,
                    name: "Modal Verbs",
                    words: [
                        { lang: ["Can", "Posso", "Bisa"] },
                        { lang: ["Could", "Poderia", "Bisa"], obs: ['Polite', 'Polite', null], show: [true, true, false] },// Polite thisWordAlsoMeans: [][][0]
                        { lang: ["Will", "Vou", "Akan"] },
                        { lang: ["Would", "Iria", "Akan"], obs: ['Polite', 'Polite', null], show: [true, true, false] }, //Hypotetical / polite, would you like -> gostaria
                        { lang: ["Must", "Devo", "Harus"] },
                        { lang: ["Should", "Deveria", "Harus"], obs: ['Polite', 'Polite', null], show: [true, true, false] },
                        { lang: ["Need", "Precisar", "Perlu"] },
                        { lang: ["Want", "Querer", "Mau"] },
                        { lang: ["Would like", "Gostaria", "Ingin"], obs: ['Polite', 'Polite', 'Polite']},
                        { lang: ["Know", "Saber", "Tau"] }
                        //{ lang: ["May", "Posso", "Bisa"] }
                    ]
                },
                {
                    id: 3,
                    name: "Key Words",
                    words: [
                        { lang: ["For", "Para", "Untuk"] },
                        { lang: ["But", "Mas", "Tapi"] },
                        { lang: ["If", "Se", "Kalau"] },
                        { lang: ["Then", "Então", "Kemudian"] },
                        { lang: ["Or", "Ou", "Atau"] },
                        { lang: ["And", "E", "Dan"] },
                        { lang: ["Already", "Já", "Sudah"] },
                        { lang: ["Yet", "Ainda", "Namun"] },
                        { lang: ["Not yet", "Ainda não", "Belum"] },
                        { lang: ["Ever", "Sempre", "Pernah"] },
                        { lang: ["Never", "Nunca", "Tak pernah"] },
                        { lang: ["Again", "De novo", "Lagi"] },
                        { lang: ["Really", "Realmente", "Yang Benar"] },
                        { lang: ["Alone", "Sozinho", "Sendiri"] },
                        { lang: ["With", "Com", "Dengan"] },
                        { lang: ["Give", "Dar", "Berikan"] },
                        { lang: ["Only", "Somente", "Saja"] },
                        { lang: ["Maybe", "Talvez", "Mungkin"] },
                        { lang: ["More", "Mais", "Lebih"] },
                        { lang: ["Very", "Muito", "Sangat"] }, //uncountable
                        { lang: ["A lot", "Muito", "Banyak"] },
                        { lang: ["Together", "Juntos", "Bersama"] },
                        { lang: ["Join", "Juntar-se", "Ikut"] },
                        { lang: ["As", "Como", "Seperti"] },
                        { lang: ["Like", "Como", "Suka"] }
                    ]
                },
                {
                    id: 4,
                    name: "Colors",
                    words: [
                        { lang: ["Blue", "Azul", "Biru"] },
                        { lang: ["Red", "Vermelho", "Merah"] },
                        { lang: ["Yellow", "Amarelo", "Kuning"] },
                        { lang: ["Green", "Verde", "Hijau"] },
                        { lang: ["White", "Branco", "Putih"] },
                        { lang: ["Black", "Preto", "Hitam"] },
                        { lang: ["Purple", "Roxo", "Ungu"] },
                        { lang: ["Orange", "Laranja", "Oranye"] },
                        { lang: ["Brown", "Marrom", "Coklat"] },
                        { lang: ["Pink", "Rosa", "Merah muda"] },
                        { lang: ["Grey", "Cinza", "Abu-abu"] }
                    ]
                }
                //,
                //{
                //    id: 6,
                //    name: "Expressions",
                //    words: [
                //        { lang: ["Thank you", "Obrigado", "Terima kasih"] },
                //        { lang: ["Good day", "Bom dia", "Selamat pagi"] },
                //        { lang: ["Good afternoon", "Boa tarde", "Selamat sore"] }
                //    ]
                //}
            ]
        },
        {
            id: 1, name: "Verbs & Actions", icon: "fa-blind",
            decks: [
                {
                    id: 0,
                    name: "General Actions",
                    words: [
                        { lang: ["To Be", "Ser", "Menjadi"] },
                        { lang: ["To Do", "Fazer", "Melakukan"] },
                        { lang: ["To Have", "Ter", "Punya"] }, //memiliki
                        { lang: ["To Like", "Gostar", "Suka"] },
                        { lang: ["To Know", "Saber", "Tahu"] },
                        { lang: ["To Think", "Pensar", "Berpikir"] },
                        { lang: ["To Look", "Ver", "Melihat"] },
                        { lang: ["To Work", "Trabalhar", "Bekerja"] },
                        { lang: ["To Study", "Estudar", "Belajar"] },
                        { lang: ["To Use", "Usar", "Menggunakan"] }
                    ]
                },
                {
                    id: 0,
                    name: "Physical Actions",
                    words: [
                        { lang: ["To Walk", "Andar", "Berjalan"] },
                        { lang: ["To Go", "Ir", "Pergi"] },
                        { lang: ["To Swim", "Nadar", "Berang"] },
                        { lang: ["To Run", "Correr", "Menjalankan"] },
                        { lang: ["To Wait", "Esperar", "Menunggu"] },
                        { lang: ["To Get", "Pegar", "Mendapatkan"] },
                        { lang: ["To Take", "Tomar", "Mengambil"] },
                        { lang: ["To Give", "Dar", "Memberi"] },
                        { lang: ["To Eat", "Comer", "Makan"] },
                        { lang: ["To Drink", "Beber", "Minum"] },
                        { lang: ["To Play", "Jogar", "Bermain"] }
                    ]
                },
                {
                    id: 1,
                    name: "Verbal Actions",
                    words: [
                        { lang: ["To Talk", "Falar", "Berbicara"] },
                        { lang: ["To Ask", "Perguntar", "Bertanya"], obs: ['Question', null, null] },
                        { lang: ["To Ask", "Pedir", "Minta"], obs: ['Require', null, null], show: [false, true, true] },
                        { lang: ["To Talk", "Conversar", "Berbicara"], obs: ['conversation', 'conversation', null], show: [true, true, false] },
                        { lang: ["To Speak", "Falar", "Berbicara"], obs: ['language', 'language', 'language'] },
                        { lang: ["To Say", "Dizer", "Mengatakan"], obs: ['something', 'something', 'something'] },
                        { lang: ["To Tell", "Contar", "Menceritakan"], obs: ['story', 'story', 'story'] },
                        { lang: ["To Call", "Chamar", "Memanggil"]},
                        { lang: ["To Hear", "Ouvir", "Mendengar"], obs: ['sound', 'sound', 'sound'] },
                        { lang: ["To Listen", "Escutar", "Mendengarkan"] },
                        { lang: ["To Understand", "Entender", "Mergenti"] }
                    ]
                }
            ]
        },
        {
            id: 2, name: "Math & Time", icon: "fa-calculator",
            decks: [
                {
                    id: 0,
                    name: "Basic Numbers",
                    words: [
                        { lang: ["One", "Um", "Satu"] },
                        { lang: ["Two", "Dois", "Dua"] },
                        { lang: ["Three", "Três", "Tiga"] },
                        { lang: ["Four", "Quartro", "Empat"] },
                        { lang: ["Five", "Cinco", "Lima"] },
                        { lang: ["Six", "Seis", "Enam"] },
                        { lang: ["Seven", "Sete", "Tujuh"] },
                        { lang: ["Eight", "Oito", "Delapan"] },
                        { lang: ["Nine", "Nove", "Sembilan"] },
                        { lang: ["Teen", "Dez", "Sepuluh"] },
                        { lang: ["Eleven", "Onze", "Sebelas"] },
                        { lang: ["Twelve", "Doze", "Dua belas"] },
                        { lang: ["Thirteen", "Treze", "Tiga belas"] },
                        { lang: ["Fourteen", "Quatorze", "Empat belas"] },
                        { lang: ["Fifteen", "Quinze", "Lima belas"] },
                        { lang: ["Sixteen", "Dezesseis", "Enam belas"] },
                        { lang: ["Seventeen", "Dezessete", "Tujuh belas"] },
                        { lang: ["Eightteen", "Dezoito", "Delapan belas"] },
                        { lang: ["Nineteen", "Dezenove", "Sembilan belas"] },
                        { lang: ["Twenty", "Vinte", "Dua Puluh"] },
                        { lang: ["Thirty", "Trinta", "Tiga Puluh"] },
                        { lang: ["Fourty", "Quarenta", "Empat Puluh"] },
                        { lang: ["Fifty", "Cinquenta", "Lima Puluh"] },
                        { lang: ["One Hundred", "Cem", "Seratus"] },
                        { lang: ["Two Hundred", "Duzentos", "Dua Ratus"] },
                        { lang: ["Three Hundred", "Trezentos", "Tiga Ratus"] },
                        { lang: ["One Thousand", "Mil", "Seribu"] },
                        { lang: ["Two Thousand", "Dois Mil", "Dua Ribu"] },
                        { lang: ["Three Thousand", "Três Mil", "Tiga Ribu"] },
                        { lang: ["One Million", "Um Milhão", "Satu Juta"] },
                        { lang: ["Two Million", "Dois Milhões", "Dua Juta"] },
                        { lang: ["Three Million", "Três Milhões", "Tiga Juta"] },
                        { lang: ["One Billion", "Um Bilhão", "Satu Miliar"] },
                        { lang: ["Two Billion", "Dois Bilhões", "Dua Miliar"] },
                        { lang: ["Three Billion", "Três Bilhões", "Tiga Miliar"] },
                        { lang: ["One Trillion", "Um Trilhão", "Satu Triliun"] },
                        { lang: ["Two Trillion", "Dois Trilhões", "Dua Triliun"] },
                        { lang: ["Three Trillion", "Três Trilhões", "Tiga Triliun"] }
                    ]
                },
                {
                    id: 1,
                    name: "Ordinal Numbers",
                    words: [
                        { lang: ["First", "Primeiro", "Pertama"] },
                        { lang: ["Second", "Segundo", "Kedua"] },
                        { lang: ["Third", "Terceiro", "Ketiga"] },
                        { lang: ["Fourth", "Quarto", "Keempat"] },
                        { lang: ["Fifth", "Quinto", "Kelima"] },
                        { lang: ["Sixth", "Sexto", "Keenam"] },
                        { lang: ["Seventh", "Setimo", "Ketujuh"] },
                        { lang: ["Eighth", "Oitavo", "Kedelapan"] },
                        { lang: ["Ninth", "Nono", "Kesembilan"] },
                        { lang: ["Tenth", "Décimo", "Kesepuluh"] }
                    ]
                },
                {
                    id: 2,
                    name: "Ocurrencies",
                    words: [
                        { lang: ["Once", "Uma Vez", "Satu Kali"] },
                        { lang: ["Twice", "Duas Vezes", "Dua Kali"] },
                        { lang: ["Three Times", "Três Vezes", "Tiga Kali"] },
                        { lang: ["Four Times", "Quatro Vezes", "Empat Kali"] },
                        { lang: ["Five Times", "Cinco Vezes", "Lima Kali"] },
                        { lang: ["Six Times", "Seis Vezes", "Enam Kali"] },
                        { lang: ["Seven Times", "Sete Vezes", "Tujuh Kali"] },
                        { lang: ["Eight Times", "Oito Vezes", "Delapan Kali"] },
                        { lang: ["Nine Times", "Nove Vezes", "Sembilan Kali"] },
                        { lang: ["Ten Times", "Dez Vezes", "Sepuluh Kali"] }
                    ]
                },
                {
                    id: 3,
                    name: "Fractions",
                    words: [
                        { lang: ["Half", "Metade", "Setengah"] },
                        { lang: ["One Third", "Um Terço", "Sepertiga"] },
                        { lang: ["One Quarter", "Um Quarto", "Seperempat"] },
                        { lang: ["One Fifth", "Um Quinto", "Seperlima"] },
                        { lang: ["One Sixth", "Um Sexto", "Seperenam"] },
                        { lang: ["One Seventh", "Um Sétimo", "Sepertujuh"] },
                        { lang: ["One Eighth", "Um Oitavo", "Seperdelapan"] },
                        { lang: ["One Nineth", "Um Nono", "Sepersembilan"] },
                        { lang: ["One Tenth", "Um Décimo", "Sepersepuluh"] },
                        { lang: ["One Eleventh", "Onze avos", "Sepersebelas"] }
                    ]
                },
                {
                    id: 4,
                    name: "Time",
                    words: [
                        { lang: ["Second", "Segundo", "Detik"] },
                        { lang: ["Minute", "Minuto", "Menit"] },
                        { lang: ["Hour", "Hora", "Waktu"] },
                        { lang: ["Morning", "Manhã", "Pagi"] },
                        { lang: ["Afternoon", "Tarde", "Siang"] },
                        { lang: ["Evening", "Tarde", "Sore"], show: [true, false, true] },
                        { lang: ["Night", "Noite", "Malam"] },
                        { lang: ["Day", "Dia", "Hari"] },
                        { lang: ["Week", "Semana", "Minggu"] },
                        { lang: ["Month", "Mês", "Bulan"] },
                        { lang: ["Year", "Ano", "Tahun"] },
                        { lang: ["Tomorrow", "Amanhã", "Besok"] },
                        { lang: ["Yesterday", "Ontem", "Kemaren"] },
                        { lang: ["Later", "Mais tarde", "Nanti"] }
                    ]
                },
                {
                    id: 5,
                    name: "Measure",
                    words: [
                        { lang: ["Measure", "Medida", "Mengukur"] },
                        { lang: ["Big", "Grande", "Besar"] },
                        { lang: ["Small", "Pequeno", "Kecil"] },
                        { lang: ["Tall", "Alto", "Tinggi"] },
                        { lang: ["Short", "Baixo", "Pendek"], obs: [null,'Tall Opposite', null], show:[false,true,false] },
                        { lang: ["Long", "Longo", "Panjang"] },
                        { lang: ["Short", "Curto", "Pendek"], obs: [null, 'Long Opposite', null] },
                        { lang: ["Heavy", "Pesado", "Berat"] },
                        { lang: ["Light", "Leve", "Ringan"] }, 
                        { lang: ["Narrow", "Estreito", "Sempit"] },
                        { lang: ["Wide", "Estreito", "Lebar"] },
                        { lang: ["Thick", "Grosso", "Tebal"] },
                        { lang: ["Thin", "Fino", "Tipis"] },
                        { lang: ["Fast", "Rápido", "Cepat"] },
                        { lang: ["Slow", "Lento", "Pelan"] },
                        { lang: ["Far", "Longe", "Jauh"] },
                        { lang: ["Near", "Perto", "Dekat"] }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Places & Routes", icon: "fa-map",
            decks: [
                {
                    id: 0,
                    name: "Directions",
                    words: [
                        { lang: ["North", "Norte", "Utara"] },
                        { lang: ["East", "Leste", "Timur"] },
                        { lang: ["South", "Sul", "Selatan"] },
                        { lang: ["West", "Oeste", "Barat"] },
                        { lang: ["Ahead", "Frente", "Depan"] },
                        { lang: ["Left", "Esquerda", "Kiri"] },
                        { lang: ["Behind", "Atrás", "Belakang"] },
                        { lang: ["Right", "Direita", "Kanan"] },
                        { lang: ["Near", "Perto", "Dekat"] },
                        { lang: ["Far", "Longe", "Jauh"] }
                    ]
                },
                {
                    id: 1,
                    name: "Geography",
                    words: [
                        { lang: ["Address", "Endereço", "Alamat"] },
                        { lang: ["Street", "Rua", "Jalan"] },
                        { lang: ["Highway", "Rodovia", "Jalan Raya"] },
                        { lang: ["Neighborhood", "Bairro", "Lingkungan"] },
                        { lang: ["City", "Cidade", "Kota"] },
                        { lang: ["Province", "Província", "Propinsi"] },
                        { lang: ["State", "Estado", "Negarabagian"] },
                        { lang: ["Country", "País", "Negara"] },
                        { lang: ["Continent", "Continente", "Benua"] },
                        { lang: ["Planet", "Planeta", "Planet"] },
                        { lang: ["Galaxy", "Galaxia", "Galaksi"] }
                    ]
                },
                {
                    id: 2,
                    name: "Home",
                    words: [
                        { lang: ["House", "Casa", "Rumah"] },
                        { lang: ["Apartment", "Apartamento", "Apartemen"] },
                        { lang: ["Bathroom", "Banheiro", "Kamar mandi"] },
                        { lang: ["Restroom", "Toalete", "Kamar kecil"] },
                        { lang: ["Bedroom", "Quarto", "Kamar tidur"] },
                        { lang: ["Living room", "Sala", "Ruang keluarga"] },
                        { lang: ["Kitchen", "Cozinha", "Dapur"] },
                        { lang: ["Laundry", "Lavanderia", "Laundry"] },
                        { lang: ["Backyard", "Quintal", "Halaman belakang"] },
                        { lang: ["Garage", "Garagem", "Kolam Renang"] }
                    ]
                },
                {
                    id: 3,
                    name: "Vehicles",
                    words: [
                        { lang: ["Bicycle", "Moto", "Sepeda"] },
                        { lang: ["Scooter", "Lambreta", "Skuter"] },
                        { lang: ["Bike", "Moto", "Sepeda Motor"] },
                        { lang: ["Car", "Carro", "Mobil"] },
                        { lang: ["Truck", "Caminhão", "Truk"] },
                        { lang: ["Tractor", "Trator", "Traktor"] },
                        { lang: ["Bus", "Ônibus", "Bus"] },
                        { lang: ["Train", "Trem", "Melatih"] },
                        { lang: ["Subway", "Metrô", "Kereta bawah tanah"] },
                        { lang: ["Boat", "Barco", "Peharu"] },
                        { lang: ["Ship", "Navio", "Kapal"] },
                        { lang: ["Helicopter", "Helicóptero", "Helikopter"] },
                        { lang: ["Airplane", "Avião", "Pesawat terbang"] },
                        { lang: ["Rocket", "Foguete", "Roket"] }
                    ]
                },
                {
                    id: 4,
                    name: "Climate",
                    words: [
                        { lang: ["Suny", "Ensolarado", "Cerah"] },
                        { lang: ["Cloudy", "Nublado", "Berawan"] },
                        { lang: ["Rainy", "Chuvoso", "Hujan"] },
                        { lang: ["Tempest", "Tempestade", "Badai"] },
                        { lang: ["Rain", "Chuva", "Hujan"] },
                        { lang: ["Snow", "Neve", "Salju"] },
                        { lang: ["Cloud", "Nuvem", "Awan"] },
                        { lang: ["Sky", "Céu", "Langit"] },
                        { lang: ["Sun", "Sol", "Matahari"] },
                        { lang: ["Moon", "Lua", "Bulan"] },
                        { lang: ["Star", "Estrela", "Bintang"] }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: "Cousine", icon: "fa-coffee",
            decks: [
                {
                    id: 0,
                    name: "Food",
                    words: [
                        { lang: ["Chicken Meat", "Carne de Frango", "Daging Ayam"] },
                        { lang: ["Cow Meat", "Carne de Vaca", "Daging Sapi"] },
                        { lang: ["Pork Meat", "Carne de Porco", "Daging Babi"] },
                        { lang: ["Fried Fish", "Peixe Frito", "Ikan Goreng"] },
                        { lang: ["Grilled", "Grelhado", "Bakar"] },
                        { lang: ["Roasted", "Assado", "Panggang"] },
                        { lang: ["Cooked", "Cozido", "Masak"] },
                        { lang: ["Spicy", "Apimentado", "Pedas"] },
                        { lang: ["Noodles", "Miojo", "Mi"] },
                        { lang: ["Rice", "Arroz", "Nasi"] }
                    ]
                },
                {
                    id: 1,
                    name: "Drink",
                    words: [
                        { lang: ["Water", "Água", "Air putih"] },
                        { lang: ["Coffee", "Café", "Kopi"] },
                        { lang: ["Milk", "Leite", "Susu"] },
                        { lang: ["Fruits Juice", "Suco de Frutas", "Jus buah"] },
                        { lang: ["Orange Juice", "Suco de Laranja", "Jus jeruk"] },
                        { lang: ["Lemonade", "Limonada", "Limonade"] },
                        { lang: ["Mango Juice", "Suco de Manga", "Jus mangga"] },
                        { lang: ["Tea", "Chá", "Teh"] },
                        { lang: ["Beer", "Cerveja", "Bir"] },
                        { lang: ["Wine", "Vinho", "Anggur merah"] },
                        { lang: ["Cocktail", "Coquetel", "Koktail"] }
                    ]
                },
                {
                    id: 2,
                    name: "Fruits",
                    words: [
                        { lang: ["Mango", "Manga", "Mangga"] },
                        { lang: ["Apple", "Maçã", "Apel"] },
                        { lang: ["Banana", "Banana", "Pisang"] },
                        { lang: ["Orange", "Laranja", "Jeruk"] },
                        { lang: ["Wine", "Vinho", "Anggur"] },
                        { lang: ["Pineapple", "Abacaxi", "Nanas"] },
                        { lang: ["Dragon Fruit", "Pitaia", "Buah naga"] },
                        { lang: ["Pear", "Pera", "Pir"] },
                        { lang: ["Guava", "Goiaba", "Jambu biji"] },
                        { lang: ["Watermelon", "Melancia", "Semangka"] },
                        { lang: ["Jackfruit", "Jaca", "Nangka"] },
                        { lang: ["Durian", "Durian", "Durian"], show: [false, false, true] },
                        { lang: ["Passion Fruit", "Maracuja", "Markisa"] }
                    ]
                },
                {
                    id: 3,
                    name: "Vegetables",
                    words: [
                        { lang: ["Salad", "Salada", "Salad"] },
                        { lang: ["Tomato", "Tomate", "Tomat"] },
                        { lang: ["Lettuce", "Alface", "Selada"] },
                        { lang: ["Cassava", "Mandioca", "Singkong"] },
                        { lang: ["Eggplant", "Berinjela", "Terong"] },
                        { lang: ["Cucumber", "Pepino", "Timun"] },
                        { lang: ["Potato", "Batata", "Kentang"] },
                        { lang: ["Carrot", "Cenoura", "Wortel"] },
                        { lang: ["Cauliflower", "Couve flor", "Kembang kol"] },
                        { lang: ["Cabbage", "Repolho", "Kubis"] },
                        { lang: ["Corn", "Milho", "Jagung"] }
                    ]
                } 
            ]
        },
        {
            id: 5,
            name: "Biology", icon: "fa-leaf",
            decks: [
                {
                    id: 0,
                    name: "Animals",
                    words: [
                        { lang: ["Dog", "Cachorro", "Anjing"] },
                        { lang: ["Cat", "Gato", "Kucing"] },
                        { lang: ["Bird", "Pássaro", "Burung"] },
                        { lang: ["Tiger", "Tigre", "Harimau"] },
                        { lang: ["Horse", "Cavalo", "Kuda"] },
                        { lang: ["Dragon", "Dragão", "Naga"] },
                        { lang: ["Elephant", "Elefante", "Gajah"] },
                        { lang: ["Duck", "Pato", "Bebek"] },
                        { lang: ["Monkey", "Macaco", "Monyet"] },
                        { lang: ["Crocodile", "Crocodilo", "Buaya"] },
                        { lang: ["Cow", "Vaca", "Sapi"] },
                        { lang: ["Chicken", "Galinha", "Ayam"] },
                        { lang: ["Pig", "Porco", "Babi"] },
                        { lang: ["Buffalo", "Bufalo", "Kerbau"] },
                        { lang: ["Gorilla", "Gorila", "Gorila"] },
                        { lang: ["Giraffe", "Girafa", "jerapah"] }
                    ]
                },
                {
                    id: 1,
                    name: "Body Level 1",
                    words: [
                        { lang: ["Head", "Cabeça", "Kepala"] },
                        { lang: ["Hair", "Cabelo", "Rambut"] },
                        { lang: ["Nose", "Nariz", "Hidung"] },
                        { lang: ["Eye", "Olho", "Mata"] },
                        { lang: ["Ear", "Orelha", "Telinga"] },
                        { lang: ["Neck", "Pescoço", "Leher"] },
                        { lang: ["Shoulder", "Ombro", "Bahu"] },
                        { lang: ["Chest", "Peito", "Dada"] },
                        { lang: ["Belly", "Barriga", "Perut"] },
                        { lang: ["Back", "Costas", "Kembali"] },
                        { lang: ["Arm", "Braço", "Lengan"] },
                        { lang: ["Finger", "Dedo", "Jari"] },
                        { lang: ["Leg", "Perna", "Kaki"] },
                        { lang: ["Foot", "Pé", "Telapak kaki"] }
                    ]
                },
                {
                    id: 2,
                    name: "Body Level 2",
                    words: [
                        { lang: ["Eyebrow", "Sombrancelha", "Alis"] },
                        { lang: ["Eyelashes", "Cilhos", "Bulu mata"] },
                        { lang: ["Cheek", "Bochecha", "Pipi"] },
                        { lang: ["Chin", "Queixo", "Dagu"] },
                        { lang: ["Moustache", "Bigode", "Kumis"] },
                        { lang: ["Elbow", "Cotovelo", "Siku"] },
                        { lang: ["Nail", "Unha", "Paku"] },
                        { lang: ["Butt", "Bunda", "Bokong"] },
                        { lang: ["Toe", "Dedo do pé", "Jari kaki"] },
                        { lang: ["Knee", "Joelho", "Lutut"] },
                        { lang: ["Thigh", "Coxa", "Paha"] },
                        { lang: ["Calf", "Panturrilha", "Betis"] },
                        { lang: ["Ankle", "Tornozelo", "Pergelangan kaki"] }
                    ]
                },
                {
                    id: 3,
                    name: "Relatives",
                    words: [
                        { lang: ["Son", "Filho", "Anak laki-laki"] },
                        { lang: ["Daughter", "Filha", "Anak Perampuan"] },
                        { lang: ["Sister", "Irmã", "Kakak Perampuan"], obs: [null, null, "Older"] },
                        { lang: ["Brother", "Irmão", "Adik Perampuan"], obs: [null, null, "Younger"], show: [false, false, true] },
                        { lang: ["Brother", "Irmão", "Kakak Laki-laki"], obs: [null, null, "Older"] },
                        { lang: ["Brother", "Irmão", "Adik Laki-laki"], obs: [null, null, "Younger"], show: [false, false, true] },
                        { lang: ["Saudara", "Irmãos", "Sibling"] },
                        { lang: ["Sibling-in-law", "Cunhado", "ipar"] },
                        { lang: ["Parents", "Pais", "Orang tua"] },
                        { lang: ["Parent-in-law", "Sogro", "Mertua"] },
                        { lang: ["Grandmother", "Pai", "Bapak"] },
                        { lang: ["Grandmother", "Mãe", "Ibu"] },
                        { lang: ["Grandchild", "Neto", "Cucu"] },
                        { lang: ["Grandfather", "Avô", "Kakek"] },
                        { lang: ["Grandmother", "Avó", "Nekek"] },
                        { lang: ["Great Grandchild", "Bisneto", "Cicit"] },
                        { lang: ["Boyfriend", "Namorado", "Pacar"] },
                        { lang: ["Wife", "Esposa", "Istri"] },
                        { lang: ["Husband", "Marido", "Suami"] },
                        { lang: ["Uncle", "Tio", "Paman"] },
                        { lang: ["Aunt", "Tia", "Bibi"] },
                        { lang: ["Cousin", "Primo", "Sepupu"] },
                        { lang: ["Friend", "Amigo", "Teman"] }
                    ]
                }
            ]
        }
    ];

    this.getWordAlbums = function () {
        return this.albums;
    };

    this.getLanguages = function () {
        return this.languages;
    }
});