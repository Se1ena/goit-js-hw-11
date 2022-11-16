//import axios from 'axios';
import Notiflix from 'notiflix';

import {getData} from './api_service';
//import { createMarkup } from './createmarkup';

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
  const value = refs.input.value;
  refs.gallery.innerHTML = '';
  getData(value, page).then(data => {
    page = 1;
    if (data.data.hits.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
  });
}
