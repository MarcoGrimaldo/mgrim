"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShikiCodeBlock } from "@/components/shiki-code-block";

// --- Problem text (Project Euler #3) ---
const problemDescription = `
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143?
`;

const explanation = `
Approach:
1. Start with the smallest prime factor (2).
2. While factor * factor ≤ number:
     • If number is divisible by factor, divide it out completely.
     • Otherwise, move to the next factor.
3. When the loop ends, the remaining number is the largest prime factor.

Why it works:
Each time a factor divides the number, we reduce the problem to a smaller quotient.
By the time factor² exceeds the number, any remaining quotient must itself be prime.
This algorithm runs efficiently in O(√n).
`;

// --- Solver ---
function largestPrimeFactor(number: number): number {
  let factor = 2;
  while (factor * factor <= number) {
    if (number % factor === 0) {
      number = number / factor;
    } else {
      factor++;
    }
  }
  return number;
}

// --- Code to display ---
const codeSolution = `
function largestPrimeFactor(number: number): number {
  let factor = 2;

  while (factor * factor <= number) {
    if (number % factor === 0) {
      number = number / factor; // divide out this factor completely
    } else {
      factor++; // move to next possible factor
    }
  }

  return number;
}
`;

export default function ProjectEuler3Page() {
  const [input, setInput] = useState("13195");
  const [result, setResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleTest = () => {
    const num = parseInt(input, 10);
    if (!isNaN(num) && num > 1) {
      setResult(largestPrimeFactor(num));
      setIsCalculated(true);
    } else {
      setResult(null);
    }
  };

  const handleReset = () => {
    setInput("13195");
    setResult(null);
    setIsCalculated(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 rounded-lg -mt-20">
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
            Project Euler Problem 3 — Largest Prime Factor
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="prose p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <pre className="whitespace-pre-wrap mb-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                {problemDescription}
              </pre>
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
            <div className="prose p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg whitespace-pre-wrap mb-2 text-gray-900 dark:text-white">
                {explanation}
              </pre>
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
                  Enter a number:
                </label>
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
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

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
              >
                <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Largest prime factor of {input}: {result}
                </p>
              </motion.div>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </main>
  );
}
