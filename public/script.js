// Function to get attribute names for a given layer
function getAttributeNames(layerName) {
    switch (layerName) {
        case 'Hostels':
            return ['Gender', 'Name', 'Room_Capacity', 'id', 'Floors'];
        case 'Offices':
            return ['Name', 'Services', 'Working_Days', 'Working_Hours'];
        case 'Playground':
            return ['Attribute1_Playground', 'Attribute2_Playground', 'Attribute3_Playground'];
        case 'Parking':
            return ['name'];
        case 'NewTutionBlock':
            return ['Name', 'Capacity', 'Purpose', 'Floor'];
        case 'NewLibrary':
            return ['Name', 'Capacity', 'Purpose', 'Floor'];
        case 'LectureHalls':
            return ['Name', 'Capacity', 'Purpose', 'Floor'];
        case 'Roads':
            return ['Type'];
        case 'UtilitiesLineFeatures':
            return ['Type'];
        case 'UtilitiesPointFeatures':
            return ['Type'];
        case 'UtilitiesPolygonFeatures':
            return ['Type'];
        case 'Vegetation':
            return ['Type'];
        case 'Agriculture':
            return ['Type'];
        case 'Hospitals':
            return ['Name', 'Capacity', 'Services', 'Location'];
        default:
            return []; // Return empty array if layer name is not recognized
    }
}

// Function to populate the attribute names based on the selected layer
function populateAttributes() {
    const layerSelect = document.getElementById('layerSelect');
    const attributeSelect = document.getElementById('attributeName');
    const selectedLayer = layerSelect.value;

    // Clear the existing options
    attributeSelect.innerHTML = '';

    // Get attribute names for the selected layer
    const attributes = getAttributeNames(selectedLayer);

    // Populate the attribute dropdown
    attributes.forEach(attribute => {
        const option = document.createElement('option');
        option.value = attribute;
        option.textContent = attribute;
        attributeSelect.appendChild(option);
    });
}

// Function to update attributes when layer selection changes
function updateAttributes() {
    const layerSelect = document.getElementById('layerSelect');
    const selectedLayer = layerSelect.value;

    // Populate attributes based on the selected layer
    if (selectedLayer) {
        populateAttributes();
    }
}

// Add event listener to populate attributes when the layer is changed
document.getElementById('layerSelect').addEventListener('change', updateAttributes);

// Initialize the map and set the default view to a specific location
const map = L.map('map').setView([-0.00613, 34.60307], 16); // Default location (near Nairobi)

// Add a base layer to the map (OpenStreetMap)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

// Define a layer control object to manage all the layers
const layerControl = L.control.layers().addTo(map);

// Function to style GeoJSON data with fixed colors based on layer name
function getFeatureStyle(layerName) {
    const colorMap = {
        'Hostels': '#FF5733',
        'Offices': '#33FF57',
        'Playground': '#3357FF',
        'Parking': '#FFFF33',
        'NewTutionBlock': '#FF33A1',
        'NewLibrary': '#FF8C33',
        'LectureHalls': '#FF33C1',
        'Roads': '#A1FF33',
        'UtilitiesLineFeatures': '#A133FF',
        'UtilitiesPointFeatures': '#FF33C1',
        'UtilitiesPolygonFeatures': '#33C1FF',
        'Vegetation': '#C1FF33',
        'Agriculture': '#FF33A1',
        'Hospitals': '#FF5733'
    };

    return function (feature) {
        const layerColor = colorMap[layerName] || '#000000'; // Default to black if layer name not recognized
        return {
            color: layerColor,
            weight: 2,
            opacity: 0.8,
            fillColor: layerColor,
            fillOpacity: 0.9
        };
    };
}

// Function to add GeoJSON data to the map with a unique color per layer
function addLayerToMap(data, layerName) {
    const geojsonLayer = L.geoJSON(data, {
        style: getFeatureStyle(layerName),
        onEachFeature: function (feature, layer) {
            const properties = feature.properties;
            let popupContent = '<strong>Feature Details:</strong><br>';
            for (const key in properties) {
                if (properties.hasOwnProperty(key)) {
                    popupContent += `${key}: ${properties[key]}<br>`;
                }
            }
            layer.bindPopup(popupContent);
        }
    });

    geojsonLayer.addTo(map);
    layerControl.addOverlay(geojsonLayer, layerName);
}

// Function to convert fetched data to GeoJSON format
function convertToGeoJSON(data) {
    return {
        type: "FeatureCollection",
        features: data.map(item => ({
            type: "Feature",
            properties: {
                Name: item.Name,
                ...item // Spread operator to include all properties
            },
            geometry: item.geom // This should be in valid GeoJSON format
        })).filter(feature => feature.geometry) // Ensure only features with geometry are included
    };
}

// Function to fetch data from the API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        return convertToGeoJSON(data);
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
}

// Create a routing control variable
let routingControl;

// Function to get the user's current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            L.marker(userLocation).addTo(map).bindPopup('You are here').openPopup();
            map.setView(userLocation, 13); // Zoom in on user's location

            // Store user's location for later use
            window.userLocation = userLocation;
        }, () => {
            alert('Geolocation not available or permission denied.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Fetch destination names and coordinates from the backend
axios.get('/api/NameSearch')
    .then(response => {
        const destinationsData = response.data;

        // Create an object to store destinations by name for quick lookup
        const destinations = {};
        destinationsData.forEach(item => {
            // Assuming geom is in GeoJSON Point format { type: "Point", coordinates: [lon, lat] }
            const { Name } = item;
            const [lon, lat] = item.geom.coordinates;
            destinations[Name] = [lat, lon]; // Store as [lat, lon]
        });

        // Populate the dropdown with destination names
        const destinationSelector = document.getElementById('destinationSelector');
        Object.keys(destinations).forEach(Name => {
            const option = document.createElement('option');
            option.value = Name;
            option.textContent = Name;
            destinationSelector.appendChild(option);
        });

        // Calculate and display the route when button is clicked
        document.getElementById('calculateRoute').addEventListener('click', () => {
            const selectedDestination = destinationSelector.value;

            // Validate input
            if (!selectedDestination || !window.userLocation) {
                alert('Please select a destination and ensure your location is available.');
                return;
            }

            const destinationCoords = destinations[selectedDestination];
            if (!destinationCoords) {
                alert('Invalid destination selected.');
                return;
            }

            // Remove existing routing control if it exists
            if (routingControl) {
                map.removeControl(routingControl);
            }

            // Create and display the route from the user's location to the selected destination
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(window.userLocation[0], window.userLocation[1]), // User's location
                    L.latLng(destinationCoords[0], destinationCoords[1]) // Selected destination
                ],
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1' // Correct OSRM routing service URL
                }),
                showAlternatives: false,
                lineOptions: {
                    styles: [{ color: 'blue', weight: 4 }] // Style for the route line
                }
            }).addTo(map);

            // Handle routing errors
            routingControl.on('routeerror', function(err) {
                console.error('Routing error:', err);
                alert('An error occurred while calculating the route: ' + err.message);
            });
        });
    })
    .catch(error => console.error('Error fetching destination data:', error));


// Function to load all layers when the page loads
async function loadAllLayers() {
    const layers = [
        { name: 'Hostels', url: '/api/Hostels' },
        { name: 'Offices', url: '/api/Offices' },
        { name: 'Lecture Halls', url: '/api/LectureHalls' },
        { name: 'New Library', url: '/api/NewLibrary' },
        { name: 'New Tuition Block', url: '/api/NewTutionBlock' },
        { name: 'Boardroom', url: '/api/Boardroom' },
        { name: 'Laboratory', url: '/api/Laboratory' },
        { name: 'Hospitals', url: '/api/Hospital' }
    ];

    for (const layer of layers) {
        const layerData = await fetchData(layer.url);
        if (layerData) {
            addLayerToMap(layerData, layer.name);
        }
    }
}

// Function to query attributes based on user input and display results in a table
async function queryAttributes() {
    const layer = document.getElementById('layerSelect').value;
    const attribute = document.getElementById('attributeName').value;
    const operator = document.getElementById('operator').value;
    const value = document.getElementById('attributeValue').value;

    // Create the URL for querying
    const queryUrl = `/api/${layer}?filters=[{"attribute": "${attribute}", "operator": "${operator}", "value": "${value}"}]`;
    
    const queriedData = await fetchData(queryUrl); // Fetch the filtered data

    if (queriedData) {
        addLayerToMap(queriedData, `${layer} Query Results`); // Add the queried data to the map
        displayQueryResults(queriedData.features); // Display the queried features in a table
    }
}

// Function to display queried features in a table
function displayQueryResults(features) {
    const resultsTable = document.getElementById('queryResultsTable');
    resultsTable.innerHTML = ''; // Clear existing results

    // Create table header
    const headerRow = document.createElement('tr');
    const headers = Object.keys(features[0].properties); // Use properties keys for headers
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    resultsTable.appendChild(headerRow); // Append header row

    // Create rows for each feature
    features.forEach(feature => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = feature.properties[header]; // Add property value to cell
            row.appendChild(td); // Append cell to row
        });
        resultsTable.appendChild(row); // Append row to table
    });
}

// Add event listener to the submit button for querying
document.getElementById('submitQuery').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    queryAttributes(); // Call the query function
});

// Load all layers when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadAllLayers(); // Load other layers when the page is ready
});

// Initialize the application
getCurrentLocation();