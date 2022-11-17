import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import API from './api_service';
import { createMarkUp } from './createMarkUp';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);
refs.gallery.addEventListener('click', e => {
  e.preventDefault();
});

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
  });
}

let lightbox = new SimpleLightbox('.gallery a');

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        page += 1;
        const value = refs.input.value;
        getData(value, page).then(data => {
          createMarkup(data.data.hits, refs.gallery);
          lightbox.refresh();
          observer.observe(refs.gallery.lastElementChild);
        });
      }
    });
  },
);
