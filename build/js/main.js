// utils

function isEscEvent(evt) {
  return evt.keyCode === 27 || evt.key === 'Escape' || evt.key === 'Esc';
}
function isEnterEvent(evt) {
  return evt.keyCode === 13 || evt.key === 'Enter';
}


function isTabPressed(evt) {
  return evt.keyCode === 9 || evt.key === 'Tab';
}

// remove nojs

const pageBody = document.querySelector('.page-body');
pageBody.classList.remove('nojs');

// accordion

// var accordionItems = document.querySelectorAll('.navigation__accordion-item');

// function onButtonClick() {
//  accordionItems.forEach(function (item) {
//    item.addEventListener('click', function (evt) {
//      var self = evt.currentTarget;

//      var currentControl = self.querySelector('.navigation__button');
//      var currentContent = self.querySelector('.navigation__inner-list');

//      if (self.classList.contains('navigation__accordion-item--active')) {
//        self.classList.remove('navigation__accordion-item--active');

//        currentControl.setAttribute('aria-expanded', 'false');
//        currentContent.setAttribute('aria-hidden', 'true');
//      } else {
//        accordionItems.forEach((function (el) {
//          if (el !== self) {
//            var previousControl = el.querySelector('.navigation__button');
//            var previousContent = el.querySelector('.navigation__inner-list');
//            el.classList.remove('navigation__accordion-item--active');
//            previousControl.setAttribute('aria-expanded', 'false');
//            previousContent.setAttribute('aria-hidden', 'true');
//          }
//        }));
//        self.classList.add('navigation__accordion-item--active');
//        currentControl.setAttribute('aria-expanded', 'true');
//        currentContent.setAttribute('aria-hidden', 'false');
//      }
//    });
//  });
// }

const accordionTriggers = document.querySelectorAll('.navigation__trigger');

const accordionTriggerDisable = (trigger) => {
  trigger.disabled = true;
  setTimeout(() => {
    trigger.disabled = false;
  }, 500);
};

const setHeightOnTransitionEnd = (body) => {
  body.addEventListener('transitionend', () => {
    if (body.style.height !== '0px') {
      body.style.height = 'auto';
    }
  });
};

const accordionOpen = (trigger, body) => {
  if (body.style.height === '0px' || window.getComputedStyle(body).height === '0px') {
    trigger.classList.add('navigation__trigger--active');
    trigger.setAttribute('aria-expanded', 'true');
    body.setAttribute('aria-hidden', 'false');
    body.classList.add('navigation__inner-content--active');
    body.style.height = `${body.scrollHeight}px`;
  }
};

const accordionClose = (trigger, body) => {
  if (body.style.height !== '0px' && window.getComputedStyle(body).height !== '0px') {

    trigger.classList.remove('navigation__trigger--active');
    trigger.setAttribute('aria-expanded', 'false');
    body.setAttribute('aria-hidden', 'true');
    body.style.height = `${body.scrollHeight}px`;
    setTimeout(() => {
      body.style.height = '0';
    }, 0);
    setTimeout(() => {
      body.classList.remove('navigation__inner-content--active');
    }, 700);
  }
};

const accordionToggle = (target) => {
  const trigger = target;
  const body = target.closest('.navigation__accordion-item').querySelector('.navigation__inner-content');

  setHeightOnTransitionEnd(body);

  if (trigger.classList.contains('navigation__trigger--active')) {
    accordionClose(trigger, body);
    accordionTriggerDisable(trigger);
  } else {
    accordionOpen(trigger, body);
    accordionTriggerDisable(trigger);
  }
};

const onButtonClick = () => {
  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (evt) => {
      const self = evt.currentTarget;
      accordionToggle(self);
    });
  });
};

onButtonClick();

// mask

function createPhoneMask(evt) {
  let ind = 0;
  const matrix = '+7(___) ___-__-__';
  const defaultPrefix = matrix.replace(/\D/g, '');
  let value = evt.target.value.replace(/\D/g, '');

  if (defaultPrefix.length >= value.length) {
    value = defaultPrefix;
  }

  evt.target.value = matrix.replace(/./g, (symbol) => {
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
  field.addEventListener('focus', (evt) => {
    if (field.value.length === 0) {
      evt.target.value = '+7';
    }
  });
  field.addEventListener('blur', (evt) => {
    if (field.value === '+7') {
      evt.target.value = '';
    }
  });
}

// validation

const forms = document.querySelectorAll('[name=feedback-form]');
const phoneInputs = document.querySelectorAll('input[type="tel"]');
const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
const MIN_NUMBERS_LENGTH = 16;
const errorMessage = 'Пожалуйста, проверьте правильность введенных данных';

function checkPhoneField(regex, field) {
  const inputValue = field.value.replace(/\D/g, '');
  const valueLength = inputValue.length;

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

phoneInputs.forEach((inputTel) => {
  checkPhoneFocus(inputTel);
  inputTel.addEventListener('keypress', (evt) => {
    if (!/\d/.test(evt.key)) {
      evt.preventDefault();
    }
  });
  inputTel.addEventListener('input', createPhoneMask);
  inputTel.addEventListener('input', (evt) => {
    checkPhoneField(phoneRegex, evt.target);
  });
});

// localStorage

forms.forEach((form) => {
  const nameInput = form.querySelector('input[type="text"]');
  const phoneInput = form.querySelector('input[type="tel"]');
  const feedbackTextarea = form.querySelector('textarea');

  phoneInput.removeAttribute('pattern');

  let storageName = '';
  let storagePhone = '';
  let storageFeedback = '';

  const isStorage = () => {
    try {
      storageName = localStorage.getItem('userName');
      storagePhone = localStorage.getItem('userPhone');
      storageFeedback = localStorage.getItem('userFeedback');
      return true;
    } catch (err) {
      return false;
    }
  };

  const isStorageSupport = isStorage();
  const saveFormData = () => {
    if (isStorageSupport) {
      localStorage.setItem('userName', nameInput.value);
      localStorage.setItem('userPhone', phoneInput.value);
      localStorage.setItem('userFeedback', feedbackTextarea.value);
    }
  };

  const fillForm = () => {
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
  };

  fillForm(form);

  form.addEventListener('submit', () => {
    saveFormData();
  });
});

// modal

const modal = document.querySelector('.modal');
const overlay = modal.querySelector('.overlay');
const openButton = document.querySelector('.main-nav__button a');
const closeButton = modal.querySelector('button[type="button"]');
const popupNameInput = modal.querySelector('input[type="text"]');

function closePopup() {
  modal.classList.remove('modal--show');
  overlay.classList.remove('overlay--show');
  document.body.classList.remove('page-no-scroll');

  openButton.focus();
}

function closeOnButton(evt) {
  evt.preventDefault();
  closePopup();
  closeButton.removeEventListener('click', closeOnButton);
}

function closeOnEnter(evt) {
  if (isEnterEvent(evt)) {
    closePopup();
    closeButton.removeEventListener('keydown', closeOnButton);
  }
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
  openButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.add('modal--show');
    overlay.classList.add('overlay--show');
    document.body.classList.add('page-no-scroll');
    popupNameInput.focus();

    closeButton.addEventListener('click', closeOnButton);
    closeButton.addEventListener('keydown', closeOnEnter);
    overlay.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeOnEsc);
  });
}

openPopup();

// focus

function trapFocus(element) {

  const focusableEls = modal.querySelectorAll('input,button,textarea');
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', (evt) => {
    if (!isTabPressed) {
      return;
    }

    if (evt.shiftKey && evt.key === 'Tab') {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        evt.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        evt.preventDefault();
      }
    }
  });
}

trapFocus(modal);

// scroll

function scrollToElement(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function smoothAnchorScroll() {
  const smoothLinks = document.querySelectorAll('a[href^="#"]:not(a[href="#"]');
  smoothLinks.forEach((smoothLink) => {
    smoothLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      const id = smoothLink.getAttribute('href');
      scrollToElement(document.querySelector(id));
    });
  });
}

smoothAnchorScroll();
