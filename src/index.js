import photoTemplate from "./templates/photo-card.hbs";
import PhotosApiService from "./js/apiService.js";
import LoadMoreBtn from "./js/load-more-btn.js";
import "./styles.css";

const refs = {
  searchForm: document.querySelector(".js-search-form"),
  photosContainer: document.querySelector(".js-photos-container"),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchPhotos);

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
