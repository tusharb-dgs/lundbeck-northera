import { initValidationListeners, submitForm } from './form.js';
import { createResultsSection } from './templates.js';
import { initializeMap, getCoordsAsync, showLocationOnMap } from './map.js';
import { getSpecialistData } from './api.js';
import { renderResults } from './results.js';

export let config = {};
export let resultSection;

export default async function decorate(block) {

  try {
    const module = await import("../form/form.js");
    if (typeof module.default === 'function') {
      await module.default(block);
    }
  } catch (error) {
    console.error('Failed to load form block:',error);
  }

  config = getConfig(block);
  console.log('Config:', config);

  const form = document.querySelector('.specialist-search form');
  form.noValidate = true;

  resultSection = createResultsSection();
  block.append(resultSection);
  block.style.backgroundImage = `url('${config.backgroundImage}')`;

  initializeMap(config.googleMapKey);
  initValidationListeners(form);
}

function getConfig(block) {
  const apiEndpoint = document.querySelector('div.specialist-search.block form').getAttribute('data-action');

  const googleMapKey = document.querySelector('#form-gmapikey').textContent;

  const backgroundImage = document.querySelector('#form-bgimageurl').textContent;

  document.querySelectorAll( '#form-gmapikey, #form-bgimageurl').forEach(e => e.remove());
  document.getElementById('form-zipcode-label').style.display = 'none';

  return {
    googleMapKey,
    apiEndpoint,
    backgroundImage
  };
}