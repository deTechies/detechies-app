import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Slider } from "../ui/slider";

interface PercentageProps {
  form: any; // Consider using a more specific type
  name: string;
  label: string;
  messages?: string[];
  steps: number;
  text?: any; // Consider using a more specific type
  disabled?: boolean;
}

const PercentageSliderField = ({
  form,
  name,
  label,
  messages,
  steps,
  disabled = false,
  text,
}: PercentageProps) => {
  const percentage = form.watch(name, 0);

  // Determine alert variant and message based on percentage
  const getAlertDetails = () => {
    if (percentage == 0) {
      return null;
    } else if (percentage < 21) {
      return {
        color: "bg-state-error",
        variant: "bg-state-error-secondary border-state-error",
        message: messages?.at(0),
      };
    } else if (percentage < 41) {
      return {
        color: "bg-state-warning",
        variant: "bg-state-warning-secondary border-state-warning",
        message: messages?.at(1),
      };
    } else if (percentage < 61) {
      return {
        color: "bg-state-status",
        variant: "bg-state-status-secondary border-state-status",
        message: messages?.at(2),
      };
    } else if (percentage < 81) {
      return {
        color: "bg-state-info",
        variant: "bg-state-info-secondary border-state-info",
        message: messages?.at(3),
      };
    } else {
      return {
        color: "bg-accent-primary",
        variant: "bg-accent-secondary border-accent-primary",
        message: messages?.at(4),
      };
    }
  };

  const alertDetails = getAlertDetails();

  const handleSliderChange = (valueArray: Array<number>) => {
    // Assuming the slider's value is an array with a single element
    const value = valueArray[0];
    form.setValue(name, value); // Update the form with the single number value
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col grow shrink">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Slider
              {...field}
              step={steps}
              value={[field.value ?? percentage]} // Pass as an array
              className="grow shrink"
              color={alertDetails?.color}
              onValueChange={handleSliderChange}
              aria-label="Percentage"
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            {alertDetails && (
              <div
                className={`${alertDetails.variant} rounded-sm border pt-5 pb-7 text-center mt-6 flex flex-col`}
              >
                <span className="mb-3 text-label_m text-text-secondary">{text.evaluation_contents}</span>
                <span className="text-title_m">{alertDetails.message}</span>
              </div>
            )}
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default PercentageSliderField;
