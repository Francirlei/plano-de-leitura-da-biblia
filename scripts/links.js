const links = document.getElementById("links");
const modalLink = document.getElementById("modal-links");
const modalIconClose = document.querySelector(".modal__close__icon");
const modalBtnClose = document.querySelector(".modal__close__btn");


links.addEventListener("click", (el) => {
  el.preventDefault();

  modalLink.showModal();
});

modalIconClose.addEventListener("click", (el) => {
  modalLink.close();
});

modalBtnClose.addEventListener("click", (el) => {
  modalLink.close();
});