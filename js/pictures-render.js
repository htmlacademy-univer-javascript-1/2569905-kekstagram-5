const renderPictures = function(picturesData) {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  const template = document.getElementById('picture').content;

  picturesData.forEach((picture) => {
    const pictureElement = template.cloneNode(true);
    const pictureImg = pictureElement.querySelector('.picture__img');
    const likesCount = pictureElement.querySelector('.picture__likes');
    const commentsCount = pictureElement.querySelector('.picture__comments');

    pictureElement.querySelector('.picture').setAttribute('data-id', picture.id);

    pictureImg.src = picture.url;
    pictureImg.alt = picture.description;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;
    fragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragment);
};

export { renderPictures };
