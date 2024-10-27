import { NAMES, MESSAGES, DESCRIPTIONS } from './constants.js';

const createId = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateDescriptionPhotoId = createId();
const generatePhotoId = createId();
const generateCommentId = createId();

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + 1;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0,
  elements.length - 1)];

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createDescriptionPhoto = () => ({
  id: generateDescriptionPhotoId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)},createComments),
});

export { createId, generateDescriptionPhotoId, generatePhotoId, generateCommentId, getRandomInteger, getRandomArrayElement, createComments, createDescriptionPhoto };
