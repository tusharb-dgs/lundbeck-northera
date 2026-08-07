import { renderProvider } from './templates.js';

import {
  registerProviderMarkers,
  focusProviderOnMap, showLocationOnMap
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
            cards.forEach((item) =>
            item.classList.remove('active'),
            );

            card.classList.add('active');

            const provider =
            providers.find(
                (item) =>
                item.lundbeckID ===
                card.dataset.providerId,
            );

            if (provider) {
            showLocationOnMap(
                provider.latitude,
                provider.longitude,
                15,
            );

            document
                .querySelector(
                '.cmp-result__googlemap',
                )
                ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                });
            }
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