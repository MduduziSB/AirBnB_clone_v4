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
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  });
  