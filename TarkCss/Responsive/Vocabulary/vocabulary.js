app.controller('vocabularyCtrl', function ($scope, ServerService, SpeechService) {
    $scope.wordGrups = [
        {
            name: "Cousine", icon: "fa-coffee",
            wordSubGroups : [
                { 
                    name : "Food",
                    words : [
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
                        { word: "Milo", description: "Famous milk with chocolat brand" },
                        { word: "Jus buah", description: "Fruits Juice" },
                        { word: "Jus jeruk", description: "Orange Juice" },
                        { word: "Jus mango", description: "Mango Juice" },
                        { word: "Teh", description: "Tea" },
                        { word: "Bir", description: "Beer" },
                        { word: "Anggur", description: "Wine" }
                    ]
                },
                {
                    name: "Fruits",
                    words: [
                        { word: "Mango", description: "Mango" },
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
                        { word: "Selada ", description: "Lettuce" },
                        { word: "Saya mau makan sesuatu di hari ini, tapi saya tidak punya uang", description: "n/d" }
                    ]
                }
            ]
        },
        {
            name: "Places", icon: "fa-map",
            wordSubGroups : [
                { 
                    name: "Directions",
                    words : [
                        { word: "Utara", description: "North" },
                        { word: "Timur", description: "East" },
                        { word: "Selatan", description: "South" },
                        { word: "Barat", description: "West" }
                    ]
                },
                {
                    name: "Geography",
                    words: [
                        { word: "Jalam", description: "Street" },
                        { word: "Lingkungan", description: "Neighborhood" },
                        { word: "Kota", description: "City" },
                        { word: "Propinsi", description: "Province" },
                        { word: "Negara", description: "Country" }
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
        }
    ];

    $scope.lang = 'id-id'

    $scope.Speak = function (msg) {
        SpeechService.Speak(msg, $scope.lang);
    }

    $scope.SpeakSpaced = function (msg) {
        SpeechService.SpeakSpaced(msg, $scope.lang);
    }

});
