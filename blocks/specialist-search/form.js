import { initFormValidation } from "../../scripts/form-validator.js";
import { getCoordsAsync, showLocationOnMap } from './map.js';
import getSpecialistData from './api.js';
import { renderResults, attachRadiusHandler } from './results.js';
import {config, resultSection } from './specialist-search.js';

export async function submitForm(form) {
  const zipInput = form.querySelector('.specialist-search-zip input');
  const zip = zipInput.value.trim();
  console.log("Zip code: ", zip);

    try {
      const coords = await getCoordsAsync(zip);
      console.log( 'Received coordinates:'+ JSON.stringify(coords) );
      showLocationOnMap( coords.lat, coords.lng, 10 );

      const DEFAULT_RADIUS = 10;
      const specialistData = await getSpecialistData(coords,config.apiEndpoint,zip,DEFAULT_RADIUS);
      const providers = typeof specialistData.MemberList === 'string'
        ? JSON.parse( specialistData.MemberList )
        : specialistData.MemberList;

      form.style.display = 'none';
      resultSection.style.display = 'block';

      renderResults( resultSection, providers, zip);
      attachRadiusHandler( resultSection,coords,zip,config);

    } catch (err) {
      console.error(err);
    }
  
    form.parentElement.style.backgroundImage = 'none';

}

export async function initValidationListeners(form) {

  const validator = await initFormValidation(".specialist-search form", {
    error: {
      element: "div",
      className: "form-error"
    },
    rules: {
      zipCode: {
          maxLength: {
            value: 5,
            message: "This is an invalid zip code."
          },
          minLength: {
            value: 5,
            message: "This is an invalid zip code."
          }
      },
      terms: {
        required: {
          value: true,
          message: "Terms and Conditions is a required field."
        }
      }
    }

  });

  const button = form.querySelector('.specialist-search #form-submitbtn');
  button.addEventListener('click',
    (event) => {
      event.preventDefault();
      
      if (validator.validateForm()) {     
        console.log(" Validated");
        submitForm(form);
      } else {
        console.log("Not Validated");  
      }

      const btn = document.querySelector('#form-submitbtn');
      if (btn) document.querySelectorAll('.form-error').forEach(err => btn.before(err));
    }
  );

}

