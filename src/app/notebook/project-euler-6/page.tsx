"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { renderMath } from "@/lib/renderMath";
import { ShikiCodeBlock } from "@/components/shiki-code-block";
import { Button } from "@/components/ui/button";
import { sumSquareDifference } from "./code";

const MAX_N = 1000;

const codeSolution = `
function sumSquareDifference(n) {
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
`.trim();

export default function ProjectEuler6Page() {
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
    const difference = sumSquareDifference(n);
    setResult(difference);
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
  const sumOfSquaresFormula = renderMath(
    `1^2 + 2^2 + \\cdots + n^2 = \\frac{n(n+1)(2n+1)}{6}`,
    true
  );

  const squareOfSumFormula = renderMath(
    `(1 + 2 + \\cdots + n)^2 = \\left(\\frac{n(n+1)}{2}\\right)^2`,
    true
  );

  const differenceFormula = renderMath(
    `\\text{Difference} = \\left(\\frac{n(n+1)}{2}\\right)^2 - \\frac{n(n+1)(2n+1)}{6}`,
    true
  );

  const exampleSum = renderMath(`1^2 + 2^2 + \\cdots + 10^2 = 385`);
  const exampleSquare = renderMath(`(1 + 2 + \\cdots + 10)^2 = 55^2 = 3025`);

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
              Problem 6: Sum Square Difference
            </h1>
            <div className="prose dark:prose-invert max-w-none">
              <p>The sum of the squares of the first ten natural numbers is,</p>
              <div
                className="my-4 text-center"
                dangerouslySetInnerHTML={{ __html: exampleSum }}
              />
              <p>The square of the sum of the first ten natural numbers is,</p>
              <div
                className="my-4 text-center"
                dangerouslySetInnerHTML={{ __html: exampleSquare }}
              />
              <p>
                Hence the difference between the sum of the squares of the first
                ten natural numbers and the square of the sum is{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderMath(`3025 - 385 = 2640`),
                  }}
                />
                .
              </p>
              <p className="mt-4">
                Find the difference between the sum of the squares of the first{" "}
                <span dangerouslySetInnerHTML={{ __html: renderMath(`n`) }} />{" "}
                natural numbers and the square of the sum.
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
                We need to compute two values and find their difference. There
                are well-known mathematical formulas for both:
              </p>

              <h4 className="text-lg font-semibold mt-4 mb-2">
                Sum of Squares
              </h4>
              <p>The sum of the squares of the first n natural numbers:</p>
              <div
                className="my-4 text-center"
                dangerouslySetInnerHTML={{ __html: sumOfSquaresFormula }}
              />

              <h4 className="text-lg font-semibold mt-4 mb-2">
                Square of the Sum
              </h4>
              <p>The square of the sum of the first n natural numbers:</p>
              <div
                className="my-4 text-center"
                dangerouslySetInnerHTML={{ __html: squareOfSumFormula }}
              />

              <h4 className="text-lg font-semibold mt-4 mb-2">
                The Difference
              </h4>
              <p>
                The difference between the square of the sum and the sum of
                squares:
              </p>
              <div
                className="my-4 text-center"
                dangerouslySetInnerHTML={{ __html: differenceFormula }}
              />

              <p>
                For smaller values of{" "}
                <span dangerouslySetInnerHTML={{ __html: renderMath(`n`) }} />,
                we can simply iterate through each number, computing the sum and
                sum of squares directly. For larger values, the closed-form
                formulas above provide a more efficient solution.
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
                  Sum square difference for n = {input}:{" "}
                  <span className="font-mono text-green-400">{result}</span>
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/notebook/project-euler-5">Previous Problem</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
