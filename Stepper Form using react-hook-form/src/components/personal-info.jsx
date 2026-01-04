import { useFormContext } from "react-hook-form";

export const PersonalInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="">
      <label htmlFor="">Name</label>
      <input
        type="text"
        {...register("name", {
          required: true,
          minLenght: {
            value: 3,
            message: "Name should be atleast of 3 letters",
          },
        })}
      />
      {errors.name && errors.name.message.length > 0 && (
        <p>{errors.name.message}</p>
      )}

      <label htmlFor="">Role</label>
      <select {...register("role")}>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="full-stack">Full stack</option>
      </select>
    </div>
  );
};
