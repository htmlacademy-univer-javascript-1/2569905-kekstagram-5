import { sendData } from './api-new.js';
import { applyEffect } from './effects.js';
//import { showSuccessForm, showErrorForm } from './result-massage.js';


const INIT_SCALE = 100;
const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const HASHTAG_PATTERN = /^#[A-Za-z0-9]+$/;

const closeForm = (elements) => {
  const { overlay, body, uploadInput, hashtagInput, descriptionInput, pristine, slider, imagePreview } = elements;
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';
  pristine.reset();
  slider.noUiSlider.set([100]);
  imagePreview.style.filter = '';
  imagePreview.style.transform = 'scale(1)';
  elements.scaleValue.value = `${INIT_SCALE}%`;
  elements.scaleHidden.value = INIT_SCALE;
};

const formValidation = () => {
  const FORM = document.querySelector('.img-upload__form');
  const UPLOAD_INPUT = document.querySelector('.img-upload__input');
  const OVERLAY = document.querySelector('.img-upload__overlay');
  const BODY = document.body;
  const IMAGE_PREVIEW = document.querySelector('.img-upload__preview img');
  const SCALE_VALUE = document.querySelector('.scale__control--value');
  const SCALE_HIDDEN = FORM.querySelector('input[name="scale"]');
  const HASHTAG_INPUT = document.querySelector('.text__hashtags');
  const DESCRIPTION_INPUT = document.querySelector('.text__description');
  const CANCEL_BUTTON = document.querySelector('#upload-cancel');
  const SLIDER = document.querySelector('.effect-level__slider');
  const EFFECT_VALUE_INPUT = document.querySelector('.effect-level__value');
  const EFFECT_RADIOS = document.querySelectorAll('.effects__radio');

  let currentScale = INIT_SCALE;

  const pristine = new Pristine(FORM, {
    classTo: 'form-group',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help',
  });

  // Валидация хэштегов
  pristine.addValidator(HASHTAG_INPUT, (value) => {
    const hashtags = value.split(' ').filter(Boolean);
    const uniqueHashtags = new Set(hashtags);
    return (
      hashtags.length <= MAX_HASHTAGS &&
      hashtags.every((tag) => HASHTAG_PATTERN.test(tag)) &&
      hashtags.length === uniqueHashtags.size
    );
  }, 'Некорректные хэштеги');

  // Валидация комментария
  pristine.addValidator(DESCRIPTION_INPUT, (value) => value.length <= MAX_COMMENT_LENGTH, `Максимальная длина комментария ${MAX_COMMENT_LENGTH} символов`);

  // Настройка слайдера
  noUiSlider.create(SLIDER, {
    start: [100],
    connect: [true, false],
    range: { min: 0, max: 100 },
    step: 1,
  });

  SLIDER.noUiSlider.on('update', ([value]) => {
    const selectedEffect = document.querySelector('.effects__radio:checked').value;
    EFFECT_VALUE_INPUT.value = value;
    applyEffect(IMAGE_PREVIEW, selectedEffect, value);
  });

  EFFECT_RADIOS.forEach((radio) => {
    radio.addEventListener('change', () => {
      const effect = radio.value;
      SLIDER.noUiSlider.set([100]);
      EFFECT_VALUE_INPUT.value = 100;
      applyEffect(IMAGE_PREVIEW, effect, 100);
    });
  });

  // Масштаб изображения
  const updateScale = () => {
    SCALE_VALUE.value = `${currentScale}%`;
    SCALE_HIDDEN.value = currentScale;
    IMAGE_PREVIEW.style.transform = `scale(${currentScale / 100})`;
  };


  document.querySelector('.scale__control--smaller').addEventListener('click', () => {
    if (currentScale > MIN_SCALE) {
      currentScale -= SCALE_STEP;
      updateScale();
    }
  });

  document.querySelector('.scale__control--bigger').addEventListener('click', () => {
    if (currentScale < MAX_SCALE) {
      currentScale += SCALE_STEP;
      updateScale();
    }
  });

  // Открытие формы
  UPLOAD_INPUT.addEventListener('change', () => {
    OVERLAY.classList.remove('hidden');
    BODY.classList.add('modal-open');
    const file = UPLOAD_INPUT.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        IMAGE_PREVIEW.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Закрытие формы
  CANCEL_BUTTON.addEventListener('click', () => closeForm({ overlay: OVERLAY, body: BODY, uploadInput: UPLOAD_INPUT, hashtagInput: HASHTAG_INPUT, descriptionInput: DESCRIPTION_INPUT, pristine, slider: SLIDER, imagePreview: IMAGE_PREVIEW, scaleValue: SCALE_VALUE, scaleHidden: SCALE_HIDDEN }));

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && ![UPLOAD_INPUT, HASHTAG_INPUT, DESCRIPTION_INPUT].includes(document.activeElement)) {
      closeForm({ overlay: OVERLAY, body: BODY, uploadInput: UPLOAD_INPUT, hashtagInput: HASHTAG_INPUT, descriptionInput: DESCRIPTION_INPUT, pristine, slider: SLIDER, imagePreview: IMAGE_PREVIEW, scaleValue: SCALE_VALUE, scaleHidden: SCALE_HIDDEN });
    }
  });

  // Отправка формы

  FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData();

    if (pristine.validate()) {
      const submitButton = FORM.querySelector('.img-upload__submit');
      submitButton.disabled = true;

      fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
        method: 'POST',
        body: new FormData(FORM),
      })
        .then((response) => {
          if (response.ok) {
            closeForm({ overlay: OVERLAY, body: BODY, uploadInput: UPLOAD_INPUT, hashtagInput: HASHTAG_INPUT, descriptionInput: DESCRIPTION_INPUT, pristine, slider: SLIDER, imagePreview: IMAGE_PREVIEW, scaleValue: SCALE_VALUE, scaleHidden: SCALE_HIDDEN });
            //console.log('Успешно отправлено!');
          } else {
            throw new Error('Ошибка отправки данных');
          }
        });
    } else {
      throw new Error('Форма содержит ошибки');
    }
  });
};


export { formValidation, closeForm };
