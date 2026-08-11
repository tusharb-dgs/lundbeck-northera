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
  fixMarkdownText();
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

function fixMarkdownText() {
  //Fix Markdown Links
  document.querySelectorAll('form label').forEach(el => {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    if (regex.test(el.innerHTML)) {
      el.innerHTML = el.innerHTML.replace(regex, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    }
  });

  //Fix Markdown Label
  document.querySelectorAll('.field-wrapper label').forEach((label) => {
    if (label.dataset.labelEnhanced === 'true') {
      return;
    }

    if (!label.textContent.includes('|')) {
      return;
    }

    label.dataset.labelEnhanced = 'true';
    const [labelText, helperText] = label.textContent.split('|');
    label.innerHTML = `<span class="ugc-label-text"> ${labelText}  </span><span class="ugc-label-helper"> &nbsp;${helperText} </span>`;
  });

  //Fix Bold Text
  document.querySelectorAll('.plaintext-wrapper p').forEach((el) => {
    el.innerHTML = el.innerHTML.replace(
      /\*\*(.*?)\*\*/g,
      '<strong>$1</strong>',
    );
  });  
}