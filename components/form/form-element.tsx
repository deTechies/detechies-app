import { Label } from "../ui/label";

export const FormElement = ({ children, ...props }: any) => {
    return (
      <div className="flex items-center" {...props}>
        <Label className="flex-start shrink-0 w-[182px]">{props.label}</Label>
        <div className="grow items-start justify-start">{children}</div>
      </div>
    );
  };
  