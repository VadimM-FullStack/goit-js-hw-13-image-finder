import PhotosApiService from "./api-service.js";
import LoadMoreBtn from "./load-more-btn.js";

const BASE_URL = "https://pixabay.com/api/";
const PIXABAY_KEY = "20677562-9c517eaf9134a4d9aa45dfdde";

const refs = {
  searchForm: document.querySelector(".js-search-form"),
  arrowUp: document.querySelector(".arrow-up"),
  photosContainer: document.querySelector(".js-photos-container"),
};

const photosApiService = new PhotosApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

export { BASE_URL, PIXABAY_KEY, refs, loadMoreBtn, photosApiService };
