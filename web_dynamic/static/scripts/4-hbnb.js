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
  
        // TODO: You can add code here to update the list of selected amenities
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
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    // Function to make a POST request to retrieve places based on search criteria
    function searchPlaces() {
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: JSON.stringify({ amenities: amenities }),
        contentType: 'application/json',
        success: function (places) {
          const placesSection = $('.places');
          placesSection.empty(); // Clear existing content
  
          // Loop through the places and create article tags
          places.forEach(place => {
            const article = $('<article>');
  
            // Create and append content for the article
            const titleBox = $('<div>').addClass('title_box');
            titleBox.append($('<h2>').text(place.name));
            titleBox.append($('<div>').addClass('price_by_night').text('$' + place.price_by_night));
            article.append(titleBox);
  
            const information = $('<div>').addClass('information');
            information.append($('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
            information.append($('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
            information.append($('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));
            article.append(information);
  
            article.append($('<div>').addClass('description').html(place.description));
  
            placesSection.append(article);
          });
        },
        error: function (error) {
          console.log('Error retrieving places: ' + error.responseText);
        }
      });
    }
  
    // Attach click event handler to the button
    $('button').click(function () {
      searchPlaces(); // Call the searchPlaces function on button click
    });
  });
  