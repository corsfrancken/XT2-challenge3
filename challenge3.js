// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiY29yc2ZyIiwiYSI6ImNsMTJmcXZlODA1ejAzcXBkNGg2Y3l3ODQifQ.CDTUUZ3hyHqY7HXT6hL54Q';

const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet
        center: [4.4866386, 52.1628859], // starting position [lng, lat]
        zoom: 11.5 // starting zoom
      });

      // Target the params form in the HTML
      const params = document.getElementById('params');

      // Create variables to use in getIso()
      const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
      const lon = 4.4866386;
      const lat = 52.1628859;
      let profile = 'cycling';
      let minutes = 10;

      // Set up a marker that you can use to show the query's coordinates
      const marker = new mapboxgl.Marker({
        'color': '#000008'
      });

      // Create a LngLat object to use in the marker initialization
      // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
      const lngLat = {
        lon: lon,
        lat: lat
      };

      // Create a function that sets up the Isochrone API query then makes a fetch call
      async function getIso() {
        const query = await fetch(
          `${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
          { method: 'GET' }
        );
        const data = await query.json();
        // Set the 'iso' source's data to what's returned by the API query
        map.getSource('iso').setData(data);
      }

      // When a user changes the value of profile or duration by clicking a button, change the parameter's value and make the API query again
      params.addEventListener('change', (event) => {
        if (event.target.name === 'profile') {
          profile = event.target.value;
        } else if (event.target.name === 'duration') {
          minutes = event.target.value;
        }
        getIso();
      });

      map.on('load', () => {
        // When the map loads, add the source and layer
        map.addSource('iso', {
          type: 'geojson',
          data: {
            'type': 'FeatureCollection',
            'features': []
          }
        });

        map.addLayer(
          {
            'id': 'isoLayer',
            'type': 'fill',
            'source': 'iso',
            'layout': {},
            'paint': {
              'fill-color': '#000008',
              'fill-opacity': 0.3
            }
          },
          'poi-label'
        );

        // Initialize the marker at the query coordinates
        marker.setLngLat(lngLat).addTo(map);

        // Make the API call
        getIso();
      });



function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='f5c78705bc60d48e4e30d595bfff85e5';
	var city = 'Leiden,nl';

	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	fetch(request)
	
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	.then(function(response) {
		onAPISucces(response);	
	})
	
	.catch(function (error) {
		onAPIError(error);
	});
}


function onAPISucces(response) {
	var type = response.weather[0].description;

	var degC = Math.floor(response.main.temp - 273.15);

	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = degC + '&#176;C <br>' + type;
}


function onAPIError(error) {
	console.error('Request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}

// init data stream
getAPIdata();