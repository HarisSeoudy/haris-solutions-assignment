// Configuration
var applicationID = 'RED32ZA6S9';
var apiKey = '471df95883cf6d3b984ce455f7bf4fbb';
var indexName = 'restaurants';

// Initialise the client and provide it to the helper factory
var client = algoliasearch(applicationID, apiKey);
var helper = algoliasearchHelper(client, indexName, {
  disjunctiveFacets: ['food_type', "stars_rounded", 'filtered_payment_options'],
  hitsPerPage: 5,
  maxValuesPerFacet: 5
});

// Ask for the users location, if they accept set their lat and long as query parameters and rerun the search, else return the error to the console 
const successCallback = (position) => {
  helper.setQueryParameter('aroundLatLng', `${position.coords.latitude},${position.coords.longitude}`).search();
};
const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// Change the index when the user chooses a sorting option
$("#sorts").change(function () {
  var sortOption = this.value;
  helper.setIndex(sortOption).search();
});

// Listen to results coming from Algolia and render them on the page
helper.on('result', function (event) {
  // Display the page number
  var pageNumber = event.results.page + 1
  $('.page-number').html("<b>" + pageNumber + "</b>");
  // If there are no results, display the no results messaging, else display the results
  if (event.results.nbHits === 0) {
    $('#next-page').hide();
    $('#sorts-wrapper').hide();
    $('.left-pane').hide();
    $('#search-results').hide();
    $('#result-header').empty().html("<b>No results found, please try a different query.</b>")
    $(".right-pane").css("width", "100%");
    $(".pagination").hide();
  } else {
    $('.left-pane').show();
    $('#sorts-wrapper').show();
    $('#search-results').show();
    $(".right-pane").css("width", "70%");
    $(".pagination").show();
    $('#next-page').show();
    $('#previous-page').show();
    renderResultStats(event.results.nbHits, event.results.processingTimeMS);
    renderHits(event.results);
    renderFoodFacet(event.results);
    renderRatingFacet(event.results);
    renderPaymentFacet(event.results);
  }
  // If you're on the first page, hide the previous page button
  if (event.results.page === 0) {
    $('#previous-page').hide();
  }
});

// When the next page button is clicked, show the next page of results and the show previous page button
$('#next-page').on('click', (event) => {
  //event.preventDefault();
  $('#previous-page').show();
  helper.nextPage().search();
});

// When the previous page button is clicked, show the previous page of results
$('#previous-page').on('click', (event) => {
  //event.preventDefault();
  helper.previousPage().search();
});

// Function to render the results on the page
function renderHits(content) {
  $('#search-results').html(function () {
    return $.map(content.hits, function (hit) {
      return '<div id=hit><div id=hit-image-wrapper><img id=hit-image src="' + hit.image_url + '"width="80" height="80"></div><div id=hit-body><h4 id=hit-name>' + hit._highlightResult.name.value + '</h4><p id="hit-info">' + drawStars(hit.stars_count) + ' (' + hit.reviews_count + ' reviews)</p><p>' + hit.food_type + ' | ' + hit.neighborhood + ' | ' + hit.price_range + '</p></div></div>';
    });
  });
}

// Function to render the results stats on the page
function renderResultStats(nbHits, processingTimeMS) {
  $('#result-header').html("<b>" + nbHits + " results found</b> in " + (processingTimeMS / 1000) + " seconds")
};

// Function to render the food facet on the page
function renderFoodFacet(content) {
  $('#food-facet').html(function () {
    return $.map(content.getFacetValues('food_type'), function (facet) {
      var checkbox = $('<input type=checkbox>')
        .data('facet', facet.name)
        .attr('id', 'fl-' + facet.name);
      if (facet.isRefined) checkbox.attr('checked', 'checked');
      var label = $('<label>').html(facet.name + ' (' + facet.count + ')')
        .attr('for', 'fl-' + facet.name);
      return $('<div class="facetLabel">').append(checkbox).append(label);
    });
  });
}

// Function to render the rating facet on the page
function renderRatingFacet(content) {
  $('#star-facet').html(function () {
    // Get the facet values and sort the star ratings from 5 to 1
    return $.map(content.getFacetValues('stars_rounded', { sortBy: ['name:desc'] }), function (facet) {
      var checkbox = $('<input type=checkbox>')
        .data('facet', facet.name)
        .attr('id', 'fl-' + facet.name);
      if (facet.isRefined) checkbox.attr('checked', 'checked');
      var label = $('<label>').html(drawStars(facet.name) + ' (' + facet.count + ')')
        .attr('for', 'fl-' + facet.name);
      return $('<div class="facetLabel">').append(checkbox).append(label);
    });
  });
}

// Function to render the payment facet on the page
function renderPaymentFacet(content) {
  $('#payment-facet').html(function () {
    return $.map(content.getFacetValues('filtered_payment_options'), function (facet) {
      var checkbox = $('<input type=checkbox>')
        .data('facet', facet.name)
        .attr('id', 'fl-' + facet.name);
      if (facet.isRefined) checkbox.attr('checked', 'checked');
      var label = $('<label>').html(facet.name + ' (' + facet.count + ')')
        .attr('for', 'fl-' + facet.name);
      return $('<div class="facetLabel">').append(checkbox).append(label);
    });
  });
}

// Handle click on food facet
$('#food-facet').on('click', 'input[type=checkbox]', function (e) {
  var facetValue = $(this).data('facet');
  helper.toggleRefinement('food_type', facetValue).search();
});

// Handle click on star facet
$('#star-facet').on('click', 'input[type=checkbox]', function (e) {
  var facetValue = $(this).data('facet');
  helper.toggleRefinement('stars_rounded', facetValue).search();
});

// Handle click on payment facet
$('#payment-facet').on('click', 'input[type=checkbox]', function (e) {
  var facetValue = $(this).data('facet');
  helper.toggleRefinement('filtered_payment_options', facetValue).search();
});

// Listen to the changes within the input and pass the query to the helper. Trigger the after search every keystroke
$('#search-box').on('keyup', function () {
  helper.setQuery($(this).val()).search();
});

// Trigger the search
helper.search();

// Function to draw ratings as stars
var drawStars = (stars_count) => {
  // stars_count : Double
  var filled = `<img width="15" height="15" src="resources/graphics/stars-plain.png" />`.repeat(Math.floor(stars_count));
  var empty = `<img width="15" height="15" src="resources/graphics/star-empty.png" />`.repeat(5 - Math.floor(stars_count));
  return (`<span>${stars_count} - ${filled}${empty}</span>`);
};
