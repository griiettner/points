import { calculatePoints } from './calculatePoints';
import { COLUMN_DATE, COLUMN_AMOUNT, COLUMN_POINTS, SORT_ASC } from './config';

/**
 * Sorts the customer transaction history based on provided configuration.
 *
 * @function
 * @param {Array} customerHistory - The array of customer transactions.
 * @param {Object} sortConfig - The sorting configuration object.
 * @param {string} sortConfig.key - The key on which sorting needs to be applied ('date', 'amount', or 'points').
 * @param {string} sortConfig.direction - The sorting direction ('asc' for ascending and 'desc' for descending).
 * 
 * @returns {Array} - The sorted customer transaction history.
 *
 * @example
 * const sortedHistory = sortColumns(customerHistory, { key: 'date', direction: 'asc' });
 */
export function sortColumns(customerHistory, sortConfig) {
  const { direction, key } = sortConfig;
  return [...customerHistory].sort((a, b) => {
    const amountA = a[COLUMN_AMOUNT];
    const amountB = b[COLUMN_AMOUNT];

    switch (key) {
      case COLUMN_DATE: {
        return getSorted(direction, new Date(a[COLUMN_DATE]), new Date(b[COLUMN_DATE]));
      }
        
      case COLUMN_AMOUNT: {
        return getSorted(direction, amountA, amountB);
      }
        
      case COLUMN_POINTS: {
        return getSorted(direction, calculatePoints(amountA), calculatePoints(amountB));
      }
        
      default: {
        return 0;
      }
    }
  });
}

/**
 * Determines the sorting order for two values based on the specified direction.
 *
 * @function
 * @param {string} direction - The sorting direction ('asc' for ascending and 'desc' for descending).
 * @param {*} a - The first value to compare.
 * @param {*} b - The second value to compare.
 * 
 * @returns {number} - Returns a negative, zero, or positive value depending on whether 'a' is less than, equal to, or greater than 'b'. If 'direction' is 'desc', the return values will be inversed.
 */
function getSorted(direction, a, b) {
  return direction === SORT_ASC ? a - b : b - a;
}
