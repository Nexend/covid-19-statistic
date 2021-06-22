import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';

const GlobalChart = ({ data, caseName }) => {
  return (
    <LineChart width={600} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Tooltip />
      {(caseName === 'NewConfirmed' || caseName === 'All') && (
        <Line type="monotone" dataKey="NewConfirmed" stroke="red" activeDot={{ r: 8 }} />
      )}
      {(caseName === 'NewDeaths' || caseName === 'All') && (
        <Line type="monotone" dataKey="NewDeaths" stroke="green" activeDot={{ r: 8 }} />
      )}
      {(caseName === 'NewRecovered' || caseName === 'All') && (
        <Line type="monotone" dataKey="NewRecovered" stroke="blue" activeDot={{ r: 8 }} />
      )}
      {(caseName === 'TotalConfirmed' || caseName === 'All') && (
        <Line type="monotone" dataKey="TotalConfirmed" stroke="coral" activeDot={{ r: 8 }} />
      )}
      {(caseName === 'TotalDeaths' || caseName === 'All') && (
        <Line type="monotone" dataKey="TotalDeaths" stroke="#8884d8" activeDot={{ r: 8 }} />
      )}
      {(caseName === 'TotalRecovered' || caseName === 'All') && (
        <Line type="monotone" dataKey="TotalRecovered" stroke="black" activeDot={{ r: 8 }} />
      )}
    </LineChart>
  );
};

export default GlobalChart;
