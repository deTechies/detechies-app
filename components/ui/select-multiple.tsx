import React, { useEffect, useRef, useState } from "react";

interface MultiSelectProps {
  options: Array<{ value: string; label: string }>;
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  // Any additional props
}


interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (selectedValues: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const selectedLabels = selectedValues
    .map(
      (value) =>
        options.find((option) => option.value === value)?.label || value
    )
    .join(", ");

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div onClick={() => setOpen(!open)}
      className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        {selectedLabels || "Select options..."}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            background: "white",
            border: "1px solid #ddd",
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

import { Control, Controller } from "react-hook-form";

export const MultiSelectFormField: React.FC<{
  control: Control<any>;
  name: string;
  options: Array<{ value: string; label: string }>;
}> = ({ control, name, options }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <MultiSelect
          options={options}
          selectedValues={field.value || []}
          onChange={(selected) => field.onChange(selected)}
        />
      )}
    />
  );
};
