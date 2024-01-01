import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const StepOne = ({ onInputChange, formData }: any) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Label className="min-w-[165px]">Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Campaign Name"
          value={formData.name}
          onChange={onInputChange}
          className="flex grow"
        />
      </div>
      <div className="flex items-center gap-4">
        <Label className="min-w-[165px]">Description</Label>
        <Textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={onInputChange}
          className="flex grow"
        />
      </div>
      <div className="flex items-center gap-4 w-full">
        <Label className="min-w-[165px]">Date</Label>
        <div className="flex gap-4 items-center w-full">
          <Input
            type="date"
            name="begin_date"
            placeholder="Begin Date"
            className="flex grow"
            value={formData.begin_date}
            onChange={onInputChange}
          />
          <span>~</span>
          <Input
            type="date"
            name="end_date"
            className="grow"
            placeholder="End Date"
            value={formData.end_date}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );