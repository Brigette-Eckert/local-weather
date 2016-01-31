//get location
function success(pos) {
	  var crd = pos.coords;
	  var lat =crd.latitude;
	  var lon =crd.longitude;
	  console.log('Your current position is:');
	  console.log('Latitude : ' +lat);
	  console.log('Longitude: ' +lon);


	  //Weather API Call
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=e4e1425994f5fa474cdd4b36231633c9", function(data){
	  	console.log(data);
	  	//convert tempatures from K and round
	  	var tempC = ((data.main.temp)-273.15).toFixed(1) + "° C";
	  	var tempF = ((data.main.temp)*(9/5)-459.67).toFixed(1) + "° F";

	  	//convert windspeed
	  	var windSpeedMetric = data.wind.speed + " m/s";
	  	//need to convert to imperial 
	  	var windSpeedImperial = ((data.wind.speed)*2.2369).toFixed(1) + "mph";

		//Display Conditons (Celsius is default)

		function unitsDisplay(){
			if($("#mainDisplay").hasClass('celsius')){
				$('#tempDisplay').html(tempC);
				$('#wind').html("<p> Wind Speed: " + windSpeedMetric +"</p>");
				console.log("display in celsius")
			}; 

			if($("#mainDisplay").hasClass('fahrenheit')){
				$('#tempDisplay').html(tempF);
				$('#wind').html("<p> Wind Speed: " + windSpeedImperial +"</p>");
					console.log("display in fahrenheit")
			};

			//toogle between imperial and metric 
			$("#celButton").click(function(){
				$("#mainDisplay").removeClass("celsius fahrenheit").addClass("celsius");
				unitsDisplay()
			});
			$("#farButton").click(function(){
				$("#mainDisplay").removeClass("celsius fahrenheit").addClass("fahrenheit");
				unitsDisplay()
			});

		};
			unitsDisplay();
		  	$('#location').html("<h3>" + data.name +", "+ data.sys.country +"</h3>");
		  	$('#condition').html(data.weather[0].main);
		  	$('#icon').html("<img src=http://openweathermap.org/img/w/" + data.weather[0].icon+".png>")
		  	$('#description').html("<p> Description: " + data.weather[0].description +"</p>");
		  	$('#humid').html("<p> Humidity: " + data.main.humidity +"% </p>");
		});
		

		
		
	};
	function error(err) {
	  console.warn('ERROR(' + err.code + '): ' + err.message);
	};

navigator.geolocation.getCurrentPosition(success, error);

