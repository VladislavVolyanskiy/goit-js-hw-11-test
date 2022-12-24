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
  selector: '.load-more-btn',
  hidden: false,
});

const picsApiService = new PicsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
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
      loadMoreBtn.show();
    });
  } catch (error) {
    console.log(error);
  }
}

function onLoadMore() {
  loadMoreBtn.disable();
  try {
    picsApiService.fetchPics().then(({ hits, totalHits }) => {
      if (picsApiService.loadPages > totalHits) {
        renderGalleryMarkup(hits);
        lightbox.refresh();
        return message.endInfo();
      }
      renderGalleryMarkup(hits);
      lightbox.refresh();
      smoothScroll();
    });
  } catch (error) {
    console.log(error);
  }
  loadMoreBtn.enable();
}

function renderGalleryMarkup(hits) {
  const markup = hits.map(photo => cardTemplate(photo)).join('');
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGallery() {
  refs.galleryContainer.innerHTML = '';
}
