'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export const StepOne = ({ onInputChange, formData }: any) => {
  
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  return (
  <div className="flex flex-col gap-8">
    <div className="flex items-center gap-4">
      <Label className="min-w-[165px] text-title_m">
        Name
        <span className="ml-1 text-state-error">*</span>
      </Label>
      <Input
        type="text"
        name="name"
        placeholder="Campaign Name"
        value={formData.name}
        onChange={onInputChange}
        className="flex grow"
      />
    </div>
    <div className="flex items-start gap-4">
      <Label className="min-w-[165px] text-title_m">
        Description
        <span className="ml-1 text-state-error">*</span>
      </Label>
      <Textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={onInputChange}
        className="flex p-4 grow"
      />
    </div>

    <div>
      {/* <div className="flex justify-end gap-4">
        <div className="flex items-center mb-3">
          <Checkbox
            id="start_now"
            onCheckedChange={(value) => {
              console.log(value);
            }}
            className="mr-1"
          />
          
          <label
            htmlFor="start_now"
            className="text-label_s"
          >
            즉시 시작
          </label>
        </div>

        <div className="flex items-center mb-3">
          <Checkbox
            id="no_end_date"
            onCheckedChange={(value) => {
              console.log(value);
            }}
            className="mr-1"
          />
          
          <label
            htmlFor="no_end_date"
            className="text-label_s"
          >
            종료 일 없음
          </label>
        </div>
      </div> */}

      <div className="flex items-center w-full gap-4">
        <Label className="min-w-[165px] text-title_m">
          Date
          <span className="ml-1 text-state-error">*</span>
        </Label>
        <div className="flex items-center w-full gap-4">
          <Input
            type="date"
            name="begin_date"
            placeholder="Begin Date"
            className="flex grow"
            value={formData.begin_date}
            onChange={onInputChange}
            min={today}
          />
          <span>~</span>
          <Input
            type="date"
            name="end_date"
            className="grow"
            placeholder="End Date"
            value={formData.end_date}
            onChange={onInputChange}
            min={today}
          />
        </div>
      </div>
    </div>
  </div>
)};
