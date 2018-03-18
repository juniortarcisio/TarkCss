var LANGUAGE_EN_US = 0;
var LANGUAGE_PT_BR = 1;
var LANGUAGE_ID_ID = 2;

app.service('VocabularyService', function ($http, $q) {
 
    this.languages = new Array();

    this.languages[LANGUAGE_EN_US] = new Object();
    this.languages[LANGUAGE_EN_US].name = 'English';

    this.languages[LANGUAGE_PT_BR] = new Object();
    this.languages[LANGUAGE_PT_BR].name = 'Portuguese';

    this.languages[LANGUAGE_ID_ID] = new Object();
    this.languages[LANGUAGE_ID_ID].name = 'Bahasa Indonesian';

    //TODO: Gather all languages into a unique object??
    this.languages[LANGUAGE_ID_ID].words = [
        {
            name: "Cousine", icon: "fa-coffee",
            wordSubGroups: [
                {
                    name: "Food",
                    words: [
                        { word: "Daging Ayam", description: "Chicken Meat" },
                        { word: "Daging Sapi", description: "Cow Meat" },
                        { word: "Daging Babi", description: "Pork Meat" },
                        { word: "Bakar", description: "Grilled" },
                        { word: "Panggang", description: "Roasted" },
                        { word: "Masak", description: "Cooked" },
                        { word: "Matang", description: "Cooked" },
                        { word: "Pedas", description: "Spicy" },
                        { word: "Mi", description: "Noodles" }
                    ]
                },
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
                        { word: "Anggur", description: "Wine" }
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
                        { word: "Selada", description: "Lettuce" }
                    ]
                }
            ]
        },
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
                        { word: "Sepuluh belas", description: "Teenteen" },
                        { word: "Dua Puluh", description: "Twenty" },
                        { word: "Tiga Puluh", description: "Thirty" },
                        { word: "Empat Puluh", description: "Fourty" },
                        { word: "Lima Puluh", description: "Fifty" },
                        { word: "Ratus", description: "Hundred", important: true },
                        { word: "Seratus", description: "One Hundred" },
                        { word: "Dua Ratus", description: "Two Hundred" },
                        { word: "Tiga Ratus", description: "Three Hundred" },
                        { word: "Ribu", description: "Thousand", important: true },
                        { word: "Seribu", description: "One Thousand" },
                        { word: "Dua Ribu", description: "Two Thousand" },
                        { word: "Tiga Ribu", description: "Three Thousand" },
                        { word: "Juta", description: "Million", important: true },
                        { word: "Satu Juta", description: "One Million" },
                        { word: "Dua Juta", description: "Two Million" },
                        { word: "Tiga Juta", description: "Three Million" },
                        { word: "Miliar", description: "Billion", important: true },
                        { word: "Satu Miliar", description: "One Billion" },
                        { word: "Dua Miliar", description: "Two Billion" },
                        { word: "Tiga Miliar", description: "Three Billion" },
                        { word: "Triliun", description: "Trillion", important: true },
                        { word: "Satu Triliun", description: "One Trillion" },
                        { word: "Dua Triliun", description: "Two Trillion" },
                        { word: "Tiga Triliun", description: "Three Trillion" }
                    ]
                }
            ]
        }
    ];

    this.getWords = function (langId) {
        return this.languages[langId].words;
    };
});