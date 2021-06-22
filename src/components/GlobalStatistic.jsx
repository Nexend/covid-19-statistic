import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchGlobalStatistic } from '../gateway/statistic';
import GlobalChart from './GlobalChart';

const GlobalStatistic = () => {
  const [statistic, setStatistic] = useState([]);
  const [caseValue, setCaseValue] = useState(
    sessionStorage.getItem('getParams')
      ? JSON.parse(sessionStorage.getItem('getParams')).status
      : 'All',
  );
  const [stateInput, setStateInput] = useState({
    dateFrom: sessionStorage.getItem('getParams')
      ? JSON.parse(sessionStorage.getItem('getParams')).from
      : '',
    dateTo: sessionStorage.getItem('getParams')
      ? JSON.parse(sessionStorage.getItem('getParams')).to
      : '',
  });
  const { dateFrom, dateTo } = stateInput;

  const qs = require('qs');
  const location = useLocation();
  const history = useHistory();

  const fetchStatistic = () => {
    fetchGlobalStatistic().then(statistic => setStatistic(statistic));
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setStateInput({
      ...stateInput,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const getParams = () => {
    const queryObj = {
      ...qs.parse(location.search, { ignoreQueryPrefix: true }),
      from: dateFrom,
      to: dateTo,
      status: caseValue,
    };

    history.push(`${location.pathname}?${qs.stringify(queryObj)}`);

    sessionStorage.setItem('getParams', JSON.stringify(queryObj));
  };

  useEffect(() => {
    if (dateFrom && dateTo) {
      fetchStatistic();
      getParams();
    }
  }, [dateFrom, dateTo, caseValue]);

  if (!statistic) {
    return null;
  }

  const filteredStatistic = statistic.filter(stat => dateFrom <= stat.Date && stat.Date <= dateTo);

  return (
    <div className="global-statistic">
      <h1 className="global-statistic__title title">Global Statistic</h1>
      <span className="global-statistic__text">Select a date range to view statistics</span>

      <form className="global-statistic__form form" onSubmit={handleSubmit}>
        <label className="global-statistic__label">
          Date from
          <input
            className="global-statistic__date form-date"
            type="date"
            value={dateFrom}
            name="dateFrom"
            onChange={handleChange}
          />
        </label>
        <label className="global-statistic__label">
          Date to
          <input
            className="global-statistic__date form-date"
            type="date"
            value={dateTo}
            name="dateTo"
            onChange={handleChange}
          />
        </label>
        <label className="global-statistic__label">
          Case
          <select value={caseValue} onChange={e => setCaseValue(e.target.value)}>
            <option value="All">All</option>
            <option value="NewConfirmed">New Confirmed</option>
            <option value="NewDeaths">New Deaths</option>
            <option value="NewRecovered">New Recovered</option>
            <option value="TotalConfirmed">Total Confirmed</option>
            <option value="TotalDeaths">Total Deaths</option>
            <option value="TotalRecovered">Total Recovered</option>
          </select>
        </label>
      </form>
      <GlobalChart data={filteredStatistic} caseName={caseValue} />
    </div>
  );
};

export default GlobalStatistic;
