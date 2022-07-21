export type WeekdayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Weekends = [number, number?];
export type Weekdays = [
  WeekdayNumber,
  WeekdayNumber,
  WeekdayNumber,
  WeekdayNumber,
  WeekdayNumber,
  WeekdayNumber,
  WeekdayNumber,
];

export const DefaultWeekdays: Weekdays = [1, 2, 3, 4, 5, 6, 0];

export const DefaultWeekends: Weekends = [6, 0];
