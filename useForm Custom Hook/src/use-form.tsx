import { useState, type ChangeEvent, type SyntheticEvent } from "react";

// 1. Generic Types for Errors & Touched States
export type ValidationErrors<T> = Partial<Record<keyof T, string>>;
export type TouchedFields<T> = Partial<Record<keyof T, boolean>>;

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => ValidationErrors<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<TouchedFields<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⚡ Curried Handler for Input Change
  const handleChange =
    (name: keyof T) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { target } = e;
      const val =
        target.type === "checkbox"
          ? (target as HTMLInputElement).checked
          : e.target.value;

      setValues((prev) => ({ ...prev, [name]: val }));

      // Clear field error on typing if it exists
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    };

  // ⚡ Curried Handler for Input Blur
  const handleBlur = (name: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  // ⚡ Form Submit Handler
  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched on submit attempt
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as TouchedFields<T>);
    setTouched(allTouched);

    // Run Validation
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
