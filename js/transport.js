mapboxgl.accessToken =
    'pk.eyJ1IjoiZWxsaW90aGlsbCIsImEiOiJja2VrbGJseTAxczgxMnJudnZxNW91eXZ6In0.-HmRiD08l4m8C9kgK5bJcw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/elliothill/ckgjdav8h0ztc19o2419r65px'
});

map.on('load', function () {

    // add source and layer for bus routes
    map.addSource('Bus Routes', {
        type: 'vector',
        url: 'mapbox://elliothill.25dgr12j'
    });
    map.addLayer({
        'id': 'Bus Routes',
        'type': 'line',
        'source': 'Bus Routes',
        'layout': {
            // make layer visible by default
            'visibility': 'visible'
        },
        'source-layer': 'data4345970732658802463-1qehjy',
        'paint': {
            'line-color': '#e788c3',
            'line-width': 2
        }
    });

    // add source and layer for bicycle network
    map.addSource('Bicycle Network', {
        type: 'vector',
        url: 'mapbox://elliothill.b8u9ejpy'
    });
    map.addLayer({
        'id': 'Bicycle Network',
        'type': 'line',
        'source': 'Bicycle Network',
        'layout': {
            // make layer visible by default
            'visibility': 'visible'
        },
        'source-layer': 'data5004487426581307358-1fkxqh',
        'paint': {
            'line-color': '#66c2a5',
            'line-width': 1.5
        }
    });

    // add source and layer for train routes
    map.addSource('Train Routes', {
        type: 'vector',
        url: 'mapbox://elliothill.1idmdns2'
    });
    map.addLayer({
        'id': 'Train Routes',
        'type': 'line',
        'source': 'Train Routes',
        'layout': {
            // make layer visible by default
            'visibility': 'visible'
        },
        'source-layer': 'data5261580581519027078-4cpm4p',
        'paint': {
            'line-color': '#fc8d62',
            'line-width': 4
        }
    });

    // add source and layer for tram routes
    map.addSource('Tram Routes', {
        type: 'vector',
        url: 'mapbox://elliothill.06d9fonr'
    });
    map.addLayer({
        'id': 'Tram Routes',
        'type': 'line',
        'source': 'Tram Routes',
        'layout': {
            // make layer visible by default
            'visibility': 'visible'
        },
        'source-layer': 'data5001997356531321770-2nhfqu',
        'paint': {
            'line-color': '#8da0cb',
            'line-width': 3
        }
    });

});

// enumerate ids of the layers
var toggleableLayerIds = ['Bicycle Network', 'Bus Routes', 'Tram Routes', 'Train Routes'];

// set up the corresponding toggle button for each layer
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        // toggle layer visibility by changing the layout object's visibility property
        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}