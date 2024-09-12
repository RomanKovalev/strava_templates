import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import styles from './ActivityHeatmap.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ActivityIntensity } from '../types';
import { ReactCalendarHeatmapValue } from '../types';

const ActivityHeatmap = () => {
  const activityIntencities = useSelector((state: RootState) => state.dashboard.activityIntencities);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 365);

  return (
    <div>
      <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
        Activity intensity
      </h5>
      <CalendarHeatmap
        startDate={startDate}
        endDate={new Date()}
        values={activityIntencities}
        classForValue={(value: ReactCalendarHeatmapValue<ActivityIntensity> | any): string => {
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
        tooltipDataAttrs={(value: ReactCalendarHeatmapValue<ActivityIntensity> | undefined) => {
          return {
            'data-tip': value
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
        <span className={styles.colorGithub4}>Very high (&gt; 100)</span>
      </div>
      <Tooltip />
    </div>
  );
};
export default ActivityHeatmap;