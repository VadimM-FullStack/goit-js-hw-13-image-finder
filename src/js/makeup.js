import photoTemplate from "../templates/photo-card.hbs";
import { refs, loadMoreBtn, photosApiService } from "./base.js";

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

export { onSearch, fetchPhotos, arrowUpScroll };
