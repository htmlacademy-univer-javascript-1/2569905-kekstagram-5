const COMMENTS_PER_PAGE = 5;
const ESC_KEYCODE = 27;

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.className = 'social__comment';
  commentElement.innerHTML = `<img class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
        <p class="social__text">${comment.message}</p>`;
  return commentElement;
};

const updateCommentCounter = (current, total, commentCountContainer) => {
  if(!document.querySelector('.comments-count')) {
    const newCommentsCount = document.createElement('span');
    newCommentsCount.className = 'comments-count';
    commentCountContainer.appendChild(newCommentsCount);
  }
  commentCountContainer.textContent = `${current} из ${total} комментариев`;

};


const showComments = (picture, commentsList, commentCountContainer, commentsLoader, currentCommentIndex) => {
  const commentsToShow = picture.comments.slice(currentCommentIndex, currentCommentIndex + COMMENTS_PER_PAGE);

  commentsToShow.forEach((comment) => {
    commentsList.appendChild(createCommentElement(comment));
  });
  const newCurrentCommentIndex = currentCommentIndex + commentsToShow.length;
  updateCommentCounter(newCurrentCommentIndex, picture.comments.length, commentCountContainer);

  if (newCurrentCommentIndex >= picture.comments.length) {
    commentsLoader.classList.add('hidden');
  }

  return newCurrentCommentIndex;
};


const closeModal = (bigPicture, body, onEscKeyPress) => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyPress);
};

const renderBigPicture = (picture) => {
  const bigPictureElement = document.querySelector('.big-picture');
  const bodyElement = document.body;
  const imageElement = bigPictureElement.querySelector('.big-picture__img img');
  const captionElement = bigPictureElement.querySelector('.social__caption');
  const likesCountElement = bigPictureElement.querySelector('.likes-count');
  const commentsCountElement = bigPictureElement.querySelector('.comments-count');
  const commentsListElement = bigPictureElement.querySelector('.social__comments');
  const commentCountContainerElement = bigPictureElement.querySelector('.social__comment-count');
  const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

  commentCountContainerElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  imageElement.src = picture.url;
  imageElement.alt = picture.description;
  captionElement.textContent = picture.description;
  likesCountElement.textContent = `${picture.likes}`;
  commentsCountElement.textContent = `${picture.comments.length}`;

  commentsListElement.innerHTML = '';
  let currentCommentIndex = 0;

  const handleCommentsLoaderClick = () => {
    currentCommentIndex = showComments(picture, commentsListElement, commentCountContainerElement, commentsLoaderElement, currentCommentIndex);
  };

  handleCommentsLoaderClick();


  commentsLoaderElement.addEventListener('click', handleCommentsLoaderClick);


  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  const onEscKeyPress = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal(bigPictureElement, bodyElement, onEscKeyPress);
    }
  };

  document.addEventListener('keydown', onEscKeyPress);
  bigPictureElement.querySelector('.big-picture__cancel').addEventListener('click', () => closeModal(bigPictureElement, bodyElement, onEscKeyPress));
};


export { renderBigPicture };
