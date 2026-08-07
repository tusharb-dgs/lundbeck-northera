import { renderProvider } from './templates.js';

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

  resultSection.querySelector(
    '.cmp-result__lists',
  ).innerHTML = providers
    .map(renderProvider)
    .join('');
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