export function findMostRecentConsecutiveDays(dates: Date[]): number {
  if (dates.length === 0) {
    return 0;
  }

  let currentStreak = 1;

  for (let i = dates.length - 1; i > 0; i--) {
    const prevDate = dates[i - 1];
    const currDate = dates[i];
    const prevTime = prevDate.getTime();
    const currTime = currDate.getTime();

    if (currTime - prevTime === 24 * 60 * 60 * 1000) {
      // Dates are consecutive
      currentStreak++;
    } else {
      // Dates are not consecutive
      break;
    }
  }

  return currentStreak;
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
