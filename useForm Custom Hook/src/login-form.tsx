import { useForm, type ValidationErrors } from "./use-form";

interface LoginForm {
  email: string;
  age: number;
}

export function LoginForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm<LoginForm>({
    initialValues: { email: "", age: 0 },
    validate: (vals) => {
      const errs: ValidationErrors<LoginForm> = {};
      if (!vals.email.includes("@")) errs.email = "Invalid email address";
      if (vals.age < 18) errs.age = "Must be 18 or older";
      return errs;
    },
    onSubmit: async (vals) => {
      console.log("Submitted successfully:", vals);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={values.email}
          onChange={handleChange("email")} // 💡 Strongly typed!
          onBlur={handleBlur("email")}
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting... 🌀" : "Submit 🚀"}
      </button>
    </form>
  );
}
