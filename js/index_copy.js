mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGppYXkiLCJhIjoiY2tldW1tbWhlMXFoaDJ3dDh0dThwem54bSJ9.dn0qAkslidLtWapkUsFMrg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/willjiay/ckeun5rb15tkv19mbbq4ap534/draft'
});
// all views
var views = document.getElementsByClassName("view");

map.on('load', function () {
    // the rest of the code goes in here
    var layers = ['Completed', 'Under Construction', 'Approved', 'Applied'];
    var colors = ['#b2df8b', '#339f04', '#1e77b3', '#a6cde3'];

    for (i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;
        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);

    }

    // the code from steps 5-10 below MUST go in here
    map.on('mousemove', function (e) {
        // the code from steps 5-10 below MUST go in here
        let buildinginfo = map.queryRenderedFeatures(e.point, {
            layers: ['development-activity-model-fo-1srs58']
        });

        if (buildinginfo.length > 0) {
            document.getElementById('info').innerHTML = '<p>' + buildinginfo[0].properties.status +
                '<p><em>' + buildinginfo[0].properties.address + '</em></p>';
        } else {
            document.getElementById('info').innerHTML = '<p>Hover over a shaded building for details.</p>';
        }

        // Change the icon to a pointer icon when you mouse over a building
        map.on('mouseenter', 'development-activity-model-fo-1srs58', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pan icon when it leaves.
        map.on('mouseleave', 'development-activity-model-fo-1srs58', function () {
            map.getCanvas().style.cursor = '';
        });


    });

    map.on('click', 'development-activity-model-fo-1srs58', function (e) {
        new mapboxgl.Popup()
            // the script in step 3 below must go in here 
            .setLngLat(e.lngLat)
            .setHTML('<h3>Development Key:</h3><p>' + e.features[0].properties.dev_key + '</p><h2>' + e.features[0].properties.status + '</h2>')
            .addTo(map);
    });

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

}

// initialize page
// add onclick events to view buttons
function initPage() {
    initTableau();

    // add click event listeners
    var viewButtons = document.getElementsByClassName("view-button");

    for (i = 0; i < viewButtons.length; i++) {
        viewButtons[i].onclick = toggleView;
    }

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
                console.log("Run this code when the viz has finished loading.");
            }
        };

    var viz = new tableau.Viz(containerDiv, url, options);
    // Create a viz object and embed it in the container div.
}

window.onload = initPage

