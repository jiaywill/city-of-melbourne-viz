var viz = null;

function initPage() {
    initTableau();
}

function toggleView() {
    var sheetName = this.id.slice(0, -7);

    workbook = viz.getWorkbook();
    workbook.activateSheetAsync(sheetName);
}

function addVizButtons() {
    var buttonIds = ["cafe-restaurant-button", "other-poi-button"];
    var buttonHTML = ["Cafes and Restaurants", "Other Points of Interests"]

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

// initialize Tableau
function initTableau() {
    var containerDiv = document.getElementById("tableau-view"),
        url = "http://public.tableau.com/views/poi_16037227013350/cafe-restaurant",
        options = {
            hideTabs: true,
            onFirstInteractive: function () {
                // after tableau has finished loading
                console.log("Run this code when the viz has finished loading.");
                addVizButtons();
            }
        };

    viz = new tableau.Viz(containerDiv, url, options);
    // Create a viz object and embed it in the container div.
}

window.onload = initPage
