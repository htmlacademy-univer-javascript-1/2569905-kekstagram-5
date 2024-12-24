/* eslint-disable no-alert */
import { renderPictures } from './pictures-render.js';
import { renderBigPicture } from './big-picture-render.js';
import { formValidation } from './load-form.js';
import { getData } from './api.js';


const picturesContainer = document.querySelector('.pictures');
let posts = [];

const fetchPosts = async () => {
  try {
    posts = await getData();
    renderPictures(posts);
  } catch (error) {
    alert('Не удалось загрузить фотографии. Попробуйте позже.');
  }
};

fetchPosts();

const handlePictureClick = function(evt) {
  const pictureElement = evt.target.closest('.picture');
  if (pictureElement) {
    const postId = pictureElement.getAttribute('data-id');
    const post = posts.find((p) => p.id === Number(postId));
    if (post) {
      renderBigPicture(post);
    }
  }
};

picturesContainer.addEventListener('click', handlePictureClick);

formValidation();

