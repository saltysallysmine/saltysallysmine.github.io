class FormValidation {

  constructor() {
    this.setErrors();
    this.setValidationForAllForms();
  }

  setErrors = () => {
    this.errors = {
      badInput: '',
      customError: '',
      patternMismatch: 'Используйте латиницу и кирилицу, а также символы \' и -',
      rangeOverflow: 'Введите целое число от 10 до 100 включительно',
      rangeUnderflow: 'Введите целое число от 10 до 100 включительно',
      stepMismatch: '',
      tooLong: '',
      tooShort: '',
      typeMismatch: 'Введите корректный e-mail: латинские буквы, разделённые символом @',
      valid: '',
      valueMissing: '',
    };
  }

  showInputError = (form, input, message) => {
    input.classList.add('invalid-input');
    const span = form.querySelector(`.${input.id}-error`);
    span.classList.add('invalid-message-span');
    span.innerText = message;
  }

  hideInputError = (form, input) => {
    input.classList.remove('invalid-input');
    const span = form.querySelector(`.${input.id}-error`);
    span.classList.remove('invalid-message-span');
    span.innerText = '';
  }

  setRightButtonState = (inputList, button) => {
    button.disabled = false;
    inputList.forEach(input => {
      if (input.required && input.value == '') {
        button.disabled = true;
      }
      if (!input.validity.valid) {
        button.disabled = true;
      }
    });
  }

  isValid = (form, input) => {
    // check if we need to disable button
    const inputList = form.querySelectorAll('input, textarea');
    const button = form.querySelector('button[type="submit"]');
    this.setRightButtonState(inputList, button);
    // check input validity
    if (!input.validity.valid) {
      const errorKey = Object.keys(this.errors).find(el => input.validity[el]);
      let message = this.errors[errorKey] || input.validationMessage;
      if (input.type === 'email') {
        message = this.errors['typeMismatch'];
      }
      this.showInputError(form, input, message);
    } else {
      this.hideInputError(form, input);
    }
    if (input.value === '') {
      this.hideInputError(form, input);
    }
  }

  setInputEventListenter = (form) => {
    const inputList = form.querySelectorAll('input, textarea');
    const button = form.querySelector('button[type="submit"]');
    this.setRightButtonState(inputList, button);
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this.isValid(form, input)
      });
    });
  }

  setValidationForAllForms = () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      this.setInputEventListenter(form);
    });
  }

}

let formValidation = new FormValidation();

