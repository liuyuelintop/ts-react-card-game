import React from "react";

interface CheckboxControlProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxControl: React.FC<CheckboxControlProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-6 w-6 rounded-lg bg-gray-700 text-white"
      />
      <label className="text-lg">{label}</label>
    </div>
  );
};

export default CheckboxControl;
