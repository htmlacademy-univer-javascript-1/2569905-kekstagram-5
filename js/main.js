import './util.js';
import { createPost } from './data.js';
import { renderPictures } from './picture.js';
import { renderBigPicture } from './big-picture.js';
import { formValidation } from './load-form.js';

const posts = [];
for (let i = 0; i < 25; i++) {
  posts.push(createPost());
}

renderPictures(posts);

const picturesContainer = document.querySelector('.pictures');

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

