"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const CreateMissionStep1 = ({
  onInputChange,
  formData,
  lang,
}: {
  onInputChange: any;
  formData: any;
  lang: any;
}) => {
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Label className="min-w-[165px] text-title_m">
          {lang.mission.create.name}
          <span className="ml-1 text-state-error">*</span>
        </Label>
        <Input
          type="text"
          name="name"
          placeholder={lang.mission.create.name_placeholder}
          value={formData.name}
          onChange={onInputChange}
          className="flex grow"
        />
      </div>
      <div className="flex items-start gap-4">
        <Label className="min-w-[165px] text-title_m">
          {lang.mission.create.desc}
          <span className="ml-1 text-state-error">*</span>
        </Label>
        <Textarea
          name="description"
          placeholder={lang.mission.create.desc_placeholder}
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
          {lang.mission.create.date}
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
  );
};


export default CreateMissionStep1;