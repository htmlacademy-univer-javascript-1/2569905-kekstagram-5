import { applyEffect, form } from './effects.js';
import { showSuccessForm, showErrorForm } from './result-massage.js';

const INIT_SCALE = 100;
const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const HASHTAG_PATTERN = /^#[A-Za-z0-9]+$/;
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const closeForm = (elements) => {
  const { overlay, body, uploadInput, hashtagInput, descriptionInput, pristine, /*slider*/ imagePreview } = elements;
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';
  pristine.reset();
  //slider.noUiSlider.set([100]);
  imagePreview.style.filter = '';
  imagePreview.style.transform = 'scale(1)';
  elements.scaleValue.value = `${INIT_SCALE}%`;
  elements.scaleHidden.value = INIT_SCALE;
};

const formValidation = () => {
  const uploadInput = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const body = document.body;
  const imagePreview = document.querySelector('.img-upload__preview img');
  const scaleValue = document.querySelector('.scale__control--value');
  const scaleHidden = form.querySelector('input[name="scale"]');
  const hashtagInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');
  const cancelButton = document.querySelector('#upload-cancel');
  const slider = document.querySelector('.effect-level__slider');
  const effectValueInport = document.querySelector('.effect-level__value');
  const effectsRadio = document.querySelectorAll('.effects__radio');

  let currentScale = INIT_SCALE;

  const pristine = new Pristine(form, {
    classTo: 'form-group',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help',
  });

  pristine.addValidator(hashtagInput, (value) => {
    const hashtags = value.split(' ').filter(Boolean);
    const uniqueHashtags = new Set(hashtags);
    return (
      hashtags.length <= MAX_HASHTAGS &&
      hashtags.every((tag) => HASHTAG_PATTERN.test(tag)) &&
      hashtags.length === uniqueHashtags.size
    );
  }, 'Некорректные хэштеги');

  pristine.addValidator(descriptionInput, (value) => value.length <= MAX_COMMENT_LENGTH, `Максимальная длина комментария ${MAX_COMMENT_LENGTH} символов`);

  noUiSlider.create(slider, {
    start: [100],
    connect: [true, false],
    range: { min: 0, max: 100 },
    step: 1,
  });

  slider.noUiSlider.on('update', ([value]) => {
    const selectedEffect = document.querySelector('.effects__radio:checked').value;
    effectValueInport.value = value;
    applyEffect(imagePreview, selectedEffect, value);
  });

  effectsRadio.forEach((radio) => {
    radio.addEventListener('change', () => {
      const effect = radio.value;
      if (effect === 'none') {
        slider.classList.add('hidden');
        document.querySelector('.img-upload__effect-level').classList.add('hidden');
        imagePreview.style.filter = '';
      } else {
        slider.classList.remove('hidden');
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
        slider.noUiSlider.set([100]);
        effectValueInport.value = 100;
        applyEffect(imagePreview, effect, 100);
      }
    });
  });

  const updateScale = () => {
    scaleValue.value = `${currentScale}%`;
    scaleHidden.value = currentScale;
    imagePreview.style.transform = `scale(${currentScale / 100})`;
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

  uploadInput.addEventListener('change', () => {
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
    const file = uploadInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    effectsRadio.forEach((radio) => {
      if (radio.value === 'none') {
        radio.checked = true;
      }
    });
    slider.classList.add('hidden');
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    imagePreview.style.filter = '';
  });

  cancelButton.addEventListener('click', () => closeForm({ overlay: overlay, body: body, uploadInput: uploadInput, hashtagInput: hashtagInput, descriptionInput: descriptionInput, pristine, slider: slider, imagePreview: imagePreview, scaleValue: scaleValue, scaleHidden: scaleHidden }));

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && ![uploadInput, hashtagInput, descriptionInput].includes(document.activeElement)) {
      closeForm({ overlay: overlay, body: body, uploadInput: uploadInput, hashtagInput: hashtagInput, descriptionInput: descriptionInput, pristine, slider: slider, imagePreview: imagePreview, scaleValue: scaleValue, scaleHidden: scaleHidden });
    }
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const submitButton = form.querySelector('.img-upload__submit');
      submitButton.disabled = true;

      fetch(BASE_URL, {
        method: 'POST',
        body: new FormData(form),
      })
        .then((response) => {
          if (response.ok) {
            closeForm({ overlay: overlay, body: body, uploadInput: uploadInput, hashtagInput: hashtagInput, descriptionInput: descriptionInput, pristine, slider: slider, imagePreview: imagePreview, scaleValue: scaleValue, scaleHidden: scaleHidden });
            showSuccessForm();
            submitButton.disabled = false;
          } else {
            showErrorForm('Ошибка отправки данных');
          }
        });
    } else {
      showErrorForm('Форма содержит ошибки');
    }
  });
};

export { formValidation, closeForm };
