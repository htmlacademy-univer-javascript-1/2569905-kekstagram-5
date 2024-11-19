import { generatePhotoId } from './util';

const PICTURES_TITLE = document.querySelector('.pictures__title');
PICTURES_TITLE.classList.remove('visually-hidden');

const PICTURE_ELEMENT = document.querySelector('.pictures');
const PICTURE_TEMPLATE = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const RANDOM_PICTURES = generatePhotoId();
const PICTURES_FRAGMENT = document.createDocumentFragment();

RANDOM_PICTURES.forEach(({url, description, liles, comments}) => {
  const PICTRE = PICTURE_TEMPLATE.cloneNode(true);
  PICTRE.querySelector('.picture__img').src = url;
  PICTRE.querySelector('.picture__img').alt = description;
  PICTRE.querySelector('.picture__likes').textContent = liles;
  PICTRE.querySelector('.picture__comments').textContent = comments;
  PICTURES_FRAGMENT.appendChild(PICTRE);
});

PICTURE_ELEMENT.appendChild(PICTURES_FRAGMENT);
