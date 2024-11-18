function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    
    // Get user inputs
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice").querySelector("h2");

    var url = "http://127.0.0.1:5000/predict_home_price"; // Use this if you are NOT using nginx (first 7 tutorials)

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function(data, status) {
        console.log(data.estimated_price);

        // Play sound
        const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
        audio.play();

        // Set up the animation
        var targetPrice = data.estimated_price; // Use the fetched estimated price
        var currentNumber = 0;
        var duration = 2000;  // Duration of the animation in milliseconds
        var stepTime = duration / targetPrice;

        // Animate the number rolling effect
        function animatePrice() {
            if (currentNumber < targetPrice) {
                currentNumber++;
                estPrice.textContent = `$${currentNumber} Lakh`;
                setTimeout(animatePrice, stepTime);
            }
        }

        // Show the estimated price with animation
        estPrice.style.opacity = 1;
        estPrice.style.transform = "translateY(0)"; // Apply smooth transition
        animatePrice(); // Start the rolling animation
    });
}

  
  function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;