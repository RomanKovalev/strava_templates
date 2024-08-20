import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import styles from './ActivityHeatmap.module.css';

const ActivityHeatmap = () => {
  // Пример данных. Каждое событие в массиве представляет собой объект с датой и уровнем активности.
  const data = [
    { date: '2024-01-01', count: 11 },
    { date: '2024-02-02', count: 55 },
    { date: '2024-03-03', count: 77 },
    { date: '2024-04-03', count: 110 },
    { date: '2024-05-01', count: 11 },
    { date: '2024-06-02', count: 55 },
    { date: '2024-07-03', count: 77 },
    { date: '2024-08-03', count: 110 },
    // Добавьте больше данных для соответствия вашему диапазону
  ];

  return (
    <div>
      <h2>Activity intensity</h2>
      <CalendarHeatmap
        startDate={new Date('2023-09-01')}
        endDate={new Date('2024-08-31')}
        values={data}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count > 100) {
            return 'color-github-4';
          } else if (value.count > 66) {
            return 'color-github-3';
          } else if (value.count > 33) {
            return 'color-github-2';
          } else if (value.count > 0) {
            return 'color-github-1';
          } else {
            return 'color-empty';
          }
        }}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': value.date
              ? `${value.date}: ${value.count} activities`
              : 'No activities',
          };
        }}
        showWeekdayLabels={true}
        gutterSize={2}
        horizontal={true}
      />
      <Tooltip />
    </div>
  );
};

export default ActivityHeatmap;
