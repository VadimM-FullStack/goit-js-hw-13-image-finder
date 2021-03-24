import "basiclightbox/dist/basicLightbox.min.css";
import * as basicLightbox from "basiclightbox";

const modalImgTemplate = document.querySelector(".modal-img-template");
const modalImg = basicLightbox.create(modalImgTemplate);

function renderModalImg(event) {
  if (!event.target.classList.contains("small-img")) return;
  const src = event.target.dataset.fullImageSrc;
  const modalImgRef = modalImg.element().querySelector(".modal-img");
  modalImgRef.src = src;
  modalImg.show();
}

export { renderModalImg };
