mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGppYXkiLCJhIjoiY2tldW1tbWhlMXFoaDJ3dDh0dThwem54bSJ9.dn0qAkslidLtWapkUsFMrg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/willjiay/ckg7zl39o19nd1apqwvp0lltk',
});
// all views
var views = document.getElementsByClassName("view");

map.on('load', function () {

});

map.addControl(new mapboxgl.NavigationControl());

// toggle view: only show the selected view and hide other views
function toggleView(e) {
    var viewId = this.id.slice(0, -7);

    for (i = 0; i < views.length; i++) {
        if (views[i].id === viewId) {
            views[i].style.display = "block";
        }
        else {
            views[i].style.display = "none";
        }
    }

    if (viewId === "mapbox-container") {
        var coordinates = [144.961485, -37.799451];
        map.setZoom(18);
        map.flyTo({
            center: coordinates,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    }
}

// initialize page
// add onclick events to view buttons
function initPage() {
    addVizButtons();

    // show the 3d model when the page finishes loading
    for (i = 0; i < views.length; i++) {
        if (views[i].id === "3d-model") {
            views[i].style.display = "block";
        }
        else {
            views[i].style.display = "none";
        }
    }
}

function addVizButtons() {
    var buttonIds = ["3d-model-button", "mapbox-container-button"];
    var buttonHTML = ["3D model", "Location"]

    // iterate each view button and add them to viz-buttons
    for (var i = 0; i < buttonIds.length; i++) {
        var button = document.createElement("button");
        button.className = "view-button btn btn-primary";
        button.id = buttonIds[i];
        button.innerHTML = buttonHTML[i];
        document.getElementById("viz-buttons").appendChild(button);
    }


    // add click event listeners
    var viewButtons = document.getElementsByClassName("view-button");

    for (i = 0; i < viewButtons.length; i++) {
        viewButtons[i].onclick = toggleView;
    }
}

window.onload = initPage

