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

function addListener() {
    // fly to melb uni
    document.getElementById('uni-melb-button').addEventListener('click', function () {
        map.setZoom(17);
        map.flyTo({
            center: [
                // longtitude then latitude
                144.96130134414312,
                -37.7970796
            ],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        // change uni description
        changeUniDesc("University of Melbourne");
    });

    // fly to rmit uni
    document.getElementById('uni-rmit-button').addEventListener('click', function () {
        map.setZoom(17);
        map.flyTo({
            center: [
                144.963,
                -37.808
            ],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        // change uni description
        changeUniDesc("RMIT University");
    });
}

// change uni description
function changeUniDesc(uni) {
    var uniMelb = ["Founded in 1853", "52,475 students enrolled (2018)", "41st QS World University Ranking (2021)", 
                    "Top university for Computer Science & Information Systems; Dentistry; Law; etc. in Australia"];
    var uniRMIT = ["Founded in 1992", "87,465 students enrolled (2017)", "223rd QS World University Ranking (2021)",
                    "Top university for Art and Design in Australia"];
    var selected = null;  // selected uni  

    if (uni === "University of Melbourne") {
        selected = uniMelb;
    }
    else {
        selected = uniRMIT;
    }

    document.getElementById("uni-name").innerHTML = uni;
    liTags = document.getElementById("uni-description").getElementsByTagName("li");

    for (i = 0; i < uniMelb.length; ++i) {
        liTags[i].innerHTML = selected[i];
    } 

    // only show the enginnering building link when unimelb is selected
    engiPara = document.getElementById("engineer-building-p");
    if (uni === "University of Melbourne") {
        engiPara.style.display = "inline-block";
    }
    else {
        engiPara.style.display = "none";
    }
}

// initialize page
// add onclick events to view buttons
function initPage() {
    addUniButtons();
    addListener();
}

function addUniButtons() {
    var buttonIds = ["uni-melb-button", "uni-rmit-button"];
    var buttonHTML = ["University of Melbourne  ", "RMIT"]

    // iterate each view button and add them to viz-buttons
    for (var i = 0; i < buttonIds.length; i++) {
        var button = document.createElement("button");
        button.className = "view-button btn btn-primary";
        button.id = buttonIds[i];
        button.innerHTML = buttonHTML[i];
        document.getElementById("uni-buttons").appendChild(button);
    }
}

window.onload = initPage

