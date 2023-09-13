/**
 * Groups an array of customer transactions by month.
 *
 * The function takes an array of transaction objects and groups them by their
 * transaction month. Each transaction object must contain a 'date' property
 * in a format that can be parsed by JavaScript's Date object. The resulting
 * object will have keys representing months in the "month-year" format and 
 * values as arrays of transactions for that month.
 *
 * @function
 * @param {Array} customerHistory - An array of transaction objects with at least a 'date' property.
 * @returns {Object} An object where each key is a month in the "month-year" format and the corresponding value is an array of transactions for that month.
 *
 * @example
 * const customerHistory = [
 *   { date: "2023-06-15", amount: 120 },
 *   { date: "2023-06-20", amount: 150 },
 *   { date: "2023-07-05", amount: 80 }
 * ];
 *
 * const grouped = groupByMonth(customerHistory);
 * // returns: { "6-2023": [{ date: "2023-06-15", amount: 120 }, { date: "2023-06-20", amount: 150 }], "7-2023": [{ date: "2023-07-05", amount: 80 }] }
 */
export function groupByMonth(customerHistory) {
  return customerHistory.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`;

    if (!acc[monthYearKey]) {
      acc[monthYearKey] = [];
    }

    acc[monthYearKey].push(transaction);
    return acc;
  }, {});
}
