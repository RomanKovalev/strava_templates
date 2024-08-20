import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush
} from 'recharts';

const data = [
  { name: 'Week 1', distance: 211 },
  { name: 'Week 2', distance: 145 },
  { name: 'Week 3', distance: 222 },
  { name: 'Week 4', distance: 171 },
  { name: 'Week 5', distance: 192 },
  { name: 'Week 6', distance: 281 },
  { name: 'Week 7', distance: 264 },
  { name: 'Week 8', distance: 182 },
];

const CustomBrushChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="distance" stroke="#ff7300" dot={{ r: 6 }} />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CustomBrushChart;
