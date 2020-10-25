mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGppYXkiLCJhIjoiY2tldW1tbWhlMXFoaDJ3dDh0dThwem54bSJ9.dn0qAkslidLtWapkUsFMrg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/willjiay/ckg7zl39o19nd1apqwvp0lltk'
});
// all views
var views = document.getElementsByClassName("view");

map.on('load', function () {

});

// fly to melb uni
document.getElementById('uni-melb').addEventListener('click', function () {
    map.flyTo({
        center: [
            // longtitude then latitude
            144.961166, 
            -37.796368
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
});

// fly to monash uni
document.getElementById('uni-monash').addEventListener('click', function () {
    map.flyTo({
        center: [
            145.136215,
            -37.910522
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
});

map.addControl(new mapboxgl.NavigationControl());

// toggle view: only show the selected view and hide other views
function toggleView(e) {
    var viewId = this.id.slice(0, -7);
    // console.log(viewId);
    for (i = 0; i < views.length; i++) {
        if (views[i].id === viewId) {
            views[i].style.display = "block";
        }
        else {
            views[i].style.display = "none";
        }
    }

}

// initialize page
// add onclick events to view buttons
function initPage() {
    initTableau();

    // only show the mapbox page (hide other views)
    for (i = 0; i < views.length; i++) {
        if (views[i].id === "tableau-view") {
            views[i].style.display = "block";
        }
        else {
            views[i].style.display = "none";
        }
    }

}

// initialize Tableau
function initTableau() {
    var containerDiv = document.getElementById("tableau-view"),
        url = "http://public.tableau.com/views/submission_16020501528980/Dashboard",
        options = {
            hideTabs: true,
            onFirstInteractive: function () {
                // after tableau has finished loading
                console.log("Run this code when the viz has finished loading.");
                addVizButtons();
            }
        };

    var viz = new tableau.Viz(containerDiv, url, options);
    // Create a viz object and embed it in the container div.
}

function addVizButtons(){
    var button1 = document.createElement("button");
    button1.className = "view-button";
    button1.id = "mapbox-view-button"
    button1.innerHTML = "mapbox"
    document.getElementById("viz-buttons").appendChild(button1);
    
    var button2 = document.createElement("button");
    button2.className = "view-button";
    button2.id = "tableau-view-button"
    button2.innerHTML = "tableau"
	document.getElementById("viz-buttons").appendChild(button2);

    // add click event listeners
    var viewButtons = document.getElementsByClassName("view-button");

    for (i = 0; i < viewButtons.length; i++) {
        viewButtons[i].onclick = toggleView;
    }
}

window.onload = initPage

