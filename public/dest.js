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

            // Create a new routing control
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(window.userLocation[0], window.userLocation[1]), // User's location
                    L.latLng(destinationCoords[0], destinationCoords[1]) // Selected destination
                ],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim()
            }).addTo(map);

            // Fit the map to the route
            routingControl.on('routesfound', function(e) {
                const route = e.routes[0];
                map.fitBounds(route.getBounds());
            });
        });
    })
    .catch(error => console.error('Error fetching destination data:', error));

// Initialize the application
getCurrentLocation();