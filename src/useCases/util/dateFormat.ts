export function format(date: Date): string {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const strDay = day < 10 ? '0'.concat(day.toString()) : day.toString();
  const strMonth = month < 10 ? '0'.concat(month.toString()) : month.toString();

  return `${strDay}/${strMonth}/${year}`;
}
