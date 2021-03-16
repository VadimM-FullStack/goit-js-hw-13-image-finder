import photoTemplate from "./templates/photo-card.hbs";
import PhotosApiService from "./js/api-service.js";
import LoadMoreBtn from "./js/load-more-btn.js";
import { arrowUpScroll } from "./js/scroll-window.js";
import "./styles.css";
/* import { modalImage } from "./js/modal-image.js"; */
/* import { observer } from "./js/intersection-observer.js"; */

const refs = {
  searchForm: document.querySelector(".js-search-form"),
  input: document.querySelector(".input"),
  arrowUp: document.querySelector(".arrow-up"),
  photosContainer: document.querySelector(".js-photos-container"),
  photosRef: document.querySelector(".image"),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const photosApiService = new PhotosApiService();

function onSearch(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.query.value;

  if (photosApiService.query === "") {
    return alert("Make the correct input");
  }

  loadMoreBtn.show();
  photosApiService.resetPage();
  clearPhotosContainer();
  fetchPhotos();
}

function fetchPhotos() {
  loadMoreBtn.disable();
  photosApiService.fetchPhotos().then(photos => {
    appendPhotosMarkup(photos);
    loadMoreBtn.enable();
  });
}

function appendPhotosMarkup(photos) {
  refs.photosContainer.insertAdjacentHTML("beforeend", photoTemplate(photos));
}

function clearPhotosContainer() {
  refs.photosContainer.innerHTML = "";
}

refs.searchForm.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchPhotos);
refs.arrowUp.addEventListener("click", arrowUpScroll);
