import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "../ui/form";
import { Slider } from "../ui/slider";

interface PercentageProps {
  form: any; // Consider using a more specific type
  name: string;
  label: string;
  messages?: string[];
  steps: number;
  text?: any; // Consider using a more specific type
}

const PercentageSliderField = ({ form, name, label, messages, steps }: PercentageProps) => {
  const percentage = form.watch(name, [0]);

  // Determine alert variant and message based on percentage
  const getAlertDetails = () => {
    if (percentage < 20) {
      return null;
    } else if (percentage < 40) {
      return {
        color: "bg-state-error",
        variant: "bg-state-error-secondary border-state-error",
        message: messages?.at(0)
      };
    } else if (percentage < 60) {
      return {
        color: "bg-state-warning",
        variant: "bg-state-warning-secondary border-state-warning",
        message:messages?.at(1)
      };
    } else if (percentage < 80) {
      return {
        color: "bg-state-status",
        variant: "bg-state-status-secondary border-state-status",
        message:messages?.at(2)
      };
    } else if (percentage < 100) {
      return {
        color: "bg-state-info",
        variant: "bg-state-info-secondary border-state-info",
        message:messages?.at(3)
      };
    } else {
      return {
        color: "bg-accent-primary",
        variant: "bg-accent-secondary border-accent-primary",
        message: messages?.at(4)
        
      };
    }
  };

  const alertDetails = getAlertDetails();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex grow shrink flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Slider
              {...field}
              step={steps}
              className="grow shrink"
              color={alertDetails?.color}
              onValueChange={field.onChange}
              aria-label="Percentage"
            />
          </FormControl>
          <FormDescription>
          {alertDetails && (
            <div
              className={`${alertDetails.variant} rounded-sm border pt-5 pb-7 text-center mt-6 flex flex-col`}
            >
                <span className="text-label_m">
                    평가내용
                </span>
                <span className="text-title_m">
                    {alertDetails.message}
                </span>
            </div>
          )}
            </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default PercentageSliderField;
