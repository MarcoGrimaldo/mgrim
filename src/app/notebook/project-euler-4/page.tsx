"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { largestPalindromeProductWithFactors } from "./code";
import { ShikiCodeBlock } from "@/components/shiki-code-block";
import { renderMath } from "@/lib/renderMath";

// We'll display the source taken from the external function:
const codeSolution = `
function largestPalindromeProduct(n) {
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
`;

/**
 * STATIC EXAMPLE TABLE FOR n = 3
 * Kept fixed (no runtime instrumentation) to avoid performance issues on large inputs.
 * This illustrates the logic and includes the successful factors i × j that produce the palindrome.
 */
const STATIC_ROWS_N3 = [
  {
    step: 1,
    i: 999,
    jStart: 990,
    jStep: 11,
    j: 990,
    prod: 989010,
    isPal: false,
    best: 0,
    comment: "i%11≠0 → test j multiples of 11",
  },
  {
    step: 2,
    i: 999,
    jStart: 990,
    jStep: 11,
    j: 979,
    prod: 978021,
    isPal: false,
    best: 0,
    comment: "not palindrome",
  },
  {
    step: 3,
    i: 999,
    jStart: 990,
    jStep: 11,
    j: 968,
    prod: 967032,
    isPal: false,
    best: 0,
    comment: "continue",
  },

  {
    step: 4,
    i: 998,
    jStart: 990,
    jStep: 11,
    j: 990,
    prod: 988020,
    isPal: false,
    best: 0,
    comment: "new i; still multiples of 11 for j",
  },
  {
    step: 5,
    i: 997,
    jStart: 990,
    jStep: 11,
    j: 990,
    prod: 987030,
    isPal: false,
    best: 0,
    comment: "continue",
  },
  {
    step: 6,
    i: 996,
    jStart: 990,
    jStep: 11,
    j: 990,
    prod: 986040,
    isPal: false,
    best: 0,
    comment: "continue",
  },
  {
    step: 7,
    i: 995,
    jStart: 990,
    jStep: 11,
    j: 990,
    prod: 985050,
    isPal: false,
    best: 0,
    comment: "continue",
  },
  {
    step: 8,
    i: 994,
    jStart: 990,
    jStep: 11,
    j: 990,
    prod: 984060,
    isPal: false,
    best: 0,
    comment: "continue",
  },

  // Focus on i = 993 scanning j downward by 11
  {
    step: 9,
    i: 993,
    jStart: 990,
    jStep: 11,
    j: 990,
    prod: 983070,
    isPal: false,
    best: 0,
    comment: "start i=993",
  },
  {
    step: 10,
    i: 993,
    jStart: 990,
    jStep: 11,
    j: 979,
    prod: 972147,
    isPal: false,
    best: 0,
    comment: "not palindrome",
  },
  {
    step: 11,
    i: 993,
    jStart: 990,
    jStep: 11,
    j: 968,
    prod: 961224,
    isPal: false,
    best: 0,
    comment: "not palindrome",
  },
  {
    step: 12,
    i: 993,
    jStart: 990,
    jStep: 11,
    j: 957,
    prod: 950301,
    isPal: false,
    best: 0,
    comment: "not palindrome",
  },
  {
    step: 13,
    i: 993,
    jStart: 990,
    jStep: 11,
    j: 946,
    prod: 939378,
    isPal: false,
    best: 0,
    comment: "not palindrome",
  },
  {
    step: 14,
    i: 993,
    jStart: 990,
    jStep: 11,
    j: 935,
    prod: 928455,
    isPal: false,
    best: 0,
    comment: "not palindrome",
  },
  {
    step: 15,
    i: 993,
    jStart: 990,
    jStep: 11,
    j: 924,
    prod: 917532,
    isPal: false,
    best: 0,
    comment: "not palindrome",
  },

  // ✅ Palindrome hit
  {
    step: 16,
    i: 993,
    jStart: 990,
    jStep: 11,
    j: 913,
    prod: 906609,
    isPal: true,
    best: 906609,
    comment: "palindrome found → best = 906609 (993×913)",
  },

  // From here the algorithm would prune or move on; the example stops.
];

export default function ProjectEuler4Page() {
  const [digits, setDigits] = useState("3");
  const [isCalculated, setIsCalculated] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [factors, setFactors] = useState<{ a: number; b: number } | null>(null);

  const samplePalindrome = renderMath(`9009 = 91 \\times 99`);
  const hiLabel = renderMath(`hi = 10^n - 1`);
  const loLabel = renderMath(`lo = 10^{n-1}`);
  const pruneCheck = renderMath(`i \\times hi \\le \\text{best}`);
  const divisibilityHint = renderMath(`11`);
  const iteratorI = renderMath(`i`);
  const iteratorJ = renderMath(`j`);
  const productExpression = renderMath(`i \\times j`);

  const handleCalc = () => {
    const n = parseInt(digits, 10);
    if (!isNaN(n) && n > 0) {
      // Use the version that returns the factors, so we can show i & j
      const { best, a, b } = largestPalindromeProductWithFactors(n);
      setAnswer(best);
      setFactors({ a, b });
      setIsCalculated(true);
    } else {
      setAnswer(null);
      setFactors(null);
    }
  };

  const handleReset = () => {
    setDigits("3");
    setAnswer(null);
    setFactors(null);
    setIsCalculated(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-900/60 py-10 px-4 rounded-lg -mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Problem */}
        <Card className="p-6">
          <motion.h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Problem 4: Largest Palindrome Product
          </motion.h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              A palindromic number reads the same forward and backward. For
              two-digit factors the maximum example is{" "}
              <span dangerouslySetInnerHTML={{ __html: samplePalindrome }} />,
              showcasing how symmetry appears in multiplication.
            </p>
            <p>
              For a general digit length{" "}
              <span dangerouslySetInnerHTML={{ __html: renderMath(`n`) }} />, we
              examine factor pairs between{" "}
              <span dangerouslySetInnerHTML={{ __html: hiLabel }} /> and{" "}
              <span dangerouslySetInnerHTML={{ __html: loLabel }} /> to locate
              the greatest palindromic product.
            </p>
          </div>
        </Card>

        {/* Explanation + Code */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            How to Solve
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              Descend <span dangerouslySetInnerHTML={{ __html: iteratorI }} />{" "}
              from <span dangerouslySetInnerHTML={{ __html: hiLabel }} /> to{" "}
              <span dangerouslySetInnerHTML={{ __html: loLabel }} />. For each
              outer value, walk{" "}
              <span dangerouslySetInnerHTML={{ __html: iteratorJ }} /> downward
              and exit early whenever{" "}
              <span dangerouslySetInnerHTML={{ __html: pruneCheck }} /> because
              no larger palindrome can appear for this{" "}
              <span dangerouslySetInnerHTML={{ __html: iteratorI }} />.
            </p>
            <p>
              Every even-length palindrome is divisible by{" "}
              <span dangerouslySetInnerHTML={{ __html: divisibilityHint }} />,
              so if <span dangerouslySetInnerHTML={{ __html: iteratorI }} /> is
              not a multiple we only test{" "}
              <span dangerouslySetInnerHTML={{ __html: iteratorJ }} /> values
              that are. This reduces the inner loop dramatically without missing
              any candidates.
            </p>
            <p>
              Iterate <span dangerouslySetInnerHTML={{ __html: iteratorJ }} />{" "}
              down to <span dangerouslySetInnerHTML={{ __html: iteratorI }} />{" "}
              to avoid duplicate pairs. The first time{" "}
              <span dangerouslySetInnerHTML={{ __html: productExpression }} />{" "}
              reads the same forwards and backwards, update the best answer,
              capture the factors, and break the inner loop before continuing.
            </p>
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Code Solution
          </h3>
          <div className="rounded-lg">
            <ShikiCodeBlock code={codeSolution} lang="javascript" />
          </div>
        </Card>

        {/* Tester */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Test the Solution
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 dark:text-gray-300">
                Digits (n):
              </label>
              <input
                type="number"
                value={digits}
                min={1}
                max={6}
                onChange={(e) => setDigits(e.target.value)}
                disabled={isCalculated}
                className="w-28 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCalc}
                disabled={isCalculated}
                className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate
              </Button>
              <Button
                onClick={handleReset}
                disabled={!isCalculated}
                variant="outline"
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </Button>
            </div>
          </div>

          {answer !== null && factors && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
            >
              <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Largest palindrome (two {digits}-digit numbers):{" "}
                <span className="text-green-400">{answer}</span>
              </p>
              <p className="text-sm text-blue-900 dark:text-blue-100 mt-1">
                Factors: <strong>{factors.a}</strong> ×{" "}
                <strong>{factors.b}</strong>
              </p>
            </motion.div>
          )}
        </Card>

        {/* Static example table for n=3 */}
        <Card className="p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Interaction Example (static) — n = 3
          </h2>
          <table className="w-full text-left text-sm border-collapse">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2 border-b">Step</th>
                <th className="p-2 border-b">i</th>
                <th className="p-2 border-b">jStart</th>
                <th className="p-2 border-b">jStep</th>
                <th className="p-2 border-b">j</th>
                <th className="p-2 border-b">prod = i·j</th>
                <th className="p-2 border-b">isPalindrome</th>
                <th className="p-2 border-b">best</th>
                <th className="p-2 border-b">Comments</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_ROWS_N3.map((r) => (
                <tr
                  key={r.step}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800"
                >
                  <td className="p-2 border-b">{r.step}</td>
                  <td className="p-2 border-b">{r.i}</td>
                  <td className="p-2 border-b">{r.jStart}</td>
                  <td className="p-2 border-b">{r.jStep}</td>
                  <td className="p-2 border-b">{r.j}</td>
                  <td className="p-2 border-b">{r.prod}</td>
                  <td className="p-2 border-b">{r.isPal ? "✅" : "❌"}</td>
                  <td className="p-2 border-b">{r.best}</td>
                  <td className="p-2 border-b">{r.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            ✅ For n = 3 the first palindrome hit shown here is{" "}
            <strong>906609</strong> from <strong>i = 993</strong> and{" "}
            <strong>j = 913</strong>.
          </p>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="outline" asChild>
            <Link href="/notebook/project-euler-3">Previous Problem</Link>
          </Button>
          <Button asChild>
            <Link href="/notebook/project-euler-5">Next Problem</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
