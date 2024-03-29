export const test = (): boolean => {
  return (
    typeof Intl !== 'undefined' &&
    typeof Intl.Collator !== 'undefined' &&
    typeof Intl.DateTimeFormat !== 'undefined' &&
    typeof Intl.DateTimeFormat.prototype.formatToParts !== 'undefined' &&
    typeof Intl.DateTimeFormat.prototype.resolvedOptions !== 'undefined' &&
    typeof Intl.NumberFormat !== 'undefined' &&
    typeof Intl.PluralRules !== 'undefined' &&
    typeof Intl.DisplayNames !== 'undefined' &&
    typeof Intl.ListFormat !== 'undefined' &&
    typeof Intl.Locale !== 'undefined' &&
    typeof Intl.getCanonicalLocales !== 'undefined' &&
    typeof Intl.RelativeTimeFormat !== 'undefined' &&
    new Intl.DisplayNames('en-US', { type: 'region' }).of('IR') === 'Iran' &&
    new Intl.DisplayNames('en-US', { type: 'language' }).of('fa') === 'Persian'
  );
};
