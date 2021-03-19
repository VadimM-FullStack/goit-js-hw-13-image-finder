import photoTemplate from "./templates/photo-card.hbs";
import PhotosApiService from "./js/api-service.js";
import LoadMoreBtn from "./js/load-more-btn.js";
import "./styles.css";

const refs = {
  searchForm: document.querySelector(".js-search-form"),
  arrowUp: document.querySelector(".arrow-up"),
  photosContainer: document.querySelector(".js-photos-container"),
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
    scrollToNewElements();
  });
}

function appendPhotosMarkup(photos) {
  refs.photosContainer.insertAdjacentHTML("beforeend", photoTemplate(photos));
}

function clearPhotosContainer() {
  refs.photosContainer.innerHTML = "";
}

function scrollToNewElements() {
  const totalScrollHeight = refs.photosContainer.clientHeight + 80;
  setTimeout(() => {
    window.scrollTo({
      top: totalScrollHeight,
      behavior: "smooth",
    });
  }, 500);
}

function arrowUpScroll() {
  window.scrollTo({
    top: 0,
    left: 1,
    behavior: "smooth",
  });
}

refs.searchForm.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchPhotos);
refs.arrowUp.addEventListener("click", arrowUpScroll);
