import axios from 'axios';

async function getData(data, page) {
  const apiData = await axios.get(
    `https://pixabay.com/api/?key=31381187-b432f12d58670729bf0a21c9a&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return apiData;
}

export default { getData };
