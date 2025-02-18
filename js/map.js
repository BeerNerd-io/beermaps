document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    window.map = L.map('map').setView([30.2672, -97.7431], 13); // Austin, TX coordinates

    // Use OpenStreetMap Carto (Standard) tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(window.map);

    // Define custom icons for each venue type
    const icons = {
        brewery: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),
        taproom: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),
        'community-resource': L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),
        'bottle-shop': L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),
        restaurant: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),
        bar: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),
        'comedy-club': L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    };

    // Add city name label
    const CityLabel = L.Control.extend({
        onAdd: function(map) {
            const label = L.DomUtil.create('div', 'city-label');
            label.innerHTML = 'AUSTIN';
            return label;
        }
    });

    new CityLabel({ position: 'topleft' }).addTo(window.map);

    // Initialize global markers array
    window.markers = [];

    // Fetch venue data and add markers
    fetch('data/venues.json')
        .then(response => response.json())
        .then(data => {
            data.venues.forEach(venue => {
                const icon = icons[venue.type] || L.Icon.Default();
                icon.options.venueType = venue.type;  // Store venue type in icon options
                const marker = L.marker([venue.lat, venue.lng], {icon: icon});
                
                // Create popup content
                const popupContent = `
                    <strong>${venue.name}</strong><br>
                    ${venue.type}<br>
                    ${venue.address}
                `;
                
                // Bind popup to marker
                marker.bindPopup(popupContent);
                
                // Open right drawer on click
                marker.on('click', () => {
                    console.log('Marker clicked');
                    openRightDrawer(venue);
                });

                // Add marker to global array
                window.markers.push(marker);
            });

            // Add all markers to the map initially
            window.markers.forEach(marker => marker.addTo(window.map));

            // Call filterVenues with initial 'all' filter
            if (typeof window.filterVenues === 'function') {
                window.filterVenues(new Set(['all']));
            }
        })
        .catch(error => console.error('Error loading venue data:', error));

    // Add event listeners for drawer toggles
    const toggleButtons = document.querySelectorAll('.drawer-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetDrawerId = button.getAttribute('aria-controls');
            const targetDrawer = document.getElementById(targetDrawerId);
            if (targetDrawer) {
                toggleDrawer(targetDrawer);
            }
        });
    });
});

function toggleDrawer(drawer) {
    drawer.classList.toggle('open');
    const isOpen = drawer.classList.contains('open');
    drawer.setAttribute('aria-expanded', isOpen);
}

function openRightDrawer(venue) {
    console.log('openRightDrawer called with venue:', venue);
    const rightDrawer = document.getElementById('right-drawer');
    toggleDrawer(rightDrawer);
    showVenueDetails(venue);
}

function showVenueDetails(venue) {
    console.log('showVenueDetails called with venue:', venue);
    const detailsContainer = document.getElementById('venue-details');
    detailsContainer.innerHTML = `
        ${venue.image ? `<img src="${venue.image}" alt="${venue.name}" style="width: 100%; height: auto;">` : ''}
        <h3>${venue.name}</h3>
        <p><strong>Type:</strong> ${venue.type}</p>
        <p><strong>Address:</strong> ${venue.address}</p>
        <p><strong>Phone:</strong> ${venue.phone}</p>
        <p><strong>Website:</strong> <a href="${venue.website}" target="_blank">${venue.website}</a></p>
        <p><strong>Description:</strong> ${venue.description}</p>
        <button id="get-directions" class="directions-button">Get Directions</button>
    `;

    // Add event listener for the directions button
    const directionsButton = document.getElementById('get-directions');
    directionsButton.addEventListener('click', () => {
        const address = encodeURIComponent(venue.address);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
        window.open(mapsUrl, '_blank');
    });
}
