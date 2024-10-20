function showVenueDetails(venue) {
    const detailsContainer = document.getElementById('venue-details');
    detailsContainer.innerHTML = `
        <h3>${venue.name}</h3>
        <p><strong>Type:</strong> ${venue.type}</p>
        <p><strong>Address:</strong> ${venue.address}</p>
        <p><strong>Phone:</strong> ${venue.phone}</p>
        <p><strong>Website:</strong> <a href="${venue.website}" target="_blank">${venue.website}</a></p>
        <p><strong>Description:</strong> ${venue.description}</p>
        <button id="get-directions" class="directions-button">Get Directions</button>
    `;

    const rightDrawer = document.getElementById('right-drawer');
    rightDrawer.classList.add('open');
    rightDrawer.setAttribute('aria-expanded', 'true');

    // Add event listener for the directions button
    const directionsButton = document.getElementById('get-directions');
    directionsButton.addEventListener('click', () => {
        const address = encodeURIComponent(venue.address);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
        window.open(mapsUrl, '_blank');
    });
}
