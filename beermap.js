// JavaScript for Beermap.io

// Initialize the map
const map = L.map('map').setView([30.2672, -97.7431], 13); // Austin, Texas coordinates

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Venue Data Placeholder (to be replaced by API calls)
const venues = {
    breweries: [
        {
            name: 'Austin Brewery',
            type: 'brewery',
            coordinates: [30.2672, -97.7431],
            address: '123 Brewery St, Austin, TX',
            website: 'https://austinbrewery.com',
            phone: '512-123-4567',
            description: 'A great brewery in Austin with amazing IPAs.'
        }
    ],
    taprooms: [
        {
            name: 'Austin Taproom',
            type: 'taproom',
            coordinates: [30.2675, -97.7440],
            address: '456 Taproom St, Austin, TX',
            website: 'https://austintaproom.com',
            phone: '512-987-6543',
            description: 'A chill taproom with a wide selection of craft beers.'
        }
    ],
    bottleShops: [
        {
            name: 'Austin Bottle Shop',
            type: 'bottle-shop',
            coordinates: [30.2680, -97.7425],
            address: '789 Bottle St, Austin, TX',
            website: 'https://austinbottleshop.com',
            phone: '512-555-1234',
            description: 'Find the best local craft beers at this bottle shop.'
        }
    ],
    restaurants: [
        {
            name: 'Austin Eats',
            type: 'restaurant',
            coordinates: [30.2690, -97.7435],
            address: '101 Restaurant St, Austin, TX',
            website: 'https://austineats.com',
            phone: '512-111-2222',
            description: 'A restaurant with a great beer pairing menu.'
        }
    ],
    bars: [
        {
            name: 'Austin Bar',
            type: 'bar',
            coordinates: [30.2700, -97.7410],
            address: '202 Bar St, Austin, TX',
            website: 'https://austinbar.com',
            phone: '512-333-4444',
            description: 'A bar that serves local craft beers and cocktails.'
        }
    ],
    comedyClubs: [
        {
            name: 'Austin Comedy Club',
            type: 'comedy-club',
            coordinates: [30.2710, -97.7400],
            address: '303 Comedy St, Austin, TX',
            website: 'https://austincomedyclub.com',
            phone: '512-555-6666',
            description: 'A comedy club with craft beers on tap.'
        }
    ]
};

// Add markers for each venue type
Object.keys(venues).forEach(type => {
    venues[type].forEach(venue => {
        const marker = L.marker(venue.coordinates).addTo(map);
        marker.bindPopup(`<b>${venue.name}</b><br>${venue.address}`);

        marker.on('click', () => {
            showVenueDetails(venue);
        });
    });
});

// Toggle drawers
const leftDrawer = document.getElementById('left-drawer');
const rightDrawer = document.getElementById('right-drawer');

// Function to show/hide left drawer (filter options)
function toggleLeftDrawer() {
    leftDrawer.classList.toggle('open');
}

// Function to show venue details in the right drawer
function showVenueDetails(venue) {
    rightDrawer.classList.add('open');
    const venueDetails = document.getElementById('venue-details');
    venueDetails.innerHTML = `
        <h3>${venue.name}</h3>
        <p><strong>Type:</strong> ${venue.type}</p>
        <p><strong>Address:</strong> ${venue.address}</p>
        <p><strong>Website:</strong> <a href="${venue.website}" target="_blank">${venue.website}</a></p>
        <p><strong>Phone:</strong> ${venue.phone}</p>
        <p>${venue.description}</p>
    `;
}

// Close right drawer when clicking outside of it
map.on('click', () => {
    rightDrawer.classList.remove('open');
});

// Apply filter functionality
document.getElementById('apply-filters').addEventListener('click', () => {
    const selectedVenueType = document.getElementById('venue-type').value;
    filterMarkers(selectedVenueType);
});

// Filter markers by venue type
function filterMarkers(type) {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            const venue = Object.values(venues).flat().find(v => v.coordinates[0] === layer.getLatLng().lat && v.coordinates[1] === layer.getLatLng().lng);
            if (venue) {
                if (type === 'all' || venue.type === type) {
                    layer.addTo(map);
                } else {
                    map.removeLayer(layer);
                }
            }
        }
    });
}
