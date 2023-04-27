import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const emptySpaces = number => number.toLocaleString();

const clear = () => {
  countriesList.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

const appearCountries = data => {
  clear();
  data.forEach(country => {
    const newCountryEl = document.createElement('li');
    newCountryEl.classList.add('country-box');
    newCountryEl.innerHTML = `<img class="flag-list" src="${country.flags.svg}"/> 
    <p class="name-list">${country.name.official}</p>`;
    countriesList.appendChild(newCountryEl);
  });
};

const appearOneCountry = data => {
  clear();
  const languages = Object.values(data.languages).join(', ');
  countryInfoEl.innerHTML = `<img class="flag-single" src="${data.flags.svg}"/> 
  <p class="country-single">${data.name.official}</p> 
  <p><span class="bold"> Capital: </span> ${data.capital[0]}</p> 
  <p><span class="bold"> Population: </span> ${emptySpaces(
    data.population
  )}</p> 
  <p><span class="bold"> Languages: </span> ${languages}</p>`;
};

const delayReadData = debounce(async event => {
  const data = await fetchCountries(event.target.value.trim());
  debounce(() => console.log(data), DEBOUNCE_DELAY);
  if (event.target.value.trim() !== '') {
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (data.length <= 10 && data.length > 1) {
      appearCountries(data);
    } else if (data.length === 1) {
      appearOneCountry(data[0]);
    }
  } else {
    clear();
  }
}, DEBOUNCE_DELAY);

inputEl.addEventListener('input', delayReadData);

// const inputEl = document.querySelector('#search-box');
// const countriesList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// let spaces = number => number.toLocaleString();

// const clear = () => {
//   countriesList.innerHTML = '';
//   countryInfo.innerHTML = '';
// };

// // const el = document.createElement("div");
// // el.classList.add("element");

// const appearList = data => {
//   clear();

//   const fragment = document.createDocumentFragment();

//   data.forEach(country => {
//     const newCountryEl = document.createElement('li');
//     newCountryEl.classList.add('country-box');
//     newCountryEl.innerHTML = `<img class="flag-list" src="${country.flags.svg}"/>
//     <p class="name-list">${country.name.official}</p>`;
//     fragment.appendChild(newCountryEl);
//   });

//   countriesList.insertAdjacentElement('afterend', fragment);
// };

// // destrukturyzacja

// const appearOneItem = ({
//   flags: { svg },
//   name: { official },
//   capital,
//   population,
//   languages,
// }) => {
//   clear();
//   const languageList = Object.values(languages).join(', ');
//   countryInfo.innerHTML = `
//     <img class="flag-single" src="${svg}"/>
//     <p class="country-single">${official}</p>
//     <p><span class="bold">Capital: </span>${capital[0]}</p>
//     <p><span class="bold">Population: </span>${spaces(population)}</p>
//     <p><span class="bold">Languages: </span>${languageList}</p>
//   `;
// };

// const delayReadData = debounce(async event => {
//   const data = await fetchCountries(event.target.value.trim());
//   debounce(() => console.log(data), DEBOUNCE_DELAY);
//   data.length > 1
//     ? appearList(data)
//     : data.length === 1 && appearOneItem(...data);
// }, DEBOUNCE_DELAY);

// inputEl.addEventListener('input', delayReadData);

// // console.log(fetchCountries());

// // const countriesArray = fetchCountries();

// // console.log(countriesArray);

// // function renderCountries(countries) {
// //     if (inputEl.value.trim() !== )
// // }

// // function renderCountries.array.forEach(element => {

// // });
// // const renderCountry = country => {
// //   const languages = Object.values(country.languages).join(', ');
// //   return `
// //       <li style="display:flex;gap:10px; align-items:center; padding:12px; font-weight:bold; font-size:22px;">
// //         <img src="${country.flags.svg}" width="50" height="30" alt="${
// //     country.name.official
// //   } flag">
// //         ${country.name.official}
// //       </li>
// //       <li><strong>Capital</strong> : ${country.capital[0]}</li>
// //       <li><strong>Population</strong> : ${addSpaces(country.population)}</li>
// //       <li><strong>Languages</strong> : ${languages}</li>
// //     `;
// // };

// // const renderCountriesList = countries => {
// //   const filter = countries.filter(country =>
// //     country.name.official
// //       .toLowerCase()
// //       .includes(inputEl.value.trim().toLowerCase())
// //   );
// //   const countryListMarkup = filter
// //     .map(country => renderCountry(country))
// //     .join('');
// // };
