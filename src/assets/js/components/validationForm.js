export default function ValidateForm() {
  const form = document.querySelector('.selected-form__form');
  if (!form) return;

  const fields = form.querySelectorAll('.c-form__input, .c-form__select');
  const radioGroups = form.querySelectorAll('.c-form__field--radio');
  const submitButton = form.querySelector('button[type="submit"]');

  const regexPatterns = {
    form_full_name: {
      pattern: /^.{2,}$/,
      error: 'Minimum 2 characters required'
    },
    form_email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: 'Invalid email format'
    },
    form_phone_number: {
      pattern: /^\+?\d{7,15}$/,
      error: 'Invalid phone number'
    },
    form_company_name: {
      pattern: /^.{2,}$/,
      error: 'Minimum 2 characters required'
    },
    form_company_website: {
      pattern: /^.{2,}$/,
      error: 'Minimum 2 characters required'
    },
    form_year_incorporated: {
      pattern: /^\d{4}$/,
      error: 'Enter a valid year (4 digits)'
    },
    form_month_cash: { pattern: /^[\d,]+$/, error: 'Invalid number format' }
  };

  function showError(fieldWrapper, message) {
    fieldWrapper.classList.add('is-error');
    fieldWrapper.classList.remove('is-success');

    let errorSpan = fieldWrapper.querySelector('.error-message');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.classList.add('error-message');
      fieldWrapper.append(errorSpan);
    }
    errorSpan.textContent = message;
  }

  function showSuccess(fieldWrapper) {
    fieldWrapper.classList.remove('is-error');
    fieldWrapper.classList.add('is-success');

    const errorSpan = fieldWrapper.querySelector('.error-message');
    if (errorSpan) errorSpan.remove();
  }

  function validateField(field) {
    const fieldWrapper = field.closest('.c-form__field');
    const fieldName = field.name;
    const value = field.value.trim();
    const validation = regexPatterns[fieldName];

    if (!value) {
      showError(fieldWrapper, 'This field is required');
      return false;
    }

    if (validation && !validation.pattern.test(value)) {
      showError(fieldWrapper, validation.error);
      return false;
    }

    showSuccess(fieldWrapper);
    return true;
  }

  function validateRadioGroup(group) {
    const radios = group.querySelectorAll('input[type="radio"]');
    const fieldWrapper = group.closest('.c-form__field');
    const isChecked = [...radios].some((radio) => radio.checked);

    if (!isChecked) {
      showError(fieldWrapper, 'Please select an option');
      return false;
    }

    showSuccess(fieldWrapper);
    return true;
  }

  for (const field of fields) {
    field.addEventListener('input', () => validateField(field));
  }

  for (const group of radioGroups) {
    group.addEventListener('change', () => validateRadioGroup(group));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    for (const field of fields) {
      if (!validateField(field)) isValid = false;
    }

    for (const group of radioGroups) {
      if (!validateRadioGroup(group)) isValid = false;
    }

    if (isValid) {
      console.log('✅ Form submitted successfully!');
      // form.submit(); // Uncomment this line **if** you want to actually submit the form after validation
    } else {
      console.log('❌ Form validation failed! Please check the fields.');
    }
  });
}
