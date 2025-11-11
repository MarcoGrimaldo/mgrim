"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShikiCodeBlock } from "@/components/shiki-code-block";
import { renderMath } from "@/lib/renderMath";

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

  const sampleNumber = renderMath(`13195`);
  const sampleFactors = renderMath(`5,\\ 7,\\ 13,\\ 29`);
  const targetNumber = renderMath(`600851475143`);
  const factorConstraint = renderMath(`f^2 \\leq n`);
  const complexity = renderMath(`O(\\sqrt{n})`);

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
            Problem 3: Largest Prime Factor
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="prose dark:prose-invert max-w-none">
              <p>
                The integer{" "}
                <span dangerouslySetInnerHTML={{ __html: sampleNumber }} /> has
                prime factors{" "}
                <span dangerouslySetInnerHTML={{ __html: sampleFactors }} />,
                making it easy to verify the algorithm by hand.
              </p>
              <p>
                The actual Euler prompt asks for the largest prime factor of{" "}
                <span dangerouslySetInnerHTML={{ __html: targetNumber }} />. The
                tester below lets you explore other inputs as well.
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
                Start dividing the number by the smallest candidate factor (2),
                stripping it out completely before moving on. Whenever a factor
                does not divide the current value, increment the factor and try
                again.
              </p>
              <p>
                You can stop once{" "}
                <span dangerouslySetInnerHTML={{ __html: factorConstraint }} />{" "}
                no longer holds. At that point the remaining value must be
                prime, so it is the largest factor.
              </p>
              <p>
                Because the loop never tests factors above the square root of
                the input, the algorithm runs in{" "}
                <span dangerouslySetInnerHTML={{ __html: complexity }} /> time
                with constant memory usage.
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
                  Largest prime factor of {input}:{" "}
                  <span className="text-green-400">{result}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="outline" asChild>
            <Link href="/notebook/project-euler-2">Previous Problem</Link>
          </Button>
          <Button asChild>
            <Link href="/notebook/project-euler-4">Next Problem</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
