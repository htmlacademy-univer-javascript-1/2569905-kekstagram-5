import { isEscKey } from './util.js';

const FORM = document.querySelector('.img-upload__form');
const BODY = document.querySelector('body');
const editingWindowElement = FORM.querySelector('.img-upload__overlay');
const successFormTemplate = document.querySelector('#success').content.querySelector('.success');
const errorFormTemplate = document.querySelector('#error').content.querySelector('.error');
const errorBtnElement = errorFormTemplate.querySelector('.error__button');
const successBtnElement = successFormTemplate.querySelector('.success__button');

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

const successBtnHandler = () => hideSuccessForm();
const errorBtnHandler = () => hideErrorForm();

function hideSuccessForm() {
  document.removeEventListener('click', outOfFormHandler);
  document.removeEventListener('keydown', successKeydownHandler);
  BODY.removeChild(successFormTemplate);
  successBtnElement.removeEventListener('click', successBtnHandler);
}

function hideErrorForm() {
  editingWindowElement.classList.remove('hidden');
  BODY.removeChild(errorFormTemplate);
  errorBtnElement.removeEventListener('click', errorBtnHandler);
  document.removeEventListener('click', outOfFormHandler);
  document.removeEventListener('keydown', errorKeydownHandler);
}

const showSuccessForm = () => {
  successBtnElement.addEventListener('click', successBtnHandler);
  BODY.appendChild(successFormTemplate);
  document.addEventListener('click', outOfFormHandler);
  document.addEventListener('keydown', successKeydownHandler);
};

const showErrorForm = (message) => {
  editingWindowElement.classList.add('hidden');
  errorBtnElement.textContent = 'Попробовать ещё раз';
  errorFormTemplate.querySelector('.error__title').textContent = message;
  errorBtnElement.addEventListener('click', errorBtnHandler);
  BODY.appendChild(errorFormTemplate);
  document.addEventListener('click', outOfFormHandler);
  document.addEventListener('keydown', errorKeydownHandler);
};

export { hideSuccessForm, hideErrorForm, showSuccessForm, showErrorForm };
