import Notiflix from 'notiflix';

const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,capital,population,languages,flags';

export const fetchCountries = () => {
  return fetch(`${API_URL}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Response not OK');
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error(error.message);
    });
};

// Promise {<pending>} + Array(250) finish console.log
