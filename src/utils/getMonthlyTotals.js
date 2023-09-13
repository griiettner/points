import { groupByMonth } from './groupByMonth';
import { calculateMonthlyTotals } from './calculateMonthlyTotals';

/**
 * Retrieves the total points for the last three months from an array of customer transactions.
 *
 * This function first groups the provided customer transactions by month using the `groupByMonth` function.
 * Then, it calculates the total points for each month using the `calculateMonthlyTotals` function.
 * Finally, it sorts these totals by month in descending order and returns the totals for the last three months.
 *
 * Each transaction object in the customer history should contain a 'date' property in a format that can be
 * parsed by JavaScript's Date object.
 *
 * @function
 * @param {Array} customerHistory - An array of transaction objects with at least a 'date' property.
 * @returns {Object} An object where each key is one of the last three months in the "month-year" format and the corresponding value is the total points for that month.
 *
 * @example
 * const customerHistory = [
 *   { date: "2023-06-15", amount: 120 },
 *   { date: "2023-06-20", amount: 150 },
 *   { date: "2023-05-10", amount: 80 },
 *   { date: "2023-04-05", amount: 90 },
 *   { date: "2023-03-01", amount: 60 }
 * ];
 *
 * const monthlyTotals = getMonthlyTotals(customerHistory);
 * // returns: { "6-2023": totalPointsForJune, "5-2023": totalPointsForMay, "4-2023": totalPointsForApril }
 */
export function getMonthlyTotals(customerHistory) {
  const groupedHistory = groupByMonth(customerHistory);
  const allTotals = calculateMonthlyTotals(groupedHistory);

  // Get only the last three months
  const sortedKeys = Object
    .keys(allTotals)
    .sort((a, b) => {
      const [monthA, yearA] = a.split('/').map(Number);
      const [monthB, yearB] = b.split('/').map(Number);

      if (yearA !== yearB) {
        return yearB - yearA;
      }
      return monthB - monthA;
    });

  const lastThreeKeys = sortedKeys.slice(0, 3);
  const lastThreeTotals = lastThreeKeys.reduce((acc, key) => {
    acc[key] = allTotals[key];
    return acc;
  }, {});

  return lastThreeTotals;
}
