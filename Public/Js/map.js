mapboxgl.accessToken = 'pk.eyJ1IjoiY3kwMHIiLCJhIjoiY2t6aHhlemRtMDI3bjJwcGY4NWxqbjZkbCJ9.8_y-VpujC7Re27pMxtbQjQ';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: value, // starting position [lng, lat]
        zoom: 12 // starting zoom
    });
   map.addControl(new mapboxgl.NavigationControl())

    const marker = new mapboxgl.Marker() // initialize a new marker
        .setLngLat(value) // Marker [lng, lat] coordinates
        .addTo(map); 

    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      placeholder: 'Search For Stadiums',
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false // Do not use the default marker style
    });

