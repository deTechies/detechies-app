"use client";
import { useState } from "react";
import { Club } from "@/lib/interfaces";
import Image from "@/components/ui/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Square } from "lucide-react";

export default function GroupCheckboxListItem({
  group,
  isChecked,
  onClick,
}: {
  group: Club;
  isChecked: Boolean;
  onClick?: any;
}) {
  return (
    <div
      className="flex h-[84px] py-4 px-5 items-center hover:bg-background-layer-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 w-[52px] h-[52px] overflow-hidden mr-5 rounded-full">
        <Image
          src={`https://ipfs.io/ipfs/${group.image}`}
          alt={group.name}
          width="52"
          height="52"
        ></Image>
      </div>

      <div className="grow">
        <div className="text-title_m mb-2">{group.name}</div>
        <div className="text-text-secondary text-label_m">{group.type}</div>
      </div>

      <div className="px-6">
        {isChecked ? (
          <Check className="text-accent-primary"></Check>
        ) : (
          <Square className="text-border-input"></Square>
        )}
      </div>
    </div>
  );
}
