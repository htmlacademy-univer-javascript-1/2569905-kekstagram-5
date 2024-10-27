import { generateDescriptionPhotoId, generatePhotoId, generateCommentId, getRandomInteger, getRandomArrayElement } from './util.js';
import { NAMES, MESSAGES, DESCRIPTIONS, DESCRIPTION_COUNT } from './constants.js';

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

const descriptionsPhoto = Array.from({length: DESCRIPTION_COUNT}, createDescriptionPhoto);

export { descriptionsPhoto, createDescriptionPhoto, createComments };
