"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShikiCodeBlock } from "@/components/shiki-code-block";
import { renderMath } from "@/lib/renderMath";

// --- Solver (TS) ---
function fiboEvenSum(limit: number): number {
  let a = 1;
  let b = 2;
  let sum = 0;

  while (b <= limit) {
    if (b % 2 === 0) {
      sum += b;
    }
    const next = a + b;
    a = b;
    b = next;
  }
  return sum;
}

// --- Code to display in the "Code Solution" block ---
const codeSolution = `
function fiboEvenSum(limit: number): number {
  let a = 1;
  let b = 2;
  let sum = 0;

  while (b <= limit) {
    if (b % 2 === 0) {
      sum += b;
    }
    const next = a + b;
    a = b;
    b = next;
  }
  return sum;
}
`;

export default function ProjectEuler2Page() {
  const [input, setInput] = useState("4000000");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const fibSequence = renderMath(
    `1,\\ 2,\\ 3,\\ 5,\\ 8,\\ 13,\\ 21,\\ 34,\\ 55,\\ 89`
  );
  const recurrence = renderMath(`F_{k+1} = F_k + F_{k-1}`);
  const evenCondition = renderMath(`F_k \\equiv 0 \\pmod 2`);
  const millionLimit = renderMath(`4 \\times 10^6`);
  const rollingState = renderMath(`(a, b)`);
  const complexity = renderMath(`O(k)`);

  const handleTest = () => {
    const num = parseInt(input, 10);
    if (!isNaN(num)) {
      setResult(fiboEvenSum(num));
      setIsCalculated(true);
    } else {
      setResult(null);
    }
  };

  const handleReset = () => {
    setInput("4000000");
    setResult(null);
    setIsCalculated(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-900/60 py-10 px-4 rounded-lg -mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* Problem */}
        <Card className="p-6">
          <motion.h1
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Problem 2: Even Fibonacci Numbers
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="prose dark:prose-invert max-w-none">
              <p>
                The Fibonacci sequence starts with 1 and 2, then repeatedly
                applies{" "}
                <span dangerouslySetInnerHTML={{ __html: recurrence }} /> to
                produce{" "}
                <span dangerouslySetInnerHTML={{ __html: fibSequence }} />…
              </p>
              <p>
                We focus on terms whose value does not exceed{" "}
                <span dangerouslySetInnerHTML={{ __html: millionLimit }} /> and
                ask for the sum of the even-valued members. This constraint
                keeps the set finite while highlighting the pattern that every
                third Fibonacci term is even.
              </p>
            </div>
          </motion.div>
        </Card>

        {/* Explanation + Code */}
        <Card className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How to Solve
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Maintain two rolling values{" "}
                <span dangerouslySetInnerHTML={{ __html: rollingState }} /> for
                consecutive Fibonacci terms. While the second value stays below
                the user-provided limit, add it to the sum whenever{" "}
                <span dangerouslySetInnerHTML={{ __html: evenCondition }} />.
              </p>
              <p>
                Advance the sequence in-place by computing the next term, moving
                the window forward, and repeating until the limit is exceeded.
                The loop generates exactly as many numbers as needed, so the
                runtime grows linearly with the number of terms considered (
                <span dangerouslySetInnerHTML={{ __html: complexity }} />) and
                uses constant extra memory.
              </p>
            </div>

            <Separator className="my-6" />

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Solution
            </h3>
            <div className="rounded-lg">
              <ShikiCodeBlock code={codeSolution} lang="typescript" />
            </div>
          </motion.div>
        </Card>

        {/* Tester */}
        <Card className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Test the Solution
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-gray-700 dark:text-gray-300">
                  Enter a limit:
                </label>
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isCalculated}
                  className="w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleTest}
                  disabled={isCalculated}
                  className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate
                </Button>
                <Button
                  onClick={handleReset}
                  disabled={!isCalculated}
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600
                             hover:bg-gray-100 dark:hover:bg-gray-700
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200"
                >
                  Reset
                </Button>
              </div>
            </div>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
              >
                <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Sum of even Fibonacci numbers ≤ {input}:{" "}
                  <span className="text-green-400">{result}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="outline" asChild>
            <Link href="/notebook/project-euler-1">Previous Problem</Link>
          </Button>
          <Button asChild>
            <Link href="/notebook/project-euler-3">Next Problem</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
