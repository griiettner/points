export function calculatePoints(amount) {
  if (amount <= 50) return 0;
  if (amount <= 100) return parseInt(amount - 50);
  return parseInt(50 + (amount - 100) * 2);
}