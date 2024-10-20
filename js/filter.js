document.addEventListener('DOMContentLoaded', () => {
    const applyFiltersButton = document.getElementById('apply-filters');
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            const selectedType = document.getElementById('venue-type').value;
            filterVenues(selectedType);
        });
    }
});

function filterVenues(type) {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            const venueType = layer.getPopup().getContent().split('<br>')[1].trim().toLowerCase();
            if (type === 'all' || venueType === type.toLowerCase()) {
                layer.addTo(map);
            } else {
                map.removeLayer(layer);
            }
        }
    });
}

// Remove any other event listeners that might be interfering with marker clicks
