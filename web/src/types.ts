export interface Activity {
  id: number;
  name: string;
  distance: number;
  moving_time: string;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  start_date: string;
}


export interface ActivityIntensity {
  date: string;
  count: number;
}

export interface ReactCalendarHeatmapValue<T> {
  date: string;
  count: number;
}

export interface Summary {
  date_difference_years: number;
  date_difference_months: number;
  date_difference_days: number;
  first_activity_start_date: string; // Вы можете использовать `Date`, если преобразуете строки в объекты Date
  uniq_days: number;
  total_distance: string; // Если нужно, преобразуйте в число
  around_earth: number;
  way_to_the_moon: number;
  total_elevation: string; // Если нужно, преобразуйте в число
  everest_elevation: number;
  total_elapsed_time_weeks: number;
  total_elapsed_time_days: number;
  total_elapsed_time_hours: number;
  total_elapsed_time_minutes: number;
  average_day_distance_since_first_activity: number;
  average_week_distance_since_first_activity: number;
  average_months_distance_since_first_activity: number;
  total_kilocalories_burned: string; // Если нужно, преобразуйте в число
  pizza_slices_equivalent: number;
}

export interface WeeklyDistance {
  name: string;
  distance: number;
}

export interface ActivityCount {
  date: string; // Дата в формате ISO 8601
  count: number; // Количество
}

export interface DayStats {
  count: number; // Общее количество
  value: number; // Значение, например, среднее или суммарное
  total_distance: string; // Общее расстояние
  avg_distance: number; // Среднее расстояние
  total_moving_time: string; // Общее время перемещения
  avg_moving_time: number; // Среднее время перемещения в секундах
  total_elevation: string; // Общая высота
  avg_elevation: number; // Средняя высота
  name: string; // Название дня или периода
}

export interface TimeOfDayStats {
  time_of_day: string;
  activity_count: number;
  value: number;
  average_distance: number;
  total_distance: string;
  total_elevation: string;
  total_moving_time: string;
}

export interface DashboardData {
  recent_activities: Activity[];
  summary: Summary;
  weekly_distances: WeeklyDistance[];
  activity_intensity: ActivityCount[];
  activities_by_day: DayStats[];
  activities_by_day_time: TimeOfDayStats[];
}

export interface StatsPerDayTime {
  time_of_day: string;
  activity_count: number;
  average_distance: number;
  total_distance: number;
  total_elevation: number;
  total_moving_time: string;
  value: number;
}

export interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}


export interface WeekdayStats {
  name: string;
  count: number;
  avg_distance: number;
  total_distance: number;
  total_elevation: number;
  total_moving_time: string;
  value: number;
}

export interface User {
    username: string;
    email: string;
    isOnboarded: boolean;
}

export interface AuthResponse {
    authenticated: boolean;
    user: User;
}

export interface AuthStravaUrlResponse {
    auth_url: string;
}

