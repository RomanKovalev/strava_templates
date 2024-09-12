import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { useSelector } from 'react-redux';

const CustomBrushChart = () => {
  const weeklyDistances = useSelector(
    (state) => state.dashboard.weeklyDistances,
  );
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={weeklyDistances}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="distance"
          stroke="#ff7300"
          dot={{ r: 2 }}
        />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomBrushChart;
