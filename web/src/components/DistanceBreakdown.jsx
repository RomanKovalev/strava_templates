import React from 'react';

const distanceData = [
  { range: '0 - 20 km', rides: 208, avgDistance: '10km', totalDistance: '2 011km', elevation: '10 091m', totalTime: '3d 20h 3m', avgSpeed: '21.8km/h' },
  { range: '20 - 40 km', rides: 157, avgDistance: '30km', totalDistance: '4 757km', elevation: '43 550m', totalTime: '6d 15h 20m', avgSpeed: '29.9km/h' },
  { range: '40 - 60 km', rides: 135, avgDistance: '49km', totalDistance: '6 551km', elevation: '38 072m', totalTime: '1w 1d 16h 19m', avgSpeed: '31.4km/h' },
  { range: '60 - 80 km', rides: 23, avgDistance: '67km', totalDistance: '1 531km', elevation: '8 583m', totalTime: '2d 1h 47m', avgSpeed: '30.8km/h' },
  { range: '80 - 100 km', rides: 3, avgDistance: '83km', totalDistance: '250km', elevation: '1 191m', totalTime: '8h 10m', avgSpeed: '30.6km/h' },
  { range: '100 - 120 km', rides: 4, avgDistance: '105km', totalDistance: '420km', elevation: '627m', totalTime: '14h 1m', avgSpeed: '30.0km/h' },
  { range: '120 - 140 km', rides: 0, avgDistance: '0km', totalDistance: '0km', elevation: '0.0m', totalTime: '0.0m', avgSpeed: '0.0km/h' },
  { range: '140 - 160 km', rides: 0, avgDistance: '0km', totalDistance: '0km', elevation: '0.0m', totalTime: '0.0m', avgSpeed: '0.0km/h' },
  { range: '160 - 180 km', rides: 1, avgDistance: '174km', totalDistance: '174km', elevation: '2 622m', totalTime: '6h 8m', avgSpeed: '28.3km/h' },
];

const DistanceBreakdown = () => {
  return (
    <div>
      <h3>Distance Breakdown</h3>
      <table border="1" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th># RIDES</th>
            <th>Avg Distance</th>
            <th>Total Distance</th>
            <th>Total Elevation</th>
            <th>Total Time</th>
            <th>Avg Speed</th>
          </tr>
        </thead>
        <tbody>
          {distanceData.map((item, index) => (
            <tr key={index}>
              <td>{item.range}</td>
              <td>{item.avgDistance} avg / {item.totalDistance} total</td>
              <td>{item.elevation}</td>
              <td>{item.totalTime}</td>
              <td>{item.avgSpeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistanceBreakdown;
