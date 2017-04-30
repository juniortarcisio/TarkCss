/// <reference path="E:\Projects\html-templates\html-templates\tarks.js" />

function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.2), zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}


var btn = document.getElementById("myBtn");
btn.onclick = function(event) {
    
    Tarks.MessageBox.Show(
        "You have successfully signed in",
        "Sign In",
        Tarks.MessageBox.Icons.Success
    );
}
