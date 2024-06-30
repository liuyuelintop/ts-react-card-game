import React from "react";

interface SelectControlProps {
  label: string;
  value: string | number;
  options: (string | number)[];
  onChange: (value: string | number) => void;
}

const SelectControl: React.FC<SelectControlProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border rounded-lg bg-gray-700 text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectControl;
