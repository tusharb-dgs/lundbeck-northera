import { loadScript } from '../../scripts/aem.js';

let map;

export async function initializeMap(apiKey) {
  await loadScript(
    `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
  );

  if (!window.google?.maps) {
    throw new Error(
      'Google Maps failed to load',
    );
  }

  const mapElement =
    document.getElementById(
      'cmp-googlemap__placeholder',
    );

  map = new google.maps.Map(mapElement, {
    center: {
      lat: 37.09,
      lng: -95.71,
    },
    zoom: 4,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
  });

  return map;
}

export async function getCoordsAsync(
  zipCode,
) {
  const res =
    await new google.maps.Geocoder().geocode({
      address: zipCode,
    });

  if (res.results?.length) {
    return {
      lat: res.results[0].geometry.location.lat(),
      lng: res.results[0].geometry.location.lng(),
    };
  }

  return null;
}