"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";

export default function MissionSummary({}: {}) {
  const [showFull, setShowFull] = useState(false);

  const list = [
    {
      name: "주니어 세션 1회 진행",
      isEssential: true,
      isChecked: true,
      points: 20,
    },
    {
      name: "주니어 세션 1회 진행",
      isEssential: true,
      isChecked: false,
      points: 15,
    },
    {
      name: "주니어 세션 1회 진행",
      isEssential: false,
      isChecked: true,
      points: 20,
    },
    {
      name: "주니어 세션 1회 진행",
      isEssential: false,
      isChecked: false,
      points: 20,
    },
  ];

  const totalPoints = list.reduce(
    (accumulator, currentItem) => accumulator + currentItem.points,
    0
  );

  const checkedPoints = list.reduce((accumulator, currentItem) => {
    if (currentItem.isChecked) {
      return accumulator + currentItem.points;
    }
    return accumulator;
  }, 0);

  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-row items-center justify-between px-8 py-7">
        <span className="text-subhead_s">총 미션 ({list.length})</span>

        <div className="p-3 text-center rounded-full text-title_l grow max-w-[140px] border-2 border-icon-primary">
          {checkedPoints}/{totalPoints}
        </div>
      </Card>

      {list &&
        list.map((item: any, index: number) => {
          return (
            <Card className="flex-row items-center px-8 py-7" key={index}>
              <div
                className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${
                  item.isChecked
                    ? "bg-accent-primary text-accent-on-primary"
                    : "bg-background-layer-2 text-text-placeholder"
                }`}
              >
                <Check className="w-8 h-8">Hi!</Check>
              </div>

              <div className="flex flex-col items-start gap-3 grow">
                <span className="text-title_l">{item.name}</span>

                {item.isEssential ? (
                  <Badge variant="success" className="px-1.5">
                    필수 미션
                  </Badge>
                ) : null}
              </div>

              <div
                className={`p-3 text-center rounded-full text-title_l grow max-w-[140px] ${
                  item.isChecked
                    ? "bg-accent-secondary"
                    : "bg-background-layer-2 text-text-secondary"
                }`}
              >
                {item.points}점 {item.isChecked ? " 획득!" : null}
              </div>
            </Card>
          );
        })}
    </div>
  );
}
