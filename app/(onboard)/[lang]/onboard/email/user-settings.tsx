import { Checkbox } from "@/components/ui/checkbox";



export default function UserSettings() {
  return (
    <div className="flex flex-col divide-y-2">
      <div className="flex items-center space-x-2 text-text-primary py-4">
        <Checkbox id="terms1" />
        <label
          htmlFor="terms1"
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <div className="flex items-center space-x-2 py-4">
        <Checkbox id="terms2" />
        <label
          htmlFor="terms2"
          className="text-text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <div className="flex items-center space-x-2 py-4">
        <Checkbox id="terms3" />
        <label
          htmlFor="terms3"
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    </div>
  );
}
