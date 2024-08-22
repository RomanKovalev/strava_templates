import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Monday', value: 10.82 },
  { name: 'Tuesday', value: 15.23 },
  { name: 'Wednesday', value: 15.83 },
  { name: 'Thursday', value: 13.01 },
  { name: 'Friday', value: 14.57 },
  { name: 'Saturday', value: 15.7 },
  { name: 'Sunday', value: 14.84 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

const StatsPerWeekday = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Stats per weekday</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
      <br/>
      <table border="1" style={{ marginTop: '20px', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Weekday</th>
            <th>Rides</th>
            <th>Avg Distance</th>
            <th>Total Distance</th>
            <th>Total Elevation</th>
            <th>Total Time</th>
            <th>Avg Speed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>62</td>
            <td>27km</td>
            <td>1 652km</td>
            <td>12 227m</td>
            <td>2d 10h 10m</td>
            <td>28.4km/h</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>75</td>
            <td>33km</td>
            <td>2 470km</td>
            <td>16 264m</td>
            <td>3d 9h 54m</td>
            <td>30.2km/h</td>
          </tr>
          {/* Добавьте остальные дни недели */}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPerWeekday;
