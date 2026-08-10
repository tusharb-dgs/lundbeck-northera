import { loadScript } from '../../scripts/aem.js';

const markers = new Map();
let map;
let activeMarker = null;

export async function initializeMap(apiKey) {
  await loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`);

  if (!window.google?.maps) {
    throw new Error('Google Maps failed to load');
  }

  const mapElement = document.getElementById('cmp-googlemap__placeholder');
  map = new google.maps.Map(mapElement, 
    {center: {lat: 37.09,lng: -95.71,},
    zoom: 8,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    disableDefaultUI: false,
  });

  return map;
}

export async function getCoordsAsync(zipCode) {
  const res = await new google.maps.Geocoder().geocode({ address: zipCode});

  if (res.results?.length) {
    return {
      lat: res.results[0].geometry.location.lat(),
      lng: res.results[0].geometry.location.lng()
    };
  }

  return null;
}



export function registerProviderMarkers(providers) {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers.clear();
}

export function focusProviderOnMap(providerId) {
  const marker = markers.get(providerId);

  if (!marker) {
    return;
  }

  map.panTo(marker.getPosition());
  map.setZoom(15);
  marker.setAnimation(google.maps.Animation.BOUNCE);

  setTimeout(() => {
    marker.setAnimation(null);
  }, 1500);
}


export function showLocationOnMap(lat,lng,zoom = 12) {
  // Remove existing marker
  if (activeMarker) {
    activeMarker.setMap(null);
  }

  activeMarker = new google.maps.Marker({
    position: {
      lat: Number(lat),
      lng: Number(lng),
    },
    map,
  });

  map.panTo({
    lat: Number(lat),
    lng: Number(lng),
  });

  map.setZoom(zoom);
}