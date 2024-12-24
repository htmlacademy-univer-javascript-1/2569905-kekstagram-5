const FORM = document.querySelector('.img-upload__form');

const applyEffect = (image, effect, value) => {
  switch (effect) {
    case 'chrome':
      image.style.filter = `grayscale(${value / 100})`;
      break;
    case 'sepia':
      image.style.filter = `sepia(${value / 100})`;
      break;
    case 'marvin':
      image.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      image.style.filter = `blur(${(value / 100) * 3}px)`;
      break;
    case 'heat':
      image.style.filter = `brightness(${1 + (value / 100) * 2})`;
      break;
    default:
      image.style.filter = '';
      break;
  }
};

export { applyEffect, FORM };

