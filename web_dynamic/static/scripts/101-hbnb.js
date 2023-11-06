dy(function () {
  const amenities = [];
  const states = {};
  const cities = {};
  let reviewsVisible = false;

  // Function to fetch and display reviews
  function toggleReviews() {
    if (reviewsVisible) {
      $('.reviews').empty(); // Remove all Review elements from the DOM
      reviewsVisible = false;
      $('.reviews-toggle').text('show'); // Change the text to "show"
    } else {
      // Fetch and display reviews
      $.get('http://0.0.0.0:5001/api/v1/reviews/', function (reviews) {
        const reviewsSection = $('.reviews');
        reviewsSection.empty(); // Clear existing content

        // Loop through the reviews and create Review elements
        reviews.forEach(review => {
          const reviewElement = $('<div>').addClass('review');
          reviewElement.append($('<h3>').text(review.user.first_name + ' ' +
            review.user.last_name));
          reviewElement.append($('<p>').text(review.text));
          reviewsSection.append(reviewElement);
        });

        reviewsVisible = true;
        $('.reviews-toggle').text('hide'); // Change the text to "hide"
      });
    }
  }

  // Attach click event handler to the Reviews span
  $('.reviews-toggle').click(function () {
    toggleReviews(); // Call the toggleReviews function on span click
  });
});
