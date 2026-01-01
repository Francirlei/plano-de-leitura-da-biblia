const links = document.getElementById("links");
const modalLink = document.getElementById("modal-links");
const modalIconClose = document.querySelectorAll(".modal__close__icon");
const modalBtnClose = document.querySelectorAll(".modal__close__btn");

const modalTarget = document.querySelectorAll("[data-modal-target]") 


modalTarget.forEach((target) => {
  const modal = document.querySelector(`[data-modal=${target.dataset.modalTarget}]`)
  target.addEventListener("click", (el) => {
    el.preventDefault();

    modal.showModal();
  });
})


modalIconClose.forEach((icon) => {
  icon.addEventListener("click", () => {
    document.querySelectorAll("[data-modal]").forEach((modal) => {
      modal.close();
    });
  });
});

modalBtnClose.forEach((icon) => {
  icon.addEventListener("click", () => {
    document.querySelectorAll("[data-modal]").forEach((modal) => {
      modal.close();
    });
  });
})