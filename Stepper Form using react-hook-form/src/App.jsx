import { useEffect, useState } from "react";
import "./App.css";
import { personalInfo } from "./components/personal-info";
import jobsDetails from "./components/jobs-details";
import skills from "./components/skills";
import review from "./components/review";
import { FormProvider, useForm } from "react-hook-form";

const components = [personalInfo, jobsDetails, skills, review];
const stepFields = [
  ["name", "role"],
  ["working", "company"],
  ["skills"],
  ["review"],
];
function App() {
  const [steps, setSteps] = useState(0);
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
  useEffect(() => {}, []);

  async function onNext() {
    const field = stepFields[steps];
    const isValid = await methods.trigger(field);
    console.log(field, isValid);
    if (isValid) setSteps((prev) => prev + 1);
  }

  function onSubmit(data) {
    console.log("data => ", data);
  }

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
              <button type="button">Prev</button>
            </div>
          </div>
          {steps + 1 == components.length && (
            <button className="submit" onClick={methods.handleSubmit(onSubmit)}>
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default App;
