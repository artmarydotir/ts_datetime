export enum SupportedCalendars {
  gregory = 'gregory',
  persian = 'persian',
  islamicc = 'islamicc',
  islamic = 'islamic',
  buddhist = 'buddhist',
  coptic = 'coptic',
  ethioaa = 'ethioaa',
  ethiopic = 'ethiopic',
  hebrew = 'hebrew',
  indian = 'indian',
  japanese = 'japanese',
  roc = 'roc',
}

export const DefaultCalendar = SupportedCalendars.gregory;

export const SupportedCalendarArray = Object.keys(SupportedCalendars);
