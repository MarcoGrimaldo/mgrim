// External algorithm file (plain JS).

/**
 * Largest palindrome made from the product of two n-digit numbers.
 * Same optimizations:
 *  - Outer pruning: if i * hi <= best, break
 *  - 11-divisibility trick for even-length palindromes (so one factor is multiple of 11)
 *  - Descend i and j; break inner loop on first palindrome (it's max for that i)
 */
export function largestPalindromeProduct(n) {
  const hi = Math.pow(10, n) - 1;
  const lo = Math.pow(10, n - 1);
  let best = 0;

  for (let i = hi; i >= lo; i--) {
    if (i * hi <= best) break;

    let jStart, jStep;
    if (i % 11 === 0) {
      jStart = hi;
      jStep = 1;
    } else {
      jStart = hi - (hi % 11);
      jStep = 11;
    }

    for (let j = jStart; j >= i; j -= jStep) {
      const prod = i * j;
      if (prod <= best) break;

      const s = String(prod);
      if (s === s.split("").reverse().join("")) {
        best = prod;
        break;
      }
    }
  }
  return best;
}

/**
 * Same as above, but also returns the factor pair (a, b).
 */
export function largestPalindromeProductWithFactors(n) {
  const hi = Math.pow(10, n) - 1;
  const lo = Math.pow(10, n - 1);
  let best = 0;
  let a = 0,
    b = 0;

  for (let i = hi; i >= lo; i--) {
    if (i * hi <= best) break;

    let jStart, jStep;
    if (i % 11 === 0) {
      jStart = hi;
      jStep = 1;
    } else {
      jStart = hi - (hi % 11);
      jStep = 11;
    }

    for (let j = jStart; j >= i; j -= jStep) {
      const prod = i * j;
      if (prod <= best) break;

      const s = String(prod);
      if (s === s.split("").reverse().join("")) {
        best = prod;
        a = i;
        b = j;
        break;
      }
    }
  }
  return { best, a, b };
}
