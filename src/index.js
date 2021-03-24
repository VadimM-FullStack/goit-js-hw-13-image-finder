import "./styles.css";
import {
  onSearch,
  arrowUpScroll,
  photosContainerRef,
  //fetchPhotos, // Кнопка Load more
  //loadMoreBtn, // Кнопка Load more
} from "./js/render-photos.js";
import { renderModalImg } from "./js/modal-photo.js";

const searchFormRefs = document.querySelector(".js-search-form");
const arrowUpRefs = document.querySelector(".arrow-up");

searchFormRefs.addEventListener("submit", onSearch);
arrowUpRefs.addEventListener("click", arrowUpScroll);
photosContainerRef.addEventListener("click", renderModalImg);

//loadMoreBtn.refs.button.addEventListener("click", renderPhotos); // Кнопка Load more
