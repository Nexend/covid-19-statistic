const globalStatisticUrl = 'https://api.covid19api.com/world';
const countryStatisticUrl = 'https://api.covid19api.com/live/country';
const countriesUrl = 'https://api.covid19api.com/countries';

export const fetchGlobalStatistic = () =>
  fetch(globalStatisticUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Failed to load data');
    })
    .catch(err => console.log(err));

export const fetchCountries = () =>
  fetch(countriesUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Failed to load data');
    })
    .catch(err => console.log(err));

export const fetchCountryStatistic = (countryName, statusName, dateValue) =>
  fetch(`${countryStatisticUrl}/${countryName}/status/${statusName}/date/${dateValue}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Failed to load data');
    })
    .catch(err => console.log(err));
