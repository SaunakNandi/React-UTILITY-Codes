import { useFormContext } from "react-hook-form";

const Review = () => {
  const { register } = useFormContext();
  return (
    <div className="">
      <label>
        <input
          type="checkbox"
          {...register("tc", { required: "You must understand the t&c" })}
        />
        Terms and Condition
      </label>
    </div>
  );
};

export default Review;
