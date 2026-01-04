import { useState } from "react";
import "./App.css";
import { PersonalInfo } from "./components/personal-info";
import JobsDetails from "./components/jobs-details";
import Skills from "./components/skills";
import Review from "./components/review";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const components = [PersonalInfo, JobsDetails, Skills, Review];
const stepFields = [
  ["name", "role"],
  ["working", "company"],
  ["skills"],
  ["review"],
];
function App() {
  const [steps, setSteps] = useState(0);
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      role: "Select your role",
      phoneNo: "",
      experience: "",
      isWorking: "",
      companyName: "",
      skills: [{ name: "", rating: "" }],
      terms: false,
    },
  });

  async function onNext() {
    const field = stepFields[steps];
    const isValid = await methods.trigger(field);
    if (isValid) setSteps((prev) => prev + 1);
  }
  async function onPrev() {
    const field = stepFields[steps];
    const isValid = await methods.trigger(field);
    if (isValid) setSteps((prev) => prev - 1);
  }

  function onSubmit(data) {
    console.log("data => ", data);
  }
  const tcAcceptance = watch("tc");
  const StepComponent = components[steps];
  return (
    <FormProvider {...methods}>
      <form className="form">
        <p>
          Step : {steps + 1}/{components.length}
        </p>
        <StepComponent />
        <div className="">
          <div className="">
            <div className="left">
              <button
                type="button"
                onClick={onNext}
                disabled={steps + 1 >= components.length}
              >
                Next
              </button>
            </div>
            <div className="right">
              <button type="button" onClick={onPrev} disabled={steps - 1 <= 1}>
                Prev
              </button>
            </div>
          </div>
          {steps + 1 == components.length && (
            <button
              className="submit"
              onClick={methods.handleSubmit(onSubmit)}
              disabled={!tcAcceptance || isSubmitting}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default App;
