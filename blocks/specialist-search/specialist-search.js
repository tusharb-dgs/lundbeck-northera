import { createSearchForm, validate } from './form.js';
import { createResultsSection } from './templates.js';
import { initializeMap, getCoordsAsync } from './map.js';
import { getSpecialistData } from './api.js';
import { renderResults, filterProviders } from './results.js';

export default async function decorate(block) {
  const config = getConfig(block);

  const form = createSearchForm(config);

  const resultSection =
    createResultsSection();

  block.innerHTML = '';
  block.append(form);
  block.append(resultSection);

   initializeMap(
    config.googleMapKey
  );

  attachSearchHandler(
    form,
    resultSection,
    config,
  );
}

function getConfig(block) {
  const rows = [...block.children];

  const googleMapKey =
    rows[0]?.children[1]?.textContent.trim() || '';

  const apiEndpoint =
    rows[1]?.children[1]?.textContent.trim() || '';

  const helper =
    rows[2]?.children[1]?.textContent.trim() || '';

  const placeholder =
    rows[3]?.children[1]?.textContent.trim() || '';

  const termsRow =
    rows[4]?.children[1];

  const buttonLabel =
    rows[5]?.children[1]?.textContent.trim()
    || 'SEARCH NOW';

  const termsContent =
    termsRow?.querySelector(':scope > div')
    || termsRow;

  return {
    googleMapKey,
    apiEndpoint,
    helper,
    placeholder,
    buttonLabel,
    termsContent:
      termsContent?.innerHTML || '',
  };
}

function attachSearchHandler(
  form,
  resultSection,
  config,
) {
  const zipInput =
    form.querySelector('.specialist-search-zip');

  const checkbox =
    form.querySelector('.specialist-search-checkbox');

  const button =
    form.querySelector('.specialist-search-submit');

  const errorBox =
    form.querySelector('.specialist-search-error');

  button.addEventListener(
    'click',
    async () => {
      const zip =
        zipInput.value.trim();

      const error = validate(
        zip,
        checkbox.checked,
      );

      if (error) {
        errorBox.textContent = error;
        return;
      }

      errorBox.textContent = '';

      try {
        const coords =
          await getCoordsAsync(zip);

        console.log(
          'Received coordinates:',
          coords,
        );

        const specialistData =
          await getSpecialistData(
            coords,
            config.apiEndpoint,
            zip,
          );

        const providers =
          typeof specialistData.MemberList === 'string'
            ? JSON.parse(
                specialistData.MemberList,
              )
            : specialistData.MemberList;

        form.style.display = 'none';

        resultSection.style.display =
          'block';

        renderResults(
          resultSection,
          providers,
          zip,
        );

        attachRadiusHandler(
          resultSection,
          providers,
          zip,
        );

      } catch (err) {
        console.error(err);

        errorBox.textContent =
          'Something went wrong. Please try again.';
      }
    },
  );
}

function attachRadiusHandler(
  resultSection,
  providers,
  zip,
) {
  const radiusSelect =
    resultSection.querySelector(
      '#cmp-specialist__selectradius',
    );

  const DEFAULT_RADIUS = 10;

  let filteredProviders =
    filterProviders(
      providers,
      DEFAULT_RADIUS,
    );

  renderResults(
    resultSection,
    filteredProviders,
    zip,
  );

  radiusSelect.addEventListener(
    'change',
    (e) => {
      const radius = Number(
        e.target.value,
      );

      const filteredProviders =
        filterProviders(
          providers,
          radius,
        );

      renderResults(
        resultSection,
        filteredProviders,
        zip,
      );
    },
  );
}
