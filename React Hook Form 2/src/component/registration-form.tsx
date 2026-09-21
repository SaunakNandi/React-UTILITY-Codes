import { useFieldArray, useForm } from "react-hook-form";
import { registrationSchema, RegistrationSchemaType } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./form-input";
import { ExperienceField } from "./experience-field";

export const RegistrationForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confimPassoword: "",
      experience: [{ role: "", years: 0, company: "" }],
    },
    mode: "onTouched",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  function onSubmit(data: RegistrationSchemaType) {
    console.log("data ");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[100vw] p-6 space-y-4">
      <FormInput
        label={"Name"}
        error={errors.name}
        className="w-full h-30px p-1 rounded-sm border-1 outline-none"
        {...register("name")}
      />
      <FormInput
        label={"Email"}
        error={errors.email}
        className="w-full h-30px p-1 rounded-sm border-1 outline-none"
        {...register("email")}
      />
      <FormInput
        label={"password"}
        error={errors.password}
        className="w-full h-30px p-1 rounded-sm border-1 outline-none"
        {...register("password")}
      />
      <FormInput
        label={"Confirm Password"}
        error={errors.confimPassoword}
        className="w-full h-30px p-1 rounded-sm border-1 outline-none"
        {...register("confimPassoword")}
      />
      <div className="w-full p-1 flex flex-col gap-2">
        <div className="w-full flex gap-3">
          <span>Experience: </span>
          <button
            type="button"
            onClick={() => append({ role: "", years: 0, company: "" })}
          >
            Add+
          </button>
        </div>
        {errors.experience?.root && (
          <p className="text-xs text-red-500">
            {errors.experience.root.message}
          </p>
        )}
        <div className="w-full p-2">
          {fields.map((item, i) => (
            <ExperienceField
              index={i}
              key={item.id}
              register={register}
              error={errors}
              onRemove={remove}
              canRemove={fields.length > 1}
            />
          ))}
        </div>
      </div>
    </form>
  );
};
