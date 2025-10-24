"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShikiCodeBlock } from "@/components/shiki-code-block";

const problemDescription = `
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. 
The sum of these multiples is 23. 
Find the sum of all the multiples of 3 or 5 below the provided parameter value number.
`;

const explanation = `
To solve this problem, iterate through all numbers less than the given parameter.
For each number, check if it is divisible by 3 or 5.
If it is, add it to a running total.
Return the total sum after checking all numbers.
`;

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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 rounded-lg -mt-20">
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
            Project Euler Problem 1
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="prose p-4 bg-gray-100 dark:bg-gray-800 rounded-lg ">
              <pre className="whitespace-pre-wrap mb-3 bg-gray-100  dark:bg-gray-800 text-gray-900 dark:text-white">
                {problemDescription}
              </pre>
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
            <div className="prose p-4 bg-gray-100 dark:bg-gray-800 rounded-lg ">
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
                  Sum of multiples of 3 or 5 below {input}: {result}
                </p>
              </motion.div>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </main>
  );
}
