import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts';

const CountryChart = ({ data, caseName }) => {
  return (
    <LineChart width={600} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <Tooltip />
      <Line type="monotone" dataKey={caseName} stroke="red" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default CountryChart;
