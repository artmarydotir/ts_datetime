import { DateTime } from 'luxon';
import { Countries } from './Countries';
import { CountryCodes, CountryCodesArray } from './CountryCodes';

import {
  DefaultWeekdays,
  DefaultWeekends,
  Weekdays,
  Weekends,
} from './WeekData';

import { RightToLeftLanguages, Languages } from './Languages';
import { SupportedCalendars, DefaultCalendar } from './SupportedCalendars';

// const a = Languages as const;
// const b = keyof typeof a;

export class Locale {
  private language: Languages = Languages.en;
  private country: CountryCodes = CountryCodes.US;
  private weekdays: Weekdays = DefaultWeekdays;
  private weekends: Weekends = DefaultWeekends;
  private numberingSystem: string;
  private flag: string = Countries.US.f;
  private calendar: SupportedCalendars = DefaultCalendar;

  constructor(public locale: string) {
    const iLocale = new Intl.Locale(Intl.getCanonicalLocales(locale)[0]);

    const country = iLocale.maximize().region as CountryCodes;

    if (!country || !CountryCodesArray.includes(country)) {
      throw new Error('Invalid locale');
    }

    this.setCountry(country);

    this.language = iLocale.maximize().language as Languages;

    this.numberingSystem = new Intl.NumberFormat(
      this.toString(),
    ).resolvedOptions().numberingSystem;
  }

  static calendarName(formatted: string, ident: string): String {
    const camelCase = ident.charAt(0).toUpperCase() + ident.slice(1);
    if (formatted.match(/^ERA/) || formatted === 'null') {
      return camelCase;
    }
    if (ident === 'islamicc') {
      return `${formatted}(c)`;
    }
    return formatted;
  }

  toString(): string {
    return `${this.language}-${this.country}`;
  }

  getLanguageCode(): string {
    return this.language;
  }

  getCountryCode(): string {
    return this.country;
  }

  getCountryFlag(): string {
    return this.flag;
  }

  getCalendar() {
    return this.calendar;
  }

  isRTL(lang = this.language): boolean {
    return RightToLeftLanguages.includes(lang);
  }

  getNumberingSystem() {
    return this.numberingSystem;
  }

  numberFormat(
    number: number,
    options = {
      useGrouping: false,
    },
  ): string {
    const formatter = new Intl.NumberFormat(this.toString(), options);
    return formatter.format(number);
  }

  relativeTimeString(
    date1: Date,
    date2: Date = new Date(),
    options: Intl.RelativeTimeFormatOptions = {
      style: 'narrow',
    },
  ): string {
    const formatter = new Intl.RelativeTimeFormat(this.language, options);
    const diff = date1.getTime() - date2.getTime();
    const diffAbs = Math.abs(diff);
    const x = diff > 0 ? 1 : -1;

    const matrix = {
      year: 31536000000,
      month: 2592000000,
      day: 86400000,
      hour: 3600000,
      minute: 60000,
      second: 1000,
    };

    let output = '';

    Object.keys(matrix).forEach((unit) => {
      const interval = matrix[unit];
      if (output === '' && diffAbs > interval) {
        output = formatter.format(x * Math.round(diffAbs / interval), unit);
      }
    });

    return output;
  }

  setCountry(country: CountryCodes) {
    // this.weekdays = [1, 2, 3, 4, 5, 6, 0];
    // this.weekends = [6, 0];
    // this.flag = '🇿🇿';
    // this.calendar = 'gregory';

    if (Countries[country]) {
      this.flag = Countries[country].f;

      if (Countries[country].wd) {
        this.weekdays = Countries[country].wd as Weekdays;
      }

      if (Countries[country].we) {
        this.weekends = Countries[country].we as Weekends;
      }

      if (Countries[country].c) {
        this.calendar = Countries[country].c as SupportedCalendars;
      }
    }

    this.country = country;

    return this;
  }

  setCalendar(calendar: SupportedCalendars): Locale {
    this.calendar = calendar;
    return this;
  }

  getWeekDays() {
    return this.weekdays;
  }

  getWeekEnds() {
    return this.weekends;
  }

  getCountryList() {
    const result = [];
    Object.keys(Countries).forEach((code) => {
      const data = Countries[code];
      const title = new Intl.DisplayNames([this.language], {
        type: 'region',
      });
      const titleNative = new Intl.DisplayNames([data.l], { type: 'region' });

      result.push({
        id: code,
        selected: this.country === code,
        defaultLanguage: data.l,
        flag: data.f,
        title: title.of(code),
        titleNative: titleNative.of(code),
      });
    });
    return result;
  }

  getLanguageList() {
    const result = [];
    const languages = Object.keys(Languages);

    languages.forEach((code) => {
      const title = new Intl.DisplayNames([this.language], {
        type: 'language',
      });
      const titleNative = new Intl.DisplayNames([code], { type: 'language' });

      result.push({
        id: code,
        selected: this.language === code,
        rtl: this.isRTL(code),
        title: title.of(code),
        titleNative: titleNative.of(code),
      });
    });
    return result;
  }

  // getCalendarList() {
  //   return SupportedCalendars.map((ident) => {
  //     const d = DateTime.local().reconfigure({
  //       locale: this.language,
  //       outputCalendar: ident,
  //     });
  //     return {
  //       id: ident,
  //       selected: this.calendar === ident,
  //       title: this.constructor.calendarName(d.toFormat('GG'), ident),
  //       titleShort: this.constructor.calendarName(d.toFormat('G'), ident),
  //     };
  //   });
  // }
}

export default {
  Locale,
};
