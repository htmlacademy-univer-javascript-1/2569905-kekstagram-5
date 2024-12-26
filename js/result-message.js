import { form } from './effects.js';
import { isEscKey } from './util.js';

const body = document.querySelector('body');
const editingWindowElement = form.querySelector('.img-upload__overlay');
const successFormTemplate = document.querySelector('#success').content.querySelector('.success');
const errorFormTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = errorFormTemplate.querySelector('.error__button');
const successButtonElement = successFormTemplate.querySelector('.success__button');

const outOfFormHandler = (evt) => {
  if (evt.target === successFormTemplate && evt.target !== successFormTemplate.querySelector('.success__inner')) {
    hideSuccessForm();
  }
  if (evt.target === errorFormTemplate && evt.target !== errorFormTemplate.querySelector('.error__inner')) {
    hideErrorForm();
  }
};

const successKeydownHandler = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideSuccessForm();
  }
};

const errorKeydownHandler = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    hideErrorForm();
  }
};

const successButtonHandler = () => hideSuccessForm();
const errorButtonHandler = () => hideErrorForm();

function hideSuccessForm() {
  document.removeEventListener('click', outOfFormHandler);
  document.removeEventListener('keydown', successKeydownHandler);
  body.removeChild(successFormTemplate);
  successButtonElement.removeEventListener('click', successButtonHandler);
}

function hideErrorForm() {
  editingWindowElement.classList.remove('hidden');
  body.removeChild(errorFormTemplate);
  errorButtonElement.removeEventListener('click', errorButtonHandler);
  document.removeEventListener('click', outOfFormHandler);
  document.removeEventListener('keydown', errorKeydownHandler);
}

const showSuccessForm = () => {
  successButtonElement.addEventListener('click', successButtonHandler);
  body.appendChild(successFormTemplate);
  document.addEventListener('click', outOfFormHandler);
  document.addEventListener('keydown', successKeydownHandler);
};

const showErrorForm = (message) => {
  editingWindowElement.classList.add('hidden');
  errorButtonElement.textContent = 'Попробовать ещё раз';
  errorFormTemplate.querySelector('.error__title').textContent = message;
  errorButtonElement.addEventListener('click', errorButtonHandler);
  body.appendChild(errorFormTemplate);
  document.addEventListener('click', outOfFormHandler);
  document.addEventListener('keydown', errorKeydownHandler);
};

export { hideSuccessForm, hideErrorForm, showSuccessForm, showErrorForm };
