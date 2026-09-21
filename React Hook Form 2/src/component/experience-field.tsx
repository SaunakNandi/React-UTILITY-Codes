import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegistrationSchemaType } from "../schema/schema";

interface ExperienceFieldInterface {
  index: number;
  register: UseFormRegister<RegistrationSchemaType>;
  error: FieldErrors<RegistrationSchemaType>;
  onRemove: () => void;
  canRemove: boolean;
}

export function ExperienceField({
  index,
  register,
  error,
  onRemove,
  canRemove,
}: ExperienceFieldInterface) {
  const rowIndexError = error.experience?.[index];
  return (
    <div className="space-y-2 border rounded-md">
      <div className="">
        <label className="block text-sm">Role</label>
        <input
          className="rounded-sm w-full p-1 text-sm outline-none border-black"
          {...register(`experience.${index}.role`)}
          placeholder="role"
        />
        {rowIndexError?.role && (
          <p className="text-xs text-red-500">{rowIndexError.role?.message}</p>
        )}
      </div>
      <div className="">
        <label className="block text-sm">Company</label>
        <input
          className="rounded-sm w-full p-1 text-sm outline-none border-black"
          {...register(`experience.${index}.company`)}
          placeholder="company"
        />
        {rowIndexError?.company && (
          <p className="text-xs text-red-500">
            {rowIndexError.company?.message}
          </p>
        )}
      </div>
      <div className="">
        <label className="block text-sm">Years</label>
        <input
          className="rounded-sm w-full p-1 text-sm outline-none border-black"
          {...register(`experience.${index}.years`)}
          placeholder="years"
        />
        {rowIndexError?.years && (
          <p className="text-xs text-red-500">{rowIndexError.years?.message}</p>
        )}
      </div>
    </div>
  );
}
