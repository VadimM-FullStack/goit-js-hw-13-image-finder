//import LoadMoreBtn from "./load-more-btn.js"; // Кнопка Load more
import PhotosApiService from "./api-service.js";
import photoTemplate from "../templates/photo-card.hbs";
import { createdObserver } from "./observer.js";
import "../../node_modules/@pnotify/core/dist/PNotify.css";
import "../../node_modules/@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/BrightTheme.css";
import { info } from "@pnotify/core";

// Кнопка Load more
/* const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
}); */

const photosApiService = new PhotosApiService();
const photosContainerRef = document.querySelector(".js-photos-container");
const noticeOptions = {
  shadow: true,
  hide: true,
  delay: 700,
};

function onSearch(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.query.value;

  if (photosApiService.query === "") {
    return alert("Make the correct input");
  }

  photosApiService.resetPage();
  clearPhotosContainer();
  //renderPhotos(); // Кнопка Load more
  //loadMoreBtn.show(); // Кнопка Load more
  createdObserver();
}

function renderPhotos() {
  //loadMoreBtn.disable(); // Кнопка Load more
  photosApiService.fetchPhotos().then(photos => {
    appendPhotosMarkup(photos);

    //loadMoreBtn.enable(); // Кнопка Load more
    //scrollToNewElements(); // Кнопка Load more
  });
  renderNotify(
    photosApiService.searchQuery,
    photosApiService.page,
    noticeOptions,
  );
}

function appendPhotosMarkup(photos) {
  photosContainerRef.insertAdjacentHTML("beforeend", photoTemplate(photos));
}

function clearPhotosContainer() {
  photosContainerRef.innerHTML = "";
}

function renderNotify(query, page, noticeOptions) {
  info({ text: `"${query}" - page ${page}`, ...noticeOptions });
}

function arrowUpScroll() {
  window.scrollTo({
    top: 0,
    left: 1,
    behavior: "smooth",
  });
}

// Кнопка Load more
/* function scrollToNewElements() {
  const totalScrollHeight = photosContainerRef.clientHeight + 80;
  setTimeout(() => {
    window.scrollTo({
      top: totalScrollHeight,
      behavior: "smooth",
    });
  }, 500);
} */

export {
  photosApiService,
  onSearch,
  renderPhotos,
  arrowUpScroll,
  photosContainerRef,
  /* loadMoreBtn */
};
