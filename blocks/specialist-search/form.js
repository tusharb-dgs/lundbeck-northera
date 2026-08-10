export function createSearchForm({helper, placeholder, buttonLabel, termsContent}) {
  const form = document.createElement('div');
  form.classList.add('specialist-search-form');

  const helperText = document.createElement('p');
  helperText.classList.add('specialist-search-helper');
  helperText.textContent = helper;

  const fieldContainer = document.createElement('div');
  fieldContainer.classList.add('specialist-search-field');

  const zipInput = document.createElement('input');
  zipInput.classList.add('specialist-search-zip');
  zipInput.type = 'text';
  zipInput.maxLength = 5;
  zipInput.placeholder = placeholder;

  const termsLabel = document.createElement('label');
  termsLabel.classList.add('specialist-search-terms');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('specialist-search-checkbox');

  const termsText = document.createElement('span');
  termsText.classList.add('specialist-search-terms-text');
  termsText.innerHTML = termsContent;

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.classList.add('specialist-search-submit');
  submitButton.textContent = buttonLabel;

  const errorBox = document.createElement('div');
  errorBox.classList.add('specialist-search-error');

  termsLabel.append(checkbox, termsText);
  fieldContainer.append( zipInput, termsLabel, submitButton, errorBox);
  form.append(helperText, fieldContainer);

  return form;
}


export function validate(zip, checked) {
  if (!/^\d{5}$/.test(zip)) {
    return 'Please enter a valid ZIP code.';
  }

  if (!checked) {
    return 'Please accept Terms & Conditions.';
  }

  return null;
}