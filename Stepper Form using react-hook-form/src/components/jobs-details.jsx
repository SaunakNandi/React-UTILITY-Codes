import { useFormContext } from "react-hook-form";

const jobsDetails = () => {
  const { register, watch } = useFormContext();
  const isWorking = watch("working");
  return (
    <>
      <label htmlFor="">Is Working</label>
      <br />
      <input type="radio" {...register("working")} value="yes" />
      yes
      <input type="radio" {...register("working")} value="no" />
      no
      {isWorking == "yes" && (
        <>
          <label>Company Name</label>
          <input
            type="text"
            {...register("company", { required: true, minLength: 2 })}
          />
        </>
      )}
    </>
  );
};

export default jobsDetails;
