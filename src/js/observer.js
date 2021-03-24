import { photosApiService, renderPhotos } from "./render-photos.js";

const observerGuardRef = document.querySelector(".observer-guard");

function createdObserver() {
  const onIntersecting = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && photosApiService.query !== "") {
        renderPhotos();
      }
    });
  };

  const optionsObserver = {
    root: null,
    rootMargin: "300px",
  };

  const observer = new IntersectionObserver(onIntersecting, optionsObserver);
  observer.disconnect();
  observer.observe(observerGuardRef);
}

export { createdObserver };
