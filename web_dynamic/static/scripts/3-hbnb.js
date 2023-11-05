$(document).ready(function () {
  const amenities = [];

  $('input:checkbox').change(function () {
    const checkbox = $(this);
    const dataID = checkbox.parents('li').attr('data-id');
    const name = checkbox.parents('li').attr('data-name');

    if (checkbox.is(':checked')) {
      // Add the amenity if checked and not already in the list
      if (!amenities.includes(dataID)) {
        amenities.push(dataID);
      }
    } else {
      // Remove the amenity if unchecked and present in the list
      const index = amenities.indexOf(dataID);
      if (index !== -1) {
        amenities.splice(index, 1);
      }
    }

    if (amenities.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      const amenityNames = amenities.map(id => $(`li[data-id="${id}"]`).attr('data-name'));
      $('.amenities h4').text(amenityNames.join(', '));
    }
  });

  // Make an HTTP request to check the API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  // Make a POST request to fetch and display places
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
                      <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night}</div>
                      </div>
                      <div class="information">
                        <div class="max_guest">${place.max_guest} Guests</div>
                        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                      </div>
                      <div class="description">
                        ${place.description}
                      </div>
                    </article>`;
      }));
    }
  });
});
