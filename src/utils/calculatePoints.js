/**
 * Calculate the reward points based on the purchase amount.
 * 
 * - No points are earned for the first $50 spent.
 * - For every dollar spent over $50 and up to $100, one point is earned.
 * - For every dollar spent over $100, two points are earned.
 *
 * @param {number} amount - The purchase amount.
 * @returns {number} - The calculated reward points.
 */
export function calculatePoints(amount) {
  if (amount <= 50) return 0;
  if (amount <= 100) return parseInt(amount - 50);
  return parseInt(50 + (amount - 100) * 2);
}
