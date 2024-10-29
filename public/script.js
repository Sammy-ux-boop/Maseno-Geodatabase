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


document.addEventListener("DOMContentLoaded", () => {
    const headerElement = document.getElementById("rotatingHeader");

  // Define text options
const textOptions = [
    "Geosam Spatial Solution 🌍",
    "I followed my GPS, and it led me to a cornfield. Thanks, technology! 🌽😂",
    "GIS: Where 'Map It' is the answer to everything! 🗺️✨",
    "If you think adventure is dangerous, try mapping! 🧭😅",
    "I told my map to be quiet, but it just kept showing me the way. 🤫🗺️",
    "Not all who wander are lost… some are just looking for the nearest coffee shop. ☕️🗺️",
    "Why did the map break up with the GPS? It couldn’t handle the pressure of a long-distance relationship! 💔📍",
    "I took a wrong turn and ended up in a ‘No GPS Zone’. Never felt more lost! 🌀😳",
    "Why don't geographers play hide and seek? Because good luck hiding when you’re always being mapped! 🕵️‍♂️🗺️",
    "What did the map say to the GPS? 'You're so basic!' 😜🗺️📱",
    "Why did the geographer break up with the compass? Because it couldn’t find true north! 🧭❤️",
    "I asked my GPS for directions, and it just told me to 'go straight.' Apparently, it doesn't understand my life choices! 😂🗺️",
    "You can’t map out your life without a few wrong turns! 🚗🗺️",
    "I wanted to be a cartographer, but I couldn't find the right path! 😂🗺️",
    "Why did the GIS analyst bring a ladder to work? Because they wanted to reach new heights in mapping! 🪜🗺️",
    "Why was the geographer bad at poker? They kept revealing their hands! 🃏🗺️",
    "What do you call a geographer who lost their way? A lost cause! 🤷‍♂️🗺️",
    "What did one GIS say to another at the bar? 'Let’s raise our coordinates!' 🍻🗺️",
    "How does a GIS analyst communicate with their partner? They use spatial reasoning! 🗣️🗺️",
    "Why do geographers love their job? Because they get to map their way to success! 📈🗺️",
    "What do you get when you cross a GIS with a GPS? A geo-positioning solution! 🔍🗺️",
    "Why are maps so good at math? Because they can always find their way to the right answer! ➕🗺️",
    "What did the GIS analyst say to the lost tourist? 'Let me put you on the map!' 🗺️🤭",
    "Why did the road get a promotion? Because it knew how to go places! 🛣️📈",
    "I got lost in thought… it was such a good place to get lost! 💭🗺️",
    "Why do geographers prefer online shopping? They like to map out the best deals! 🛒🗺️",
    "I was going to make a GIS joke, but I couldn't find the right coordinates! 😂🗺️",
    "What’s a GIS analyst’s favorite exercise? Map squats! 🏋️‍♂️🗺️",
    "Why do maps always get invited to parties? Because they really know how to draw a crowd! 🎉🗺️",
    "Why did the geographer break up with the globe? It was too round for them! 🥴🌍",
    "Why do geographers hate nature? Because it keeps changing the map! 🌳🗺️",
    "I wanted to be a map, but I couldn't find my way! 😂🗺️",
    "What did the GIS analyst say after a long day? 'I need to unwind and de-map!' 🗺️🛁",
    "How do geographers stay in shape? They always take the scenic route! 🚴‍♂️🗺️",
    "What do you call a geographer who tells great stories? A map-tivator! 📖🗺️",
    "Why do maps make terrible comedians? They always deliver the punchline too late! 😂🗺️",
    "I told my GPS it was driving me crazy; it responded, 'Turn left at the next lunatic!' 🤪🗺️",
    "Why are GIS analysts so good at keeping secrets? Because they’re good at keeping things under wraps! 🤫🗺️",
    "I went to the park with my map; it was quite the 'mapping' adventure! 🏞️🗺️",
    "What do you call a detective who uses GIS? A geo-sleuth! 🕵️‍♀️🗺️",
    "Why did the GIS analyst take a nap? They needed to recharge their coordinates! 😴🗺️",
    "What’s a GIS analyst’s favorite game? Geo-Guessr! 🎮🗺️",
    "I asked my friend for directions, but he just pointed to a map. I guess that’s one way to navigate! 🗺️😆",
    "What do you call a cartographer who makes mistakes? A mis-mapper! 🤦‍♂️🗺️",
    "Why did the GIS analyst get in trouble? They couldn’t stop plotting! 📊🗺️",
    "How does a GIS analyst stay organized? They always have a map of their tasks! 🗺️📋",
    "What did the map say to the compass? 'You really keep me grounded!' 🧭💖",
    "Why was the geographer bad at relationships? They couldn't find common ground! 💔🗺️",
    "What’s a GIS analyst’s favorite food? Mapping pancakes! 🥞🗺️",
    "I used to be a map, but I lost my direction in life! 😂🗺️",
    "Why did the geographer get lost in the library? Too many books on different paths! 📚🗺️",
    "What did one GIS analyst say to the other at the gym? 'Let’s work on our map-ercise!' 🏋️‍♂️🗺️",
    "Why do geographers make terrible liars? Because they always get caught in the wrong coordinates! 🤭🗺️",
    "I asked the GPS for directions, and it told me to take a left at my last bad decision! 😂📍",
    "Why do geographers love playing cards? They always find the right deck! 🃏🗺️",
    "What did the map say to the globe? 'You spin me right round!' 🎶🌍",
    "Why was the map always calm? Because it had a clear route! 😌🗺️",
    "How do you organize a space party? You planet with maps! 🪐🗺️",
    "What did the road say to the traffic light? 'Stop looking at me, I'm not your direction!' 🚦😂",
    "Why are maps great storytellers? Because they always know how to unfold a good plot! 📖🗺️",
    "I lost my map and ended up going in circles. Now I'm just a lost cause! 🔄😅",
    "What’s a geographer’s favorite music genre? Map & Roll! 🎸🗺️",
    "Why do GIS analysts make great friends? They always know the best paths to take! 🤗🗺️",
    "What do you call a map that tells jokes? A pun-derful atlas! 🤣🗺️",
    "Why do geographers love parties? They can always find the best spots! 🎉🗺️",
    "What do you call an indecisive geographer? A lost soul! 😵🗺️",
    "I asked my map if I was lost; it just replied, 'Not yet!' 😂🗺️",
    "Why was the geographer always calm? Because they knew how to stay on course! 😌🗺️",
    "What do you call a mapping disaster? A geo-mess! 🚧🗺️",
    "How do geographers relax after work? They go on a scenic drive! 🚗🗺️",
    "Why did the GIS analyst take a vacation? They needed to recharge their batteries! 🔋🌴",
    "What did one GIS analyst say to the other? 'Let’s map out our future!' 🗺️✨",
    "Why did the map get promoted? Because it always led the way! 📈🗺️",
    "I tried to make a GPS joke, but it didn’t point in the right direction! 😂📍",
    "What do you call a group of maps? A carto-crew! 🗺️👯‍♂️",
    "Why was the geographer so good at charades? They always knew how to read the map! 🎭🗺️",
    "How does a GIS analyst stay fit? By taking all the right turns! 🔄🏃‍♂️",
    "Why did the map go to school? To improve its geography! 🏫🗺️",
    "What did the GPS say to the lost car? 'Don't worry, you’re just taking the scenic route!' 🚗🌅",
    "Why do geographers make great bakers? They know how to measure the right proportions! 🍰🗺️",
    "What did the map say to the tourist? 'You’ve got this!' 🗺️👍",
    "How do you cheer up a lost map? Just say, 'You’re always on the right path!' 🗺️😊",
    "Why did the road win an award? Because it was the best route to success! 🛤️🏆",
    "What did one GIS analyst say to the other at lunch? 'Let’s map out our meal!' 🥗🗺️",
    "Why did the geographer become a comedian? Because they had a great sense of direction! 😂🗺️"
];

    let currentIndex = 0;

    // Function to update text content
    function updateHeader() {
        headerElement.textContent = textOptions[currentIndex];
        currentIndex = (currentIndex + 1) % textOptions.length;
    }

    // Initial display and interval setup
    updateHeader(); // Display the first text initially
    setInterval(updateHeader, 15000); // Update text every 15 seconds
});


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