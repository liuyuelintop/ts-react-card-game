import React from "react";

interface NumberInputControlProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const NumberInputControl: React.FC<NumberInputControlProps> = ({
  label,
  value,
  min,
  max,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lg">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-3 py-2 border rounded-lg bg-gray-700 text-white"
      />
    </div>
  );
};

export default NumberInputControl;
