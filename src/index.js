import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// console.log(fetchCountries());

// const countriesArray = fetchCountries();

// console.log(countriesArray);

// function renderCountries(countries) {
//     if (inputEl.value.trim() !== )
// }

// function renderCountries.array.forEach(element => {

// });
const renderCountry = country => {
  const languages = Object.values(country.languages).join(', ');
  return `
      <li style="display:flex;gap:10px; align-items:center; padding:12px; font-weight:bold; font-size:22px;">
        <img src="${country.flags.svg}" width="50" height="30" alt="${
    country.name.official
  } flag"> 
        ${country.name.official}
      </li>
      <li><strong>Capital</strong> : ${country.capital[0]}</li>
      <li><strong>Population</strong> : ${addSpaces(country.population)}</li>
      <li><strong>Languages</strong> : ${languages}</li>
    `;
};

const renderCountries = countries => {
  const filter = countries.filter(country =>
    country.name.official
      .toLowerCase()
      .includes(inputEl.value.trim().toLowerCase())
  );
  const countryListMarkup = filter
    .map(country => renderCountry(country))
    .join('');
};
