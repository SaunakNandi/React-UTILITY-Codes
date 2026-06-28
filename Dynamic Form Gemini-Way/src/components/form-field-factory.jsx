import { CheckboxField } from "./check-box";
import { TextField } from "./text-field";

export const FormFieldFactory = ({ config, value, onChange }) => {
  // Map JSON strings directly to physical React components
  const componentMap = {
    text: TextField,
    checkbox: CheckboxField,
  };

  // Fallback to standard TextField if an unknown type comes from backend
  const TargetComponent = componentMap[config.type] || TextField;

  return (
    <TargetComponent
      label={config.label}
      placeholder={config.placeholder}
      required={config.required}
      // Pass down the exact live piece of state and its corresponding handler
      value={value}
      checked={value}
      onChange={onChange}
    />
  );
};
