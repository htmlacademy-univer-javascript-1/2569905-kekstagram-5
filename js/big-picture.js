const isEscKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function closeUserModal() {
  const fullPictures = document.querySelector('.big-picture');
  const commentsCount = fullPictures.querySelector('.social__comment-count');
  const commentLoader = fullPictures.querySelector('.comments-loader');
  const modal = document.querySelector('.big-picture');
  modal.classList.add('hidden');
  commentsCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const showFullPhoto = (photo) => {
  const fullPictures = document.querySelector('.big-picture');
  const fullPicturesImg = fullPictures.querySelector('.big-picture__img');
  const fullPicturesLikes = fullPictures.querySelector('.likes-count');
  const fullPicturesCommentsCount = fullPictures.querySelector('.comments-count');
  const fullPicturesDescription = fullPictures.querySelector('.social__caption');
  const commentLoader = fullPictures.querySelector('.comments-loader');
  const commentsCount = fullPictures.querySelector('.social__comment-count');
  const socialCommentsList = fullPictures.querySelector('.social__comment');
  const closeButton = document.querySelector('.big-picture__cancel');

  fullPicturesImg.src = photo.url;
  fullPicturesImg.alt = photo.description;
  fullPicturesLikes.textContent = photo.likes;
  fullPicturesCommentsCount.textContent = photo.comments.length;
  fullPicturesDescription.textContent = photo.description;

  socialCommentsList.innetHTML = '';
  photo.comments.froEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class='social__picture' src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
      `;
    socialCommentsList.appendChild(commentElement);
  });

  fullPictures.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closeUserModal);
};

export const makeFull = (pictures) => {
  const PICTURE_ELEMENT = document.querySelector('.pictures');
  PICTURE_ELEMENT.addEventListener('click', (evt) => {
    const photoElement = evt.target.closest('[data-thumbnail-id]');
    if (!photoElement) {
      return;
    }
    const index = photoElement.dataset.thumbnailid;
    evt.preventDefault();
    const photo = pictures.find(
      (item) => item.id === Number(index)
    );
    showFullPhoto(photo);
  });
};


