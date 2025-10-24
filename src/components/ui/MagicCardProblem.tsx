"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { useTheme } from "next-themes";

export function MagicCardProblem({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  const { theme } = useTheme();
  return (
    <Card className="p-0 max-w-sm w-full shadow-none border-none">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0"
      >
        <ShineBorder
          shineColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          borderWidth={2}
        />
        <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <form>
            <div className="grid gap-4">{description}</div>
          </form>
        </CardContent>
        <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
          <Button
            onClick={() => {
              window.open(link);
            }}
            className="w-full"
          >
            View solution!
          </Button>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
