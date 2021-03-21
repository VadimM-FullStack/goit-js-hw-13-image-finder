import { refs, loadMoreBtn } from "./js/base.js";
import { onSearch, fetchPhotos, arrowUpScroll } from "./js/makeup.js";
import "./styles.css";

refs.searchForm.addEventListener("submit", onSearch);
refs.arrowUp.addEventListener("click", arrowUpScroll);
loadMoreBtn.refs.button.addEventListener("click", fetchPhotos);
