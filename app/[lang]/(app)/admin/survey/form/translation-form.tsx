// src/components/TranslationForm.js
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const TranslationForm = ({
  onSubmit,
  defaultValues,
  questionId,
  language,
}: {
  onSubmit: any;
  defaultValues: any;
  questionId: string;
  language: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onFormSubmit = (data: any) => {
    console.log("Form Data:", data); // Log the raw form data
    const formattedData = {
      content: data.content,
      category: data.category,
      messages: Object.keys(data)
        .filter(key => key.startsWith("messages"))
        .map(key => data[key])
    };

    console.log("Formatted Data:", formattedData); // Log the formatted data
    onSubmit(formattedData);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-1">
      <div className="flex flex-col">
        <label>Content</label>
        <Input {...register("content")} />
        {errors.content && <span>{errors.content.message?.toString()}</span>}
      </div>
      <div className="flex flex-col">
        <label>Category</label>
        <Input {...register("category")} />
        {errors.category && <span>{errors.category.message?.toString()}</span>}
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex flex-col" key={index}>
          <label>Message {index + 1}</label>
          <Input {...register(`messages.${index}`)} />
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default TranslationForm;
