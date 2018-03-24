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

    this.languages[LANGUAGE_PT_BR] = new Object();
    this.languages[LANGUAGE_PT_BR].name = 'Portuguese';
    this.languages[LANGUAGE_PT_BR].id = LANGUAGE_PT_BR;
    this.languages[LANGUAGE_PT_BR].flag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRDhGOEMxMTE3NzIxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRDhGOEMxMjE3NzIxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJEOEY4QzBGMTc3MjExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJEOEY4QzEwMTc3MjExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TFbakQAABKdJREFUeNq8ll1sU2UYx3+n7en6uZVa1oGDwtYxnCw0EhiCxjgjH14oiV6Ampj4GRONRpQ4ZZEYvTAhwSxGjRFilO2GDy8gZuEGTAS2xUHmBvuAuVG70U0o++ranq6tz2mHc8YB48KTnL7pec/7/p////k/z3kV6h4ZAJz8v9e4SX4Wz3uZkoGEFWQgL343wE6Djj4vwJTEOpHPA64/qXIPw6Qj90yfmwdjw529N72pDjJlYufybloD52gKnOfDkk55ZpQ55+x3b8dBcjx2yxzrTJJmiFtYt2CIH9adY0VJCq5PY3ggeEXhueY1/HK9SKRPgFnujHJLxnMD64D6YmFpMCX4pOQSNRuvQKeRfYeqaOv2kpa4K/3DvPd0CwQ09p1ZQs3lMhJJG1gnwJCeK4A5gLPmsWSZbiocoK60i/LKGCe/9/HMru1Eki5MJNG3TGLGbR6j/tMjbHmpm76OPN7qXcmxcDGoU6JA7L/Ax41sXVaje3OGpeQr6qTAEqOu7AKf+3vw+KY4edBF9c7XUdIKRWoILX0VG2N4raPEkk72n6ii2tdD4OEIO8xDlNjHOT1ewGS0AEzJHHv+DkCbYayDxkWitIEdi4LsW96F1y4Ri2K4TRxsq+NseDXL3EFsihOTptLRc4X2kyEutPZzjWKqK4Y40XAAY1L2kvgjk0Z29pfz3eDSHKg1epP9DGNFSmKVbYKvy9rZXdKPQ0mTEJWMLujtdPPlkScYutjDxeYQkXCUPNWE11/A5h2VrKpeQrhjkKZujSfX9LO4YpK4mM9pzrCtSMrOHuGikBrWLGRydaSZssOUSrGq0bT6LPYFZB0bE2UMEpySD6FwHocOt4mBY7icZnpbhvkx+SsWye8Kv5fHX72f3Q1bqf8mTGjwOGt0frI2Jua2agi3CJtdzfhbH6JPwHXpc8DGKa6mjGzqWEvtkl62FEawSlrisghpTIWuKL4FThxWG+lUFNVqodCejyqsB4IR9u5qJFDp5/nabWzwecgMhciI2lapQomNU0EXe4KlhISgjqVfhpummjKmODPiYetvVbzSeR/jkmuL9AvxD+WrR6RsBgjd8OB2W9CSKWFkkFvBas9j+T0uLrRbOFa7n4X2ThTJr742LuBvdpXzaNt6fr5RSFI32HSHm+lcmenkSwP49o9Syls30jDozXrCKMO7LzQyGosRDOfjcJjErfHsnZ9vImNeKkG4eefln6BA9BUdj4YXslL2+KJ/hbDWcnv/45pdTjqKHpGAT4gZjg4V0x6zUpUeIfDYCGvdA9QfLyU46mE8qnJtTCUkKtnUNF99cICnXuxhsE/lte4Kai9XMJoSne0T0yxn1bJ2684lchNziIMn2VvWwxsPSu7OW/i4YT0dl4qkYyqU+8LUbG/CsSHG/pZFvN21komEHWzC0JCaZ+f6dwCaCJLIo9ozSP36cxRJUyI83asXwY2r8OzZAI3D94qsydyn8q579Rx9WzoHe3yX+cjfl5367Hcf7/eXSe+UMrHpsqZvBzoP4FlfKjV7CNjoDaHK/1Pig+zXSPrAHQDOOoHc+bFH39gkdaiOcfq6N2cYneXNuXmcQP4SYAD5sNLFPECeSAAAAABJRU5ErkJggg==";

    this.languages[LANGUAGE_ID_ID] = new Object();
    this.languages[LANGUAGE_ID_ID].name = 'Bahasa';
    this.languages[LANGUAGE_ID_ID].id = LANGUAGE_ID_ID;
    this.languages[LANGUAGE_ID_ID].flag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMEUwNDkxMDE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMEUwNDkxMTE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRTA0OTBFMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAwRTA0OTBGMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+D76wCAAAAG9JREFUeNpiPCeo9pSBgUEKiD8z0AfwAvEzFiiDAYmmi+VMDAMERi0etZhmgOXP+w8DYzGbtOQ/KPsfHUP5H+Of9x/fAxkCQPyXThYzA/EHFmYBPmYkAXoB5tHsNGrxqMXUK7mgTR5eOjd9PgMEGACLNBM7Kx9mIgAAAABJRU5ErkJggg==";

    this.words = [
        {
            name: "Basic Words", icon: "fa-archive",
            wordSubGroups: [
                {
                    name: "Subjects",
                    words: [
                        ["I", "Eu", "Saya"],
                        ["You", "Você", "Kamu"],
                        ["He", "Ele", "Dia"],
                        ["She", "Ela", "Dia"],
                        ["They", "Eles", "Mereka"],
                        ["This", "Este", "Ini"],
                        ["That", "Este", "Itu"],
                        ["We", "Nós", "Kami"]
                    ]
                },
                {
                    name: "Questions",
                    words: [
                        ["What", "O que", "Apa"],
                        ["Who", "Quem", "Siapa"],
                        ["Where", "Onde", "Di mana"],
                        ["When", "Quando", "Kapan"],
                        ["How", "Como", "Bagaimana"],
                        ["How long", "Quanto tempo", "Berapa lama"],
                        ["How much", "Quanto", "Berapa banyak"],
                        ["How much does it cost", "Quanto custa", "Berapa harganya"],
                        ["How far", "Quão longe", "Berapa Jauh"]
                    ]
                },
                {
                    name: "Modal Verbs",
                    words: [
                        ["Can", "Posso", "Bisa"],
                        ["Could", "Poderia", "Bisa"],// Polite thisWordAlsoMeans: [][][0]
                        ["Will", "Vou", "Akan"],
                        ["Would", "Iria", "Akan (?)"], //Hypotetical / polite, would you like -> gostaria
                        ["Must", "Devo", "Harus"],
                        ["Should", "Deveria", "Harus (?)"],
                        ["May", "Posso(?)", "Harus (?)"]
                    ]
                },
                {
                    name: "Key Words",
                    words: [
                        ["For", "Para", "Untuk"],
                        ["But", "Mas", "Tapi"],
                        ["If", "Se", "Kalau"],
                        ["Then", "Então", "Kemudian"]
                    ]
                },
                {
                    name: "Colors",
                    words: [
                        ["Blue", "Azul", "Biru"],
                        ["Red", "Vermelho", "Merah"],
                        ["Yellow", "Amarelo", "Kuning"],
                        ["Green", "Verde", "Hijau"],
                        ["White", "Branco", "Putih"],
                        ["Black", "Preto", "Hitam"],
                        ["Purple", "Roxo", "Ungu"],
                        ["Orange", "Laranja", "Oranye"],
                        ["Brown", "Marrom", "Coklat"],
                        ["Pink", "Rosa", "Merah muda"],
                        ["Grey", "Cinza", "Abu-abu"]
                    ]
                }
            ]
        },
        {
            name: "Basic Actions", icon: "fa-leaf",
            wordSubGroups: [
                {
                    name: "Basic 1",
                    words: [
                        ["To Walk", "Andar", "Berjalan"],
                        ["To Talk", "Falar", "Berbicara"],
                        ["To Go", "Ir", "Pergi"],
                        ["To Wait", "Esperar", "Menunggu"],
                        ["To Ask", "Perguntar", "Bertanya"],
                        ["To Eat", "Comer", "Makan"],
                        ["To Drink", "Beber", "Minum"],
                        ["To Work", "Trabalhar", "Bekerja"],
                        ["To Study", "Estudar", "Belajar"],
                        ["To Play", "Jogar", "Bermain"],
                        ["To Like", "Gostar", "Suka"]
                    ]
                }
            ]
        },
        {
            name: "Mathematics & Time", icon: "fa-calculator",
            wordSubGroups: [
                {
                    name: "Basic Numbers",
                    words: [
                        ["One", "Um", "Satu"],
                        ["Two", "Dois", "Dua"],
                        ["Three", "Três", "Tiga"],
                        ["Four", "Quartro", "Empat"],
                        ["Five", "Cinco", "Lima"],
                        ["Six", "Seis", "Enam"],
                        ["Seven", "Sete", "Tujuh"],
                        ["Eight", "Oito", "Delapan"],
                        ["Nine", "Nove", "Sembilan"],
                        ["Teen", "Dez", "Sepuluh"],
                        ["Eleven", "Onze", "Sebelas"],
                        ["Twelve", "Doze", "Dua belas"],
                        ["Thirteen", "Treze", "Tiga belas"],
                        ["Fourteen", "Quatorze", "Empat belas"],
                        ["Fifteen", "Quinze", "Lima belas"],
                        ["Sixteen", "Dezesseis", "Enam belas"],
                        ["Seventeen", "Dezessete", "Tujuh belas"],
                        ["Eightteen", "Dezoito", "Delapan belas"],
                        ["Nineteen", "Dezenove", "Sembilan belas"],
                        ["Twenty", "Vinte", "Dua Puluh"],
                        ["Thirty", "Trinta", "Tiga Puluh"],
                        ["Fourty", "Quarenta", "Empat Puluh"],
                        ["Fifty", "Cinquenta", "Lima Puluh"],
                        ["One Hundred", "Cem", "Seratus"],
                        ["Two Hundred", "Duzentos", "Dua Ratus"],
                        ["Three Hundred", "Trezentos", "Tiga Ratus"],
                        ["One Thousand", "Mil", "Seribu"],
                        ["Two Thousand", "Dois Mil", "Dua Ribu"],
                        ["Three Thousand", "Três Mil", "Tiga Ribu"],
                        ["One Million", "Um Milhão", "Satu Juta"],
                        ["Two Million", "Dois Milhões", "Dua Juta"],
                        ["Three Million", "Três Milhões", "Tiga Juta"],
                        ["One Billion", "Um Bilhão", "Satu Miliar"],
                        ["Two Billion", "Dois Bilhões", "Dua Miliar"],
                        ["Three Billion", "Três Bilhões", "Tiga Miliar"],
                        ["One Trillion", "Um Trilhão", "Satu Triliun"],
                        ["Two Trillion", "Dois Trilhões", "Dua Triliun"],
                        ["Three Trillion", "Três Trilhões", "Tiga Triliun"]
                    ]
                },
                {
                    name: "Ordinal Numbers",
                    words: [
                        ["First", "Primeiro", "Pertama"],
                        ["Second", "Segundo", "Kedua"],
                        ["Third", "Terceiro", "Ketiga"],
                        ["Fourth", "Quarto", "Keempat"],
                        ["Fifth", "Quinto", "Kelima"],
                        ["Sixth", "Sexto", "Keenam"],
                        ["Seventh", "Setimo", "Ketujuh"],
                        ["Eighth", "Oitavo", "Kedelapan"],
                        ["Ninth", "Nono", "Kesembilan"],
                        ["Tenth", "Décimo", "Kesepuluh"]
                    ]
                },
                {
                    name: "Ocurrencies",
                    words: [
                        ["Once", "Uma Vez", "Satu Kali"],
                        ["Twice", "Duas Vezes", "Dua Kali"],
                        ["Three Times", "Três Vezes", "Tiga Kali"]
                    ]
                },
                {
                    name: "Fractions",
                    words: [
                        ["Half", "Metade", "Setengah"],
                        ["One Third", "Um terço", "Sepertiga"],
                        ["One Quarter", "Um Quarto", "Seperempat"]
                    ]
                },
                {
                    name: "Time",
                    words: [
                        ["Second", "Segundo", "Kedua"],
                        ["Minute", "Minuto", "Menit"],
                        ["Hour", "Hora", "Waktu"],
                        ["Morning", "Manhã", "Pagi"],
                        ["Afternoon", "Tarde", "Siang"],
                        ["Evening", "Anoitecer", "Sore"],
                        ["Night", "Noite", "Sore"],
                        ["Day", "Dia", "Hari"],
                        ["Week", "Semana", "Minggu"],
                        ["Month", "Mês", "Bulan"],
                        ["Year", "Ano", "Tahun"]
                    ]
                }
            ]
        },
        {
            name: "Places & Directions", icon: "fa-map",
            wordSubGroups: [
                {
                    name: "Directions",
                    words: [
                        ["North", "Norte", "Utara"],
                        ["East", "Leste", "Timur"],
                        ["South", "Sul", "Selatan"],
                        ["West", "Oeste", "Barat"],
                        ["Ahead", "Frente", "Depan"],
                        ["Left", "Esquerda", "Kiri"],
                        ["Behind", "Atrás", "Belakang"],
                        ["Right", "Direita", "Kanan"],
                        ["Near", "Perto", "Dekat"],
                        ["Far", "Longe", "Jauh"]
                    ]
                },
                {
                    name: "Geography",
                    words: [
                        ["Address", "Endereço", "Alamat"],
                        ["Street", "Rua", "Jalan"],
                        ["Highway", "Rodovia", "Jalan Raya"],
                        ["Neighborhood", "Bairro", "Lingkungan"],
                        ["City", "Cidade", "Kota"],
                        ["Province", "Província", "Propinsi"],
                        ["State", "Estado", "Negarabagian"],
                        ["Country", "País", "Negara"],
                        ["Continent", "Continente", "Benua"],
                        ["Planet", "País", "Planet"]
                    ]
                },
                {
                    name: "Housing",
                    words: [
                        ["House", "Casa", "Rumah"],
                        ["Apartment", "Apartamento", "Apartemen"],
                        ["Bathroom", "Banheiro", "Kamar mandi"],
                        ["Restroom", "Toalete", "Kamar kecil"],
                        ["Bedroom", "Quarto", "Kamar tidur"],
                        ["Living room", "Sala", "Ruang keluarga"]
                    ]
                }
            ]
        },
        {
            name: "Cousine", icon: "fa-coffee",
            wordSubGroups: [
                {
                    name: "Food",
                    words: [
                        ["Chicken Meat", "Carne de Frango", "Daging Ayam"],
                        ["Cow Meat", "Carne de Vaca", "Daging Sapi"],
                        ["Pork Meat", "Carne de Porco", "Daging Babi"],
                        ["Fried Fish", "Peixe Frito", "Ikan Goreng"],
                        ["Grilled", "Grelhado", "Bakar"],
                        ["Roasted", "Assado", "Panggang"],
                        ["Cooked", "Cozido", "Masak"],
                        //{ word: "Matang", description: "Cooked" }, create an array object on this situation??? and work on service interfaces?
                        ["Spicy", "Apimentado", "Pedas"],
                        ["Noodles", "Miojo", "Mi"],
                        ["Rice", "Arroz", "Nasi"]
                    ]
                },
                {
                    name: "Drink",
                    words: [
                        ["Water", "Água", "Air putih"],
                        ["Milk", "Leite", "Susu"],
                        ["Fruits Juice", "Suco de Frutas", "Jus buah"],
                        ["Orange Juice", "Suco de Laranja", "Jus jeruk"],
                        ["Mango Juice", "Suco de Manga", "Jus mangga"],
                        ["Tea", "Chá", "Teh"],
                        ["Beer", "Cerveja", "Bir"],
                        ["Wine", "Vinho", "Anggur merah"]
                    ]
                },
                {
                    name: "Fruits",
                    words: [
                        ["Mango", "Manga", "Mangga"],
                        ["Apple", "Maçã", "Apel"],
                        ["Banana", "Banana", "Pisang"],
                        ["Orange", "Laranja", "Jeruk"],
                        ["Wine", "Vinho", "Anggur"],
                        ["Pineapple", "Abacaxi", "Nanas"],
                        ["Dragon Fruit", "Pitaia", "Buah naga"],
                        ["Pear", "Pera", "Pir"],
                        ["Guava", "Goiaba", "Jambu biji"],
                        ["Watermelon", "Melancia", "Semangka"],
                        ["Jackfruit", "Jaca", "Nangka"],
                        ["Durian", "Durian", "Durian"],
                        ["Passion Fruit", "Maracuja", "Markisa"]
                    ]
                },
                {
                    name: "Vegetables",
                    words: [
                        ["Salad", "Salada", "Salad"],
                        ["Tomato", "Tomate", "Tomat"],
                        ["Lettuce", "Alface", "Selada"],
                        ["Cassava", "Mandioca", "Singkong"],
                        ["Eggplant", "Berinjela", "Terong"],
                        ["Cucumber", "Pepino", "Timun"],
                        ["Potato", "Batata", "Kentang"]
                    ]
                } 
            ]
        },
        {
            name: "Biology", icon: "fa-leaf",
            wordSubGroups: [
                {
                    name: "Animals",
                    words: [
                        ["Dog", "Cachorro", "Anjing"],
                        ["Cat", "Gato", "Kucing"],
                        ["Bird", "Pássaro", "Burung"],
                        ["Tiger", "Tigre", "Harimau"],
                        ["Horse", "Cavalo", "Kuda"],
                        ["Dragon", "Dragão", "Naga"],
                        ["Elephant", "Elefante", "Gajah"],
                        ["Duck", "Pato", "Bebek"],
                        ["Monkey", "Macaco", "Monyet"],
                        ["Crocodile", "Crocodilo", "Buaya"],
                        ["Cow", "Vaca", "Sapi"],
                        ["Chicken", "Galinha", "Ayam"],
                        ["Pig", "Porco", "Babi"],
                        ["Buffalo", "Bufalo", "Kerbau"],
                        ["Gorilla", "Gorila", "Gorila"],
                        ["Giraffe", "Girafa", "jerapah"]
                    ]
                }
            ]
        }
    ];

    this.getWords = function () {
        return this.words;
    };

    this.getLanguages = function () {
        return this.languages;
    }
});