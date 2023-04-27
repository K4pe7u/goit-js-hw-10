import Notiflix from 'notiflix';

const API_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';

export const fetchCountries = async name => {
  try {
    const response = await fetch(`${API_URL}${name}${FILTER}`);
    const data = await response.json();
    if (data.length === 0) throw new Error();
    return data;
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
};

// const API_URL =
//   'https://restcountries.com/v3.1/all?fields=name,capital,population,languages,flags';

// export const fetchCountries = () => {
//   return fetch(`${API_URL}`)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Response not OK');
//     })
//     .catch(error => {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//       throw new Error(error.message);
//     });
// };

// Promise {<pending>} + Array(250) finish console.logkkkk
