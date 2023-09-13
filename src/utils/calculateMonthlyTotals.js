import { calculatePoints } from "./calculatePoints";

/**
 * Calculates the monthly total points for each grouped history.
 *
 * The function takes a grouped history object where the keys represent months
 * in the format "month-year", and the values are arrays of transaction records
 * for that specific month. It then computes the total points for each month
 * by iterating through the transactions and summing up the points.
 *
 * @function
 * @param {Object} groupedHistory - An object containing arrays of transactions grouped by month.
 * @returns {Object} An object where each key is a month in the "month-year" format, and the corresponding value is the total points for that month.
 *
 * @example
 * const groupedHistory = {
 *   "6-2023": [{ date: "2023-06-15", amount: 120 }, { date: "2023-06-20", amount: 150 }],
 *   "7-2023": [{ date: "2023-07-05", amount: 80 }]
 * };
 *
 * const totals = calculateMonthlyTotals(groupedHistory);
 * // returns: { "6-2023": 270, "7-2023": 80 }
 */
export function calculateMonthlyTotals(groupedHistory) {
  const totals = {};

  for (const [monthYear, transactions] of Object.entries(groupedHistory)) {
    totals[monthYear] = transactions.reduce(
      (acc, transaction) => acc + calculatePoints(transaction.amount),
      0
    );
  }

  return totals;
}
