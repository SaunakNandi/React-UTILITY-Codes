import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
const skills = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  return (
    <>
      {fields.map((_field, i) => (
        <div key={i}>
          <input
            placeholder="Enter the skill"
            {...register(`skills.${i}.name`)}
          />
          <select {...register(`skills.${i}.rating`)}>
            <option value="1">Beginner</option>
            <option value="3">Intermediate</option>
            <option value="5">Advance</option>
          </select>
          <button type="button" onClick={() => remove(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", rating: "" })}>
        Add
      </button>
    </>
  );
};

export default skills;
