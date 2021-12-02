'use strict';

// utils

function isEscEvent(evt) {
  return evt.keyCode === 27 || evt.key === 'Escape' || evt.key === 'Esc';
}

// scroll

function scrollToElement(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function smoothAnchorScroll() {
  var smoothLinks = document.querySelectorAll('a[href^="#"]:not(a[href="#"]');
  smoothLinks.forEach(function (smoothLink) {
    smoothLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      var id = smoothLink.getAttribute('href');
      scrollToElement(document.querySelector(id));
    });
  });
}

smoothAnchorScroll();

// accordion

var pageBody = document.querySelector('.page-body');
var accordionItems = document.querySelectorAll('.navigation__accordion-item');

function onButtonClick() {
  pageBody.classList.remove('nojs');

  accordionItems.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      var self = evt.currentTarget;

      var control = self.querySelector('.navigation__button');
      var content = self.querySelector('.navigation__inner-list');

      if (self.classList.contains('navigation__accordion-item--active')) {
        self.classList.remove('navigation__accordion-item--active');


        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
      } else {
        accordionItems.forEach((function (el) {
          el.classList.remove('navigation__accordion-item--active');
        }));
        self.classList.add('navigation__accordion-item--active');
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
      }
    });
  });
}

onButtonClick();

// mask

function createPhoneMask(evt) {
  var ind = 0;
  var matrix = '+7(___) ___-__-__';
  var defaultPrefix = matrix.replace(/\D/g, '');
  var value = evt.target.value.replace(/\D/g, '');

  if (defaultPrefix.length >= value.length) {
    value = defaultPrefix;
  }

  evt.target.value = matrix.replace(/./g, function (symbol) {
    if (/[_\d]/.test(symbol) && ind < value.length) {
      return value.charAt(ind++);
    } else {
      if (ind >= value.length) {
        return '';
      } else {
        return symbol;
      }
    }
  });
}

function checkPhoneFocus(field) {
  field.addEventListener('focus', function (evt) {
    if (field.value.length === 0) {
      evt.target.value = '+7';
    }
  });
  field.addEventListener('blur', function (evt) {
    if (field.value === '+7') {
      evt.target.value = '';
    }
  });
}

// validation

var forms = document.querySelectorAll('[name=feedback-form]');
var phoneInputs = document.querySelectorAll('input[type="tel"]');
var phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
var MIN_NUMBERS_LENGTH = 16;
var errorMessage = 'Пожалуйста, проверьте правильность введенных данных';

function checkPhoneField(regex, field) {
  var inputValue = field.value.replace(/\D/g, '');
  var valueLength = inputValue.length;

  if (valueLength === 0) {
    field.setCustomValidity('Пожалуйста, введите номер');
  } else if (valueLength < MIN_NUMBERS_LENGTH && !regex.test(inputValue)) {
    field.setCustomValidity(errorMessage);
  } else if (!regex.test(inputValue)) {
    field.setCustomValidity(errorMessage);
  } else {
    field.setCustomValidity('');
  }
  field.reportValidity();
}

phoneInputs.forEach(function (inputTel) {
  checkPhoneFocus(inputTel);
  inputTel.addEventListener('keypress', function (evt) {
    if (!/\d/.test(evt.key)) {
      evt.preventDefault();
    }
  });
  inputTel.addEventListener('input', createPhoneMask);
  inputTel.addEventListener('input', function (evt) {
    checkPhoneField(phoneRegex, evt.target);
  });
});

// localStorage

forms.forEach(function (form) {
  var nameInput = form.querySelector('input[type="text"]');
  var phoneInput = form.querySelector('input[type="tel"]');
  var feedbackTextarea = form.querySelector('textarea');

  var storageName = '';
  var storagePhone = '';
  var storageFeedback = '';

  function isStorage() {
    try {
      storageName = localStorage.getItem('userName');
      storagePhone = localStorage.getItem('userPhone');
      storageFeedback = localStorage.getItem('userFeedback');
      return true;
    } catch (err) {
      return false;
    }
  }

  var isStorageSupport = isStorage();
  function saveFormData() {
    if (isStorageSupport) {
      localStorage.setItem('userName', nameInput.value);
      localStorage.setItem('userPhone', phoneInput.value);
      localStorage.setItem('userFeedback', feedbackTextarea.value);
    }
  }

  function fillForm() {
    isStorage();
    if (storageName) {
      nameInput.value = storageName;
    }
    if (storagePhone) {
      phoneInput.value = storagePhone;
    }
    if (storageFeedback) {
      feedbackTextarea.value = storageFeedback;
    }
  }

  fillForm(form);

  form.addEventListener('submit', function () {
    saveFormData();
  });
});

// modal

var modal = document.querySelector('.modal');
var overlay = modal.querySelector('.overlay');
var openButton = document.querySelector('.main-nav__button a');
var closeButton = modal.querySelector('button[type="button"]');
var popupNameInput = modal.querySelector('input[type="text"]');

function closePopup() {
  modal.classList.remove('modal--show');
  overlay.classList.remove('overlay--show');
  document.body.classList.remove('page-no-scroll');
}

function closeOnButton(evt) {
  evt.preventDefault();
  closePopup();
  closeButton.removeEventListener('click', closeOnButton);
}

function closeOnOverlay(evt) {
  evt.preventDefault();
  closePopup();
  overlay.removeEventListener('click', closeOnOverlay);
}

function closeOnEsc(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', closeOnEsc);
  }
}

function openPopup() {
  openButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal--show');
    overlay.classList.add('overlay--show');
    document.body.classList.add('page-no-scroll');
    popupNameInput.focus();

    closeButton.addEventListener('click', closeOnButton);
    overlay.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeOnEsc);
  });
}

openPopup();
