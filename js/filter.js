document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    let activeFilters = new Set(['all']);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedType = button.getAttribute('data-type');

            if (selectedType === 'all') {
                activeFilters.clear();
                activeFilters.add('all');
                filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
            } else {
                activeFilters.delete('all');
                button.classList.toggle('active');
                if (button.classList.contains('active')) {
                    activeFilters.add(selectedType);
                } else {
                    activeFilters.delete(selectedType);
                }
                if (activeFilters.size === 0) {
                    activeFilters.add('all');
                    filterButtons[0].classList.add('active');
                }
            }

            filterVenues(activeFilters);
        });
    });
});

function filterVenues(activeFilters) {
    if (window.map && window.markers) {
        window.markers.forEach(marker => {
            const venueType = marker.options.icon.options.venueType;
            if (activeFilters.has('all') || activeFilters.has(venueType)) {
                marker.addTo(window.map);
            } else {
                window.map.removeLayer(marker);
            }
        });
    }
}

// Make filterVenues function globally accessible
window.filterVenues = filterVenues;

// Remove any other event listeners that might be interfering with marker clicks
