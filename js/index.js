var img_index = 0;
carousel();

// src code referenced from https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_slideshow_rr
function carousel() {
    var i;
    var x = document.getElementsByClassName("slide-show");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    img_index++;
    if (img_index > x.length) { img_index = 1 }
    x[img_index - 1].style.display = "block";
    setTimeout(carousel, 2500); // Change image every 4 seconds
}