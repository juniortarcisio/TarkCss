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
                },
                {
                    name: "Drink",
                    words: [
                        ["Water", "Água", "Air putih"],
                        ["Milk", "Leite", "Susu"],
                        ["Fruits Juice", "Suco de Frutas", "Jus buah"],
                        ["Orange Juice", "Suco de Laranja", "Jus jeru"],
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
            name: "Places", icon: "fa-map",
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
            name: "Mathematics", icon: "fa-calculator",
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
                        ["Horse", "Cavalho", "Kuda"],
                        ["Dragon", "Dragão", "Naga"],
                        ["Elephant", "Elefante", "Gajah"],
                        ["Duck", "Pato", "Bebek"],
                        ["Monkey", "Macao", "Monyet"],
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
        },
        {
            name: "General", icon: "fa-archive",
            wordSubGroups : [
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
        } 
    ];

    this.getWords = function () {
        return this.words;
    };

    this.getLanguages = function () {
        return this.languages;
    }
});