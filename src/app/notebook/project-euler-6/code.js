export function sumSquareDifference(n) {
  // Square of the sum: (1 + 2 + ... + n)^2
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  const squareOfSum = sum * sum;

  // Sum of squares: 1^2 + 2^2 + ... + n^2
  let sumOfSquares = 0;
  for (let i = 1; i <= n; i++) {
    sumOfSquares += i * i;
  }

  return squareOfSum - sumOfSquares;
}
