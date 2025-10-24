import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { MagicCardProblem } from "@/components/ui/MagicCardProblem";
import { DATA } from "@/data/resume";

export default function NotebookPage() {
  return (
    <main className="p-1">
      <BlurFadeText
        text={` Here's the full list of my problem-solving exercises...`}
      ></BlurFadeText>
      <BlurFade delay={0.04}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {[...DATA.eulerProblems].reverse().map((problem) => (
            <MagicCardProblem
              key={problem.title}
              title={problem.title}
              description={problem.description}
              link={problem.link}
            />
          ))}
        </div>
      </BlurFade>
    </main>
  );
}
