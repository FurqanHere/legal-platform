import React, { useEffect, useState, memo } from 'react';
import { loadGoogleMapsScript } from '../services/GoogleMap'; // Adjust the path as necessary

const GoogleAutocompleteInput = memo(({ locationNew, onLocationChanged }) => {
  const [location, setLocation] = useState(locationNew);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      const map_key = localStorage.getItem('map_key');
      console.log(map_key)
      // const map_key = process.env.REACT_APP_MAP_KEY;

      if (!map_key) {
        console.error("Google Maps API key is missing in the .env file");
        return;
      }

      try {
        const googleMaps = await loadGoogleMapsScript(map_key);

        const autocomplete = new googleMaps.places.Autocomplete(
          document.getElementById('autocomplete'),
          { types: ['geocode'] } // Limit to geographical results
        );

        // Update on place selection
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const newLocation = {
              text: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            setLocation(newLocation);
            onLocationChanged(newLocation); // Emit to parent component
          }
        });
      } catch (error) {
        console.error("Error loading Google Maps script:", error);
      }
    };

    initializeAutocomplete();
  }, [onLocationChanged]);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setLocation((prev) => ({
      ...prev,
      text: newText,
    }));
  };

  return (
    <div>
      <input
        type="text"
        value={location?.text || ''}
        onChange={handleInputChange}
        id="autocomplete"
        required
        className="form-control form-control-solid mb-5"
        placeholder="Enter a location"
      />
      {/* Uncomment if you want to show location details */}
      {/* <div>
        <p>Location: {location.text}</p>
        <p>Latitude: {location.lat}</p>
        <p>Longitude: {location.lng}</p>
      </div> */}
    </div>
  );
});

export default GoogleAutocompleteInput;
