// -=-=-=-=-=-=- axios async/await fetch used -=-=-=-=-=-=-
import axios from 'axios';
// const axios = require('axios');

export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.loadPages = 0;
  }

  async fetchPics() {
    const options = {
      API_KEY: '32250551-625e2bee036e3bd3a420787dd',
      BASE_URL: 'https://pixabay.com/api/',
    };

    const response = await axios(
      `${options.BASE_URL}?key=${options.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    );
    console.log(response);

    const images = await response.data;
    const { hits, totalHits } = await images;
    this.incrementPage();

    const obj = {
      hits,
      totalHits,
    };

    return obj;
  }

  incrementPage() {
    this.page += 1;
    this.loadPages += this.perPage;
  }

  resetPage() {
    this.page = 1;
    this.loadPages = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// -=-=-=-=-=-=- usual browser fetch used -=-=-=-=-=-=-

// export default class PicsApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//     this.perPage = 40;
//     this.loadPages = 0;
//   }

//   fetchArticles() {
//     const options = {
//       API_KEY: '32250551-625e2bee036e3bd3a420787dd',
//       BASE_URL: 'https://pixabay.com/api/',
//     };

//     return fetch(
//       `${options.BASE_URL}?key=${options.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
//     )
//       .then(response => response.json())
//       .then(({ hits, totalHits }) => {
//         this.incrementPage();

//         const obj = {
//           hits,
//           totalHits,
//         };
//         return obj;
//       })
//       .catch(error => console.log(error.message));
//   }

//   incrementPage() {
//     this.page += 1;
//     this.loadPages += this.perPage;
//   }

//   resetPage() {
//     this.page = 1;
//     this.loadPages = 0;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
