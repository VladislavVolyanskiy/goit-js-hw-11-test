import { cardTemplate } from './js/template';
import LoadMoreBtn from './js/load-more-btn';
import { smoothScroll } from './js/scroll';
import PicsApiService from './js/pics-service';
import { message } from './js/message';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a');

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: false,
});

const picsApiService = new PicsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  loadMoreBtn.hide();
  try {
    picsApiService.query = e.currentTarget.elements.searchQuery.value;
    if (picsApiService.query === '') {
      return message.emptyQuery();
    }
    picsApiService.resetPage();
    picsApiService.fetchPics().then(({ hits, totalHits }) => {
      clearGallery();
      if (hits.length === 0) {
        return message.failure();
      }
      renderGalleryMarkup(hits);
      lightbox.refresh();
      message.success(totalHits);
      if (picsApiService.loadPages > totalHits) {
        loadMoreBtn.hide();
        return message.endInfo();
      }
      loadMoreBtn.show();
    });
  } catch (error) {
    console.log(error);
  }
}

function onLoadMore() {
  try {
    picsApiService.fetchPics().then(({ hits, totalHits }) => {
      if (picsApiService.loadPages > totalHits) {
        renderGalleryMarkup(hits);
        lightbox.refresh();
        loadMoreBtn.hide();
        return message.endInfo();
      }
      renderGalleryMarkup(hits);
      lightbox.refresh();
      loadMoreBtn.show();
      smoothScroll();
    });
  } catch (error) {
    console.log(error);
  }
}

function renderGalleryMarkup(hits) {
  const markup = hits.map(photo => cardTemplate(photo)).join('');
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGallery() {
  refs.galleryContainer.innerHTML = '';
}
