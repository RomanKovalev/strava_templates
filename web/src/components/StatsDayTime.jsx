import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import {useSelector} from "react-redux";

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
  const radius = 10 + innerRadius + (outerRadius - innerRadius);
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
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

const StatsDayTime = () => {
  const statsPerDayTime = useSelector((state) => state.dashboard.statsPerDayTime);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
        Stats per Daytime
      </h5>
      <PieChart width={450} height={450}>
        <Pie
          data={statsPerDayTime}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          nameKey="time_of_day"
        >
          {statsPerDayTime.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
         <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          margin={{ top: 50, right: 20, bottom: 10, left: 20 }}
        />
      </PieChart>
      <br/>
      <table border="1" style={{ marginTop: '20px', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Weekday</th>
            <th>Rides</th>
            <th>Distance</th>
            <th>Elevation</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody>
        {statsPerDayTime.map((weekday, index) => (
            <tr key={index}>
              <td>{weekday.name}</td>
              <td>{weekday.count}</td>
              <td>{weekday.avg_distance} m avg\{weekday.total_distance} m total</td>
              <td>{weekday.avg_elevation} m avg\{weekday.total_elevation} m total</td>
              <td>{weekday.total_moving_time}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsDayTime;
