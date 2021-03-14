const BASE_URL = "https://pixabay.com/api/";
const PIXABAY_KEY = "20677562-9c517eaf9134a4d9aa45dfdde";

export default class PhotosApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  fetchPhotos() {
    const url = `${BASE_URL}?key=${PIXABAY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
