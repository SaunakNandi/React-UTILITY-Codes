import { useState } from "react";
import "./App.css";
import form_data from "./constant/form_data.json";
import { RenderField } from "./Render-Field";
function App() {
  const [input, setInput] = useState({});

  function submit(e) {
    e.preventDefault();
    console.log("form submitted ", input);
  }
  function handleChange(name, new_value) {
    setInput((prev) => {
      var valueObj = prev[name];
      if (name == "skill") {
        let arr = valueObj?.value;
        if (arr) {
          arr = arr.includes(new_value)
            ? arr.filter((x) => x != new_value)
            : [...arr, new_value];
        }
        valueObj = {
          ...valueObj,
          value: valueObj?.value ? arr : [new_value],
        };
        return {
          ...prev,
          [name]: valueObj,
        };
      } else {
        var valueObj = { ...prev[name] };
        valueObj = { ...valueObj, value: new_value };
        return {
          ...prev,
          [name]: valueObj,
        };
      }
    });
  }
  return (
    <>
      <form onSubmit={submit}>
        {form_data.fields.map((field) => (
          <div className="" key={field.name}>
            <label>{field.label}</label>
            <RenderField
              fieldObj={field}
              handleChange={handleChange}
              input={input}
            />
          </div>
        ))}
        <button type="submit">Click</button>
      </form>
    </>
  );
}

export default App;
