'use strict';

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

// .scrollHeight + 'px';
