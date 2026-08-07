import { renderProvider } from './templates.js';

import {
  registerProviderMarkers,
  focusProviderOnMap,
} from './map.js';

export function renderResults(
  resultSection,
  providers,
  zip,
) {
  resultSection.querySelector(
    '.cmp-result__length',
  ).textContent = providers.length;

  resultSection.querySelector(
    '.cmp-result__zipCode',
  ).textContent = zip;

  const list =
    resultSection.querySelector(
      '.cmp-result__lists',
    );

  list.innerHTML = providers
    .map(renderProvider)
    .join('');

  registerProviderMarkers(
    providers,
  );

  const cards =
    list.querySelectorAll(
      '.cmp-panel',
    );

  cards.forEach((card) => {
    card.addEventListener(
      'click',
      () => {
        cards.forEach((item) => {
          item.classList.remove(
            'active',
          );
        });

        card.classList.add(
          'active',
        );

        focusProviderOnMap(
          card.dataset.providerId,
        );

        document.getElementById('cmp-googlemap__placeholder')?.scrollIntoView({ behavior: 'smooth' });
      },
    );
  });
}

// export function filterProviders(
//   providers,
//   radius,
// ) {
//   return providers.filter(
//     (provider) =>
//       Number(provider.distance) <= radius,
//   );
// }