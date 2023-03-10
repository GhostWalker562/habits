export function findMostRecentConsecutiveDays(dates: Date[]): number {
  if (dates.length === 0) {
    return 0;
  }

  dates.sort((a, b) => a.getTime() - b.getTime());

  let mostRecentConsecutiveDays = 1;
  let consecutiveDays = 1;

  for (let i = 1; i < dates.length; i++) {
    const diffInDays =
      (dates[i].getTime() - dates[i - 1].getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays <= 1) {
      consecutiveDays++;
      mostRecentConsecutiveDays = consecutiveDays;
    } else {
      consecutiveDays = 1;
    }
  }

  return mostRecentConsecutiveDays;
}

export function getDatesInCurrentWeek(dates: Date[]): Date[] {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // set start of week to Sunday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // set end of week to Saturday

  const datesInCurrentWeek = dates.filter((date) => {
    return date >= startOfWeek && date <= endOfWeek;
  });

  return datesInCurrentWeek;
}
