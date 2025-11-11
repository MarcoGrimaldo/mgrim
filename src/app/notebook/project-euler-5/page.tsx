"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { renderMath } from "@/lib/renderMath";
import { ShikiCodeBlock } from "@/components/shiki-code-block";
import { Button } from "@/components/ui/button";
import { smallestMult } from "./code";

const MAX_N = 30;

const codeSolution = `
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function smallestMult(n) {
  let a = 1;
  for (let b = 2; b <= n; b++) {
    a = (a * b) / gcd(a, b);
  }
  return a;
}
`.trim();

export default function ProjectEuler5Page() {
  const [input, setInput] = useState("10");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const validateInput = (value: string): string | null => {
    if (value.trim() === "") {
      return "Please enter a value.";
    }
    const num = Number(value);
    if (!Number.isFinite(num)) {
      return "Input must be a valid number.";
    }
    if (!Number.isInteger(num)) {
      return "Only whole numbers are allowed.";
    }
    if (num < 1) {
      return "Enter a number greater than or equal to 1.";
    }
    if (num > MAX_N) {
      return `Try a number less than or equal to ${MAX_N} to keep the computation manageable.`;
    }
    return null;
  };

  const handleTest = () => {
    const validationMessage = validateInput(input);
    if (validationMessage) {
      setError(validationMessage);
      setResult(null);
      return;
    }

    const n = Number(input);
    const smallestMultiple = smallestMult(n);
    setResult(smallestMultiple);
    setError(null);
    setIsCalculated(true);
  };

  const handleReset = () => {
    setInput("10");
    setResult(null);
    setError(null);
    setIsCalculated(false);
  };

  // Render formulas with KaTeX
  const gcdFormula = renderMath(`\\text{GCD}(a, b)`);
  const lcmFormula = renderMath(
    `\\text{LCM}(a, b) = \\frac{a \\times b}{\\text{GCD}(a, b)}`,
    true
  );
  const euclidTitle = renderMath(`\\text{Euclid's Algorithm}`, true);

  const euclidSteps = renderMath(
    `
\\begin{aligned}
\\text{Given two numbers } a \\text{ and } b, \\\\
1. &\\text{ If } b = 0, \\text{ then } \\text{GCD}(a, b) = a. \\\\
2. &\\text{ Otherwise, compute } \\text{GCD}(b, a \\bmod b). \\\\
3. &\\text{ Repeat until } b = 0.
\\end{aligned}
`,
    true
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-900/60 py-10 px-4 rounded-lg -mt-20">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <Card className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Problem 5: Smallest multiple
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                <span
                  dangerouslySetInnerHTML={{ __html: renderMath(`2520`) }}
                />{" "}
                is the smallest number that can be divided by each of the
                numbers from{" "}
                <span dangerouslySetInnerHTML={{ __html: renderMath(`1`) }} />{" "}
                to{" "}
                <span dangerouslySetInnerHTML={{ __html: renderMath(`10`) }} />{" "}
                without any remainder.
                <br />
                <br />
                What is the smallest positive number that is evenly divisible by
                all of the numbers from{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: renderMath(`1`) }}
                />{" "}
                to{" "}
                <span dangerouslySetInnerHTML={{ __html: renderMath(`n`) }} /> ?
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Explanation + Math */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How to Solve
            </h2>

            <div className="prose dark:prose-invert max-w-none">
              <p>
                We’re looking for the least common multiple of numbers 1 through{" "}
                <span className="font-mono">n</span>. The relationship between
                GCD and LCM is expressed as:
              </p>

              {/* LCM Formula */}
              <div
                className="my-4 text-center"
                dangerouslySetInnerHTML={{ __html: lcmFormula }}
              />

              <p>
                Here, the greatest common divisor{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: gcdFormula }}
                  className="text-blue-500"
                />{" "}
                is computed efficiently using:
              </p>

              {/* Euclid's Algorithm */}
              <div
                className="my-4 text-center"
                dangerouslySetInnerHTML={{ __html: euclidTitle }}
              />
              <div
                className="my-4 text-center"
                dangerouslySetInnerHTML={{ __html: euclidSteps }}
              />

              <p>
                By applying this recursively, we can determine the{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: gcdFormula }}
                  className="text-blue-500"
                />{" "}
                of any two numbers quickly. Then, we combine them iteratively to
                find the overall{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderMath("\\text{LCM}(1, 2, ..., n)"),
                  }}
                  className="text-blue-500"
                />{" "}
                — the smallest number evenly divisible by all integers from 1 to{" "}
                <span className="font-mono">n</span>.
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Test the Solution
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-gray-700 dark:text-gray-300">
                  Enter a number (1-{MAX_N}):
                </label>
                <input
                  type="number"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (error) {
                      setError(null);
                    }
                  }}
                  disabled={isCalculated}
                  className="w-52 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
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

            {error && (
              <p
                className="mt-4 text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                {error}
              </p>
            )}

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
              >
                <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Smallest multiple for 1 to {input}:{" "}
                  <span className="font-mono text-green-400">{result}</span>
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        <div className="flex justify-start">
          <Button variant="outline" asChild>
            <Link href="/notebook/project-euler-4">Previous Problem</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
