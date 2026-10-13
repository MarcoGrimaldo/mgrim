"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShikiCodeBlock } from "@/components/shiki-code-block";
import { renderMath } from "@/lib/renderMath";

function sumMultiplesOf3Or5(limit: number): number {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}

const codeSolution = `
function sumMultiplesOf3Or5(limit: number): number {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}
`;

export default function ProjectEuler1Page() {
  const [input, setInput] = useState("10");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const limitTen = renderMath(`10`);
  const multiplesExample = renderMath(`3,\\ 5,\\ 6,\\ 9`);
  const sampleSum = renderMath(`23`);
  const variableN = renderMath(`n`);
  const iteratorSymbol = renderMath(`i`);
  const iterationRange = renderMath(`0 \\le i < n`);
  const linearTime = renderMath(`O(n)`);
  const constantSpace = renderMath(`O(1)`);
  const divisibilityRule = renderMath(
    `i \\bmod 3 = 0 \\quad \\text{or} \\quad i \\bmod 5 = 0`
  );

  const handleTest = () => {
    const num = parseInt(input, 10);
    if (!isNaN(num)) {
      setResult(sumMultiplesOf3Or5(num));
      setIsCalculated(true);
    } else {
      setResult(null);
    }
  };

  const handleReset = () => {
    setInput("10");
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
        <Card className="p-6">
          <motion.h1
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Problem 1: Multiples of 3 or 5
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="prose dark:prose-invert max-w-none">
              <p>
                If we list all natural numbers below{" "}
                <span dangerouslySetInnerHTML={{ __html: limitTen }} /> that are
                multiples of 3 or 5, we obtain{" "}
                <span dangerouslySetInnerHTML={{ __html: multiplesExample }} />.
                Their sum is{" "}
                <span dangerouslySetInnerHTML={{ __html: sampleSum }} />.
              </p>
              <p>
                The general task asks for the sum of every number smaller than{" "}
                <span dangerouslySetInnerHTML={{ __html: variableN }} /> that is
                divisible by 3 or 5. This is the classic warm-up problem that
                teaches clean iteration and modular arithmetic.
              </p>
            </div>
          </motion.div>
        </Card>

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
                Iterate through every integer{" "}
                <span dangerouslySetInnerHTML={{ __html: iteratorSymbol }} />{" "}
                satisfying{" "}
                <span dangerouslySetInnerHTML={{ __html: iterationRange }} />{" "}
                and evaluate the divisibility test.
              </p>
              <p>
                Add the number to a running sum when{" "}
                <span dangerouslySetInnerHTML={{ __html: divisibilityRule }} />{" "}
                holds; otherwise skip it.
              </p>
              <p>
                This single pass runs in{" "}
                <span dangerouslySetInnerHTML={{ __html: linearTime }} /> time
                with only{" "}
                <span dangerouslySetInnerHTML={{ __html: constantSpace }} />{" "}
                extra space, matching the straightforward implementation shown
                below.
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
                  Enter a number:
                </label>
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isCalculated}
                  className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
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
                  Sum of multiples of 3 or 5 below {input}:{" "}
                  <span className="text-green-400">{result}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </Card>

        <div className="flex justify-end">
          <Button asChild>
            <Link href="/notebook/project-euler-2">Next Problem</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
