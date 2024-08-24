import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import styles from './ActivityHeatmap.module.css';
import {useSelector} from "react-redux";

const ActivityHeatmap = () => {
  const activityIntencities = useSelector((state) => state.dashboard.activityIntencities);
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
  const startDate = new Date();
  return (
      <div>
          <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
              Activity intensity
          </h5>
          <CalendarHeatmap
              startDate={startDate.setDate(startDate.getDate() - 365)}
              endDate={new Date()}
              values={activityIntencities}
              classForValue={(value) => {
                  if (!value) {
                      return 'color-empty';
                  }
                  if (value.count > 75) {
                      return 'color-github-4';
                  } else if (value.count > 50) {
                      return 'color-github-3';
                  } else if (value.count > 25) {
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
          <div className={styles.legend}>
              <span className={styles.colorGithubEmpty}>No activities</span>
              <span className={styles.colorGithub1}>Low (0 - 33)</span>
              <span className={styles.colorGithub2}>Medium (34 - 66)</span>
              <span className={styles.colorGithub3}>High (67 - 100)</span>
              <span className={styles.colorGithub4}>Very high (> 100)</span>
          </div>
          <Tooltip/>

      </div>
  );
};

export default ActivityHeatmap;
