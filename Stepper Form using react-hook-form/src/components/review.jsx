import React from "react";
import { useFormContext } from "react-hook-form";

const review = () => {
  const { register, watch } = useFormContext();
  const data = watch();
  return (
    <div className="">
      <label>
        <input type="checkbox" {...register("tc", { required: true })} />
        Terms and Condition
      </label>
    </div>
  );
};

export default review;
