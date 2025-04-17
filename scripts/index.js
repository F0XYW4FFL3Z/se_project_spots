const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// profile elements
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileAddButton = document.querySelector(".profile__add-btn");

// edit modal elements
const editModal = document.querySelector("#edit-profile-modal");
const editModalFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescInput = editModal.querySelector(
  "#profile-description-input"
);
const editModalSubmitBtn = editModal.querySelector(".modal__submit-btn");

// add card modal elements
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalFormElement = addCardModal.querySelector(".modal__form");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close-btn");
const addCardModalLinkInput = addCardModal.querySelector(
  "#add-card-link-input"
);
const addCardModalNameInput = addCardModal.querySelector(
  "#add-card-name-input"
);
const addCardModalSubmitBtn = addCardModal.querySelector(".modal__submit-btn");

// preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

// other card elements
const cardLink = addCardModal.querySelector("#add-card-link-input");
const cardName = addCardModal.querySelector("#add-card-name-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElememt(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  // toggles like button
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  // deletes card
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  // opens a preview of the card's image
  cardImage.addEventListener("click", () => {
    openModal(previewModal);

    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDesc.textContent = editModalDescInput.value;
  closeModal(editModal);
  disableButton(editModalSubmitBtn, settings);
}

function handleCardFormSubmit(e) {
  e.preventDefault();

  const inputValues = {
    name: addCardModalNameInput.value,
    link: addCardModalLinkInput.value,
  };

  e.target.reset();
  disableButton(addCardModalSubmitBtn, settings);
  const cardElement = getCardElememt(inputValues);
  cardsList.prepend(cardElement);

  closeModal(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescInput.value = profileDesc.textContent;
  resetValidation(
    editModalFormElement,
    [editModalNameInput, editModalDescInput],
    settings
  );
  openModal(editModal);
});
editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardModalCloseBtn.addEventListener("click", () => {
  closeModal(addCardModal);
});

editModalFormElement.addEventListener("submit", handleEditFormSubmit);
addCardModalFormElement.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElememt(item);
  cardsList.prepend(cardElement);
});
