{% include /javascript/headroom.js %}

// grab an element
var myElement = document.getElementsByClassName("main-header")[0];
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement);
// initialise
headroom.init();



