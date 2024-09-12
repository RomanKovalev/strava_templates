import { useSelector } from 'react-redux';

const Summary = () => {
  const summary = useSelector((state) => state.dashboard.summary);

  return (
    <div className="flex-grow">
      <p>
        Since I began cycling {summary.date_difference_years} year and{' '}
        {summary.date_difference_months} months and{' '}
        {summary.date_difference_days} days ago on{' '}
        {summary.first_activity_start_date}, I had {summary.uniq_days} cycling
        days.
      </p>
      <br />
      <p>
        I recorded a total distance of {summary.total_distance} km (
        {summary.around_earth} trips around the world 🌍 and{' '}
        {summary.way_to_the_moon} trips to the moon 🌕), an elevation of{' '}
        {summary.total_elevation} m ({summary.everest_elevation} times Mount
        Everest 🏔) and a total time of {summary.total_elapsed_time_weeks}w{' '}
        {summary.total_elapsed_time_days}d {summary.total_elapsed_time_hours}h{' '}
        {summary.total_elapsed_time_minutes}m 🎉.
      </p>
      <br />
      <p>
        That&rsquo;s a daily average of{' '}
        {summary.average_day_distance_since_first_activity} km, a weekly average
        of {summary.average_week_distance_since_first_activity} km and a monthly
        average of {summary.average_months_distance_since_first_activity} km 🐣.
        I burned {summary.total_kilocalories_burned} calories doing so,
        that&rsquo;s about {summary.pizza_slices_equivalent} pizza slices 🍕.
      </p>
    </div>
  );
};

export default Summary;
