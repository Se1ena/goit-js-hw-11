import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import API from './api_service';
import { createMarkUp } from './createmarkup';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSubmit);
refs.gallery.addEventListener('click', e => {
  e.preventDefault();
});
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let page = 1;

function onSubmit(e) {
  e.preventDefault();
  const value = refs.form.elements.searchQuery.value;
  refs.gallery.innerHTML = '';
  API.getData(value, page).then(data => {
    page = 1;
    if (data.data.hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
    createMarkUp(data.data.hits, refs.gallery);
    lightbox.refresh();
    observer.observe(refs.gallery.lastElementChild);   
    if (createMarkUp) {
      e.target.reset();
    }
  });
}

let lightbox = new SimpleLightbox('.gallery a');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      const value = refs.form.elements.searchQuery.value;
      API.getData(value, page).then(data => {
        if (data.data.hits.length === 0) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        }
        createMarkUp(data.data.hits, refs.gallery);
        lightbox.refresh();
        observer.observe(refs.gallery.lastElementChild);
      });
    }
  });
});

function onLoadMore(){}