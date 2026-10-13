function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Smallest positive number evenly divisible by every integer from 1..n.
 * Builds the answer iteratively using the GCD/LCM relationship.
 */
export function smallestMult(n) {
  let a = 1;
  for (let b = 2; b <= n; b++) {
    a = (a * b) / gcd(a, b);
  }
  return a;
}

//console.log(smallestMult(5)); // Output: 60
//console.log(smallestMult(7)); // Output: 420
//console.log(smallestMult(10)); // Output: 2520
//console.log(smallestMult(13)); // Output: 360360
//console.log(smallestMult(20)); // Output: 232792560
