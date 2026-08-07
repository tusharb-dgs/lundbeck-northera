export function createSearchForm({
  helper,
  placeholder,
  buttonLabel,
  termsContent,
}) {
  const form = document.createElement('div');

  form.className = 'specialist-search-form';

  form.innerHTML = `
    <p class="specialist-search-helper">
      ${helper}
    </p>

    <div class="specialist-search-field">

      <input
        class="specialist-search-zip"
        type="text"
        maxlength="5"
        placeholder="${placeholder}"
      />

      <label class="specialist-search-terms">

        <input
          type="checkbox"
          class="specialist-search-checkbox"
        >

        <span class="specialist-search-terms-text">
          ${termsContent}
        </span>

      </label>

      <button
        type="button"
        class="specialist-search-submit"
      >
        ${buttonLabel}
      </button>

      <div class="specialist-search-error"></div>

    </div>
  `;

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