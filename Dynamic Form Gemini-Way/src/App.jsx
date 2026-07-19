import { useState } from "react";
import "./App.css";
import { mockBackendSchema } from "./constant";
import { FormFieldFactory } from "./components/form-field-factory";

function App() {
  // Helper Function: Flatten schema layout down to a clean, simple state object
  // Creates: { last_name: "", email: "", phone: "", accept_terms: false }
  const [formValues, setFormValues] = useState(() => {
    const initialState = {};
    Object.values(mockBackendSchema).forEach((section) => {
      section.inputs.forEach((input) => {
        initialState[input.name] =
          input.type === "checkbox"
            ? input.checked || false
            : input.value || "";
      });
    });
    return initialState;
  });

  // Centralized Event Handler: Targets dynamic keys surgically 🎯
  const handleFieldChange = (fieldName, updatedValue) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: updatedValue,
    }));
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 Payload ready for backend transfer:", formValues);
    alert(JSON.stringify(formValues, null, 2));
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* Step A: Loop over the main schema object categories */}
        {Object.entries(mockBackendSchema).map(([sectionKey, section]) => (
          <fieldset
            key={sectionKey}
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            {section.name && (
              <legend
                style={{ padding: "0 10px", fontWeight: "bold", color: "#333" }}
              >
                {section.name}
              </legend>
            )}

            {/* Step B: Loop over the array of inputs inside this section */}
            {section.inputs.map((inputConfig) => (
              <FormFieldFactory
                key={inputConfig.id}
                config={inputConfig}
                // Connect the specific state variable value to this input
                value={formValues[inputConfig.name]}
                // Tell the factory exactly which property inside our state object needs updating
                onChange={(newValue) =>
                  handleFieldChange(inputConfig.name, newValue)
                }
              />
            ))}
          </fieldset>
        ))}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default App;
