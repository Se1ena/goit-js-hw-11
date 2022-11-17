import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=31381187-b432f12d58670729bf0a21c9a';
const OPTIONS = '&image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = '&per_page=40';

async function getData(data, page) {
  const apiData = await axios.get(
    `${BASE_URL}${KEY}&q=${data}${OPTIONS}&page=${page}${PER_PAGE}`
  );
  return apiData;
}

export default { getData };
