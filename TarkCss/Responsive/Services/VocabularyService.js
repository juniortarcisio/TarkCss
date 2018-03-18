var LANGUAGE_EN_US = 0;
var LANGUAGE_PT_BR = 1;
var LANGUAGE_ID_ID = 2;

app.service('VocabularyService', function ($http, $q) {
 
    this.languages = new Array();

    this.languages[LANGUAGE_EN_US] = new Object();
    this.languages[LANGUAGE_EN_US].name = 'English';
    this.languages[LANGUAGE_EN_US].id = LANGUAGE_EN_US;

    this.languages[LANGUAGE_PT_BR] = new Object();
    this.languages[LANGUAGE_PT_BR].name = 'Portuguese';
    this.languages[LANGUAGE_PT_BR].id = LANGUAGE_PT_BR;

    this.languages[LANGUAGE_ID_ID] = new Object();
    this.languages[LANGUAGE_ID_ID].name = 'Bahasa';
    this.languages[LANGUAGE_ID_ID].id = LANGUAGE_ID_ID;

    //TODO: Gather all languages into a unique object??
    this.words = [
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
                }
                /*,
                {
                    name: "Drink",
                    words: [
                        { word: "Air putih", description: "Water" },
                        { word: "Susu", description: "Milk" },
                        { word: "Jus buah", description: "Fruits Juice" },
                        { word: "Jus jeruk", description: "Orange Juice" },
                        { word: "Jus mangga", description: "Mangga Juice" },
                        { word: "Teh", description: "Tea" },
                        { word: "Bir", description: "Beer" },
                        { word: "Anggur merah", description: "Wine" }
                    ]
                },
                {
                    name: "Fruits",
                    words: [
                        { word: "Mangga", description: "Mango" },
                        { word: "Apel", description: "Apple" },
                        { word: "Pisang", description: "Banana" },
                        { word: "Jeruk", description: "Orange" },
                        { word: "Nanas", description: "Pineapple" },
                        { word: "Buah naga", description: "Dragon Fruit" },
                        { word: "Pir", description: "Pear" },
                        { word: "Jambu biji", description: "Guava" },
                        { word: "Semangka", description: "Watermelon" },
                        { word: "Nangka", description: "Jackfruit" },
                        { word: "Durian", description: "Durian" },
                        { word: "Markisa", description: "Passion Fruit" }
                    ]
                },
                {
                    name: "Vegetables",
                    words: [
                        { word: "Salad", description: "Salad" },
                        { word: "Tomat", description: "Tomato" },
                        { word: "Selada", description: "Lettuce" },
                        { word: "Singkong", description: "Cassava" },
                        { word: "Wortel", description: "Carrot" },
                        { word: "Terong", description: "Eggplant" },
                        { word: "Timun", description: "Cucumber" },
                        { word: "Kentang", description: "Potato" }
                    ]
                } */
            ]
        }
        /*,
        {
            name: "Places", icon: "fa-map",
            wordSubGroups: [
                {
                    name: "Directions",
                    words: [
                        { word: "Utara", description: "North" },
                        { word: "Timur", description: "East" },
                        { word: "Selatan", description: "South" },
                        { word: "Barat", description: "West" },
                        { word: "Depan", description: "Ahead" },
                        { word: "Kiri", description: "Left" },
                        { word: "Belakang", description: "Behind" },
                        { word: "Kanan", description: "Right" },
                        { word: "Dekat", description: "Near" },
                        { word: "Jauh", description: "Far" }
                    ]
                },
                {
                    name: "Geography",
                    words: [
                        { word: "Alamat", description: "Address" },
                        { word: "Jalan", description: "Street" },
                        { word: "Jalan Raya", description: "Highway" },
                        { word: "Lingkungan", description: "Neighborhood" },
                        { word: "Kota", description: "City" },
                        { word: "Propinsi", description: "Province" },
                        { word: "Negara", description: "Country" },
                        { word: "Benua", description: "Continent" },
                        { word: "Planet", description: "Planet" }
                    ]
                },
                {
                    name: "Housing",
                    words: [
                        { word: "Rumah", description: "House" },
                        { word: "Apartemen", description: "Apartment" },
                        { word: "Kamar mandi", description: "Bathroom" },
                        { word: "Kamar kecil", description: "Restroom" },
                        { word: "Kamar tidur", description: "Bedroom" },
                        { word: "Ruang tamu", description: "Guest room" },
                        { word: "Ruang keluarga", description: "Living room" }
                    ]
                }
            ]
        },
        {
            name: "Mathematics", icon: "fa-calculator",
            wordSubGroups: [
                {
                    name: "Basic Numbers",
                    words: [
                        { word: "Satu", description: "One" },
                        { word: "Dua", description: "Two" },
                        { word: "Tiga", description: "Three" },
                        { word: "Empat", description: "Four" },
                        { word: "Lima", description: "Five" },
                        { word: "Enam", description: "Six" },
                        { word: "Tujuh", description: "Seven" },
                        { word: "Delapan", description: "Eight" },
                        { word: "Sembilan", description: "Nine" },
                        { word: "Sepuluh", description: "Teen", important: true  },
                        { word: "Sebelas", description: "Eleven"},
                        { word: "Dua belas", description: "Twelve" },
                        { word: "Tiga belas", description: "Thirteen" },
                        { word: "Empat belas", description: "Fourteen" },
                        { word: "Lima belas", description: "Fifteen" },
                        { word: "Enam belas", description: "Sixteen" },
                        { word: "Tujuh belas", description: "Seventeen" },
                        { word: "Delapan belas", description: "Eightteen" },
                        { word: "Sembilan belas", description: "Nineteen" },
                        { word: "Dua Puluh", description: "Twenty", important: true },
                        { word: "Tiga Puluh", description: "Thirty" },
                        { word: "Empat Puluh", description: "Fourty" },
                        { word: "Lima Puluh", description: "Fifty" },
                        { word: "Seratus", description: "One Hundred", important: true },
                        { word: "Dua Ratus", description: "Two Hundred" },
                        { word: "Tiga Ratus", description: "Three Hundred" },
                        { word: "Seribu", description: "One Thousand", important: true  },
                        { word: "Dua Ribu", description: "Two Thousand" },
                        { word: "Tiga Ribu", description: "Three Thousand" },
                        { word: "Satu Juta", description: "One Million", important: true },
                        { word: "Dua Juta", description: "Two Million" },
                        { word: "Tiga Juta", description: "Three Million" },
                        { word: "Satu Miliar", description: "One Billion", important: true },
                        { word: "Dua Miliar", description: "Two Billion" },
                        { word: "Tiga Miliar", description: "Three Billion" },
                        { word: "Satu Triliun", description: "One Trillion", important: true },
                        { word: "Dua Triliun", description: "Two Trillion" },
                        { word: "Tiga Triliun", description: "Three Trillion" }
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
                        { word: "Anjing", description: "Dog" },
                        { word: "Kucing", description: "Cat" },
                        { word: "Burung", description: "Bird" },
                        { word: "Harimau", description: "Tiger" },
                        { word: "Kuda", description: "Horse" },
                        { word: "Naga", description: "Dragon" },
                        { word: "Gajah", description: "Elephant" },
                        { word: "Bebek", description: "Duck" },
                        { word: "Monyet", description: "Monkey" },
                        { word: "Buaya", description: "Crocodile" },
                        { word: "Sapi", description: "Cow" },
                        { word: "Ayam", description: "Chicken" },
                        { word: "Babi", description: "Pig" },
                        { word: "Kerbau", description: "Buffalo" },
                        { word: "Gorila", description: "Gorilla" },
                        { word: "jerapah", description: "Giraffe" }
                    ]
                }
            ]
        },
        {
            name: "General", icon: "fa-archive",
            wordSubGroups : [
                {
                    name: "Colors",
                    words: [
                        { word: "Biru", description: "Blue" },
                        { word: "Merah", description: "Red" },
                        { word: "Kuning", description: "Yellow" },
                        { word: "Hijau", description: "Green" },
                        { word: "Putih", description: "White" },
                        { word: "Hitam", description: "Black" },
                        { word: "Ungu", description: "Purple" },
                        { word: "Oranye", description: "Orange" },
                        { word: "Coklat", description: "Brown" },
                        { word: "Merah muda", description: "Pink" },
                        { word: "Abu-abu", description: "Grey" }
                    ]
                }
            ]
        } */
    ];

    this.getWords = function () {
        return this.words;
    };

    this.getLanguages = function () {
        return this.languages;
    }
});