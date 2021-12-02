// function createPhoneMask(evt) {
//  var ind = 0;
//  var matrix = '+7(___) ___-__-__';
//  var defaultPrefix = matrix.replace(/\D/g, '');
//  var value = evt.target.value.replace(/\D/g, '');

//  if (defaultPrefix.length >= value.length) {
//    value = defaultPrefix;
//  }

//  evt.target.value = matrix.replace(/./g, function (symbol) {
//    if (/[_\d]/.test(symbol) && ind < value.length) {
//      return value.charAt(ind++);
//    } else {
//      if (ind >= value.length) {
//        return '';
//      } else {
//        return symbol;
//      }
//    }
//  });
// }

// function checkPhoneFocus(field) {
//  field.addEventListener('focus', function (evt) {
//    if (field.value.length === 0) {
//      evt.target.value = '+7';
//    }
//  });
//  field.addEventListener('blur', function (evt) {
//    if (field.value === '+7') {
//      evt.target.value = '';
//    }
//  });
// }


// function checkPhoneField(regex, field) {
//  var inputValue = field.value.replace(/\D/g, '');
//  var valueLength = inputValue.length;

//  if (valueLength === 0) {
//    field.setCustomValidity('Пожалуйста, введите номер');
//    showError(field);
//  } else if (valueLength < MIN_NUMBERS_LENGTH && !regex.test(inputValue)) {
//    field.setCustomValidity(errorMessage);
//    showError(field);
//  } else if (!regex.test(inputValue)) {
//    field.setCustomValidity(errorMessage);
//    showError(field);
//  } else {
//    field.setCustomValidity('');
//    showError(field);
//  }
//  field.reportValidity();
// }

// phoneInputs.forEach(function (inputTel) {
//  checkPhoneFocus(inputTel);
//  inputTel.addEventListener('keypress', function (evt) {
//    // Отменяем ввод не цифр
//    if (!/\d/.test(evt.key)) {
//      evt.preventDefault();
//    }
//  });
//  inputTel.addEventListener('input', createPhoneMask);
//  inputTel.addEventListener('input', function (evt) {
//    checkPhoneField(phoneRegex, evt.target);
//  });
// });

// nameInputs.forEach(function (inputName) {
//  inputName.addEventListener('input', function (evt) {
//    checkNameField(nameRegex, evt.target);
//  });
// });


// localStorage

// var isStorageSupport = true;

// var userData = {
//  name: '',
//  phone: '',
//  feedback: '',
// };

// function isStorage() {
//  try {
//    userData.name = localStorage.getItem('userName');
//    userData.phone = localStorage.getItem('userPhone');
//    userData.feedback = localStorage.getItem('userFeedback');
//    // return true;
//  } catch (err) {
//    // return false;
//    isStorageSupport(false);
//  }
// }

// var isStorageSupport = isStorage();

// function saveFormData(form) {
//  if (isStorageSupport) {
//    localStorage.setItem('userName', form['name'].value);
//    localStorage.setItem('userPhone', form['phone'].value);
//    localStorage.setItem('userFeedback', form['feedback'].value);
//  }
// }

// function fillForm(form) {
//  isStorage();
//  if (userData.name) {
//    form['name'].value = userData.name;
//  }
//  if (userData.phone) {
//    form['phone'].value = userData.phone;
//  }
//  if (userData.name) {
//    form['feedback'].value = userData.feedback;
//  }
// }

// saveFormData();
// fillForm();


// formButtons.forEach(function (button) {
//  button.addEventListener('click', function () {
//    saveFormData();
//  });
// });

// localStorage

// var storageName = '';
// var storagePhone = '';
// var storageFeedback = '';

// function isStorage() {
//  try {
//    storageName = localStorage.getItem('userName');
//    storagePhone = localStorage.getItem('userPhone');
//    storageFeedback = localStorage.getItem('userFeedback');
//    return true;
//  } catch (err) {
//    return false;
//  }
// }

// var isStorageSupport = isStorage();

// function saveFormData() {
//  if (isStorageSupport) {
//    localStorage.setItem('userName', nameInput.value);
//    localStorage.setItem('userPhone', phoneInput.value);
//    localStorage.setItem('userFeedback', feedbackTextarea.value);
//  }
// }

// function fillForm() {
//  isStorage();
//  if (storageName) {
//    nameInput.value = storageName;
//  }
//  if (storagePhone) {
//    phoneInput.value = storagePhone;
//  }
//  if (storageFeedback) {
//    feedbackTextarea.value = storageFeedback;
//  }
// }

// fillForm();
