const addReviewModal = document.getElementById('add-modal');
const startAddReviewButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddReviewButton = addReviewModal.querySelector('.btn--passive');
const confirmAddReviewButton = cancelAddReviewButton.nextElementSibling;
const userInputs = addReviewModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteReviewModal = document.getElementById('delete-modal');

const reviews = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  if (reviews.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const closeReviewDeletionModal = () => {
  toggleBackdrop();
  deleteReviewModal.classList.remove('visible');
};

const deleteReviewHandler = reviewId => {
  let reviewIndex = 0;
  for (const review of reviews) {
    if (review.id === reviewId) {
      break;
    }
    reviewIndex++;
  }
  reviews.splice(reviewIndex, 1);
  const listRoot = document.getElementById('review-list');
  listRoot.children[reviewIndex].remove();
  closeReviewDeletionModal();
  updateUI();
};

const startDeleteReviewHandler = reviewId => {
  deleteReviewModal.classList.add('visible');
  toggleBackdrop();

  const cancelDeletionButton = deleteReviewModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteReviewModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteReviewModal.querySelector('.btn--danger');
    
  cancelDeletionButton.removeEventListener('click', closeReviewDeletionModal);

  cancelDeletionButton.addEventListener('click', closeReviewDeletionModal);
  confirmDeletionButton.addEventListener(
    'click',
    deleteReviewHandler.bind(null, reviewId)
  );
};

const renderNewReviewElement = (id, title, imageUrl, rating) => {
  const newReviewElement = document.createElement('li');
  newReviewElement.className = 'review-element';
  newReviewElement.innerHTML = `
    <div class="review-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="review-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newReviewElement.addEventListener(
    'click',
    startDeleteReviewHandler.bind(null, id)
  );
  const listRoot = document.getElementById('review-list');
  listRoot.append(newReviewElement);
};

const closeReviewModal = () => {
  addReviewModal.classList.remove('visible');
};

const showReviewModal = () => {
  addReviewModal.classList.add('visible');
  toggleBackdrop();
};

const clearReviewInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const cancelAddReviewhandler = () => {
  closeReviewModal();
  toggleBackdrop();
  clearReviewInput();
};

const addReviewHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newReview = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  reviews.push(newReview);
  console.log(reviews);
  closeReviewModal();
  toggleBackdrop();
  clearReviewInput();
  renderNewReviewElement(
    newReview.id,
    newReview.title,
    newReview.image,
    newReview.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeReviewModal();
  closeReviewDeletionModal();
  clearReviewInput();
};

startAddReviewButton.addEventListener('click', showReviewModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddReviewButton.addEventListener('click', cancelAddReviewhandler);
confirmAddReviewButton.addEventListener('click', addReviewHandler);
