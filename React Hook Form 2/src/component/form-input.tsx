import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex-1">
      <label className="text-sm font-medium block">{label}</label>
      <input
        className="w-full text-sm rounded-sm outline-none"
        ref={ref}
        {...props}
      />
      {error && <p className="text-red-600 text-xs">{error.message}</p>}
    </div>
  ),
);
