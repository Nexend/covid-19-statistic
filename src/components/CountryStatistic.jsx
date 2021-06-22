import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchCountryStatistic, fetchCountries } from '../gateway/statistic';
import CountryChart from './CountryChart';

const CountryStatistic = () => {
  const [statistic, setStatistic] = useState([]);
  const [countries, setCountries] = useState(
    JSON.parse(sessionStorage.getItem('countriesList')) || [],
  );
  const [dateValue, setDateValue] = useState(
    sessionStorage.getItem('countryParams')
      ? JSON.parse(sessionStorage.getItem('countryParams')).date
      : '',
  );
  const [countryName, setCountryName] = useState(
    sessionStorage.getItem('countryParams')
      ? JSON.parse(sessionStorage.getItem('countryParams')).country
      : 'Ukraine',
  );
  const [status, setStatus] = useState(
    sessionStorage.getItem('countryParams')
      ? JSON.parse(sessionStorage.getItem('countryParams')).status
      : 'Confirmed',
  );
  const [isContains, setContains] = useState(true);

  const qs = require('qs');
  const location = useLocation();
  const history = useHistory();

  sessionStorage.setItem('countriesList', JSON.stringify(countries));

  const getParams = () => {
    const queryObj = {
      ...qs.parse(location.search, { ignoreQueryPrefix: true }),
      country: countryName,
      status,
      date: dateValue,
    };

    history.push(`${location.pathname}?${qs.stringify(queryObj)}`);

    sessionStorage.setItem('countryParams', JSON.stringify(queryObj));
  };

  useEffect(() => {
    fetchCountries().then(countries => setCountries(countries));
    if (dateValue) {
      getParams();
    }
  }, [dateValue, status, countryName]);

  const checkStatistic = useCallback(() => {
    if (dateValue) {
      fetchCountryStatistic(countryName, status, dateValue).then(statistic => {
        setStatistic(statistic);
        setContains(true);

        if (statistic.length === 0) {
          setContains(false);
        }
      });
    }
  }, [countryName, status, dateValue]);

  if (!countries) {
    return null;
  }

  if (countries.length < 1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="countries">
      <h2 className="countries__title title">Countries statistic</h2>
      <form className="countries__form form" onSubmit={e => e.preventDefault()}>
        <select
          className="countries__list"
          value={countryName}
          onChange={e => setCountryName(e.target.value)}
        >
          {countries.map(country => (
            <option key={country.Slug} value={country.Country}>
              {country.Country}
            </option>
          ))}
        </select>
        <select
          className="countries__status"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="Confirmed">Confirmed</option>
          <option value="Deaths">Deaths</option>
          <option value="Recovered">Recovered</option>
        </select>
        <input
          className="countries__date form-date"
          type="date"
          value={dateValue}
          name="dateFrom"
          onChange={e => setDateValue(e.target.value)}
          required
        />
        <button className="countries__btn btn" onClick={checkStatistic}>
          View statistics on the chart
        </button>
      </form>
      {isContains ? (
        <CountryChart data={statistic} caseName={status} />
      ) : (
        <div>Sorry, no results were found for your search</div>
      )}
    </div>
  );
};

export default CountryStatistic;
