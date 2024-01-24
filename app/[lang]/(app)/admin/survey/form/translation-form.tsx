// src/components/TranslationForm.js
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
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label>Content</label>
        <input {...register("content")} />
        {errors.content && <span>{errors.content.message?.toString()}</span>}
      </div>
      <div>
        <label>Category</label>
        <input {...register("category")} />
        {errors.category && <span>{errors.category.message?.toString()}</span>}
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <label>Message {index + 1}</label>
          <input {...register(`messages.${index}`)} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TranslationForm;
