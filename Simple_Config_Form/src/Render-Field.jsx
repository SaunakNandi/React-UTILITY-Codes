export const RenderField = ({ fieldObj, handleChange, input }) => {
  console.log("inputField ", input[fieldObj.name]?.value);
  const val = input[fieldObj.name]?.value;
  switch (fieldObj.type) {
    case "text":
      return (
        <input
          name={fieldObj.name}
          required={fieldObj.required}
          type={fieldObj.type}
          value={input[fieldObj.name]?.value}
          onChange={(e) => handleChange(fieldObj.name, e.target.value)}
        />
      );
    case "email":
      return (
        <input
          name={fieldObj.name}
          required={fieldObj.required}
          type={fieldObj.type}
          value={input[fieldObj.name]?.value}
          onChange={(e) => handleChange(fieldObj.name, e.target.value)}
        />
      );
    case "select":
      return (
        <select
          name={fieldObj.name}
          id="select-role"
          onChange={(e) => handleChange(fieldObj.name, e.target.value)}
          defaultValue={"Select"}
        >
          <option value="" disabled selected>
            Select an option
          </option>
          {fieldObj.option.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "number":
      return (
        <input
          name={fieldObj.name}
          required={fieldObj.required}
          type={fieldObj.type}
          min={fieldObj.min}
          max={fieldObj.max}
          value={input[fieldObj.name]?.value}
          onChange={(e) => handleChange(fieldObj.name, e.target.value)}
        />
      );
    case "radio":
      return (
        <>
          {fieldObj.option.map((item) => (
            <div className="">
              <input
                name={item}
                id={item}
                type={fieldObj.type}
                checked={item == input[fieldObj.name]?.value}
                value={input[fieldObj.name]?.value}
                onChange={(e) => handleChange(fieldObj.name, item)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </>
      );
    case "checkbox":
      return (
        <div className="checkbox">
          <div className="checkbox-display">
            {Array.isArray(input[fieldObj.name]?.value) &&
              input[fieldObj.name]?.value.map((bubble) => (
                <div className="bubble">
                  <p>{bubble}</p>
                </div>
              ))}
          </div>
          <div className="select-checkbox">
            {fieldObj.option.map((item, i) => (
              <div>
                <input
                  key={item}
                  type="checkbox"
                  name={item}
                  value={
                    input[fieldObj.name]?.value
                      ? input[fieldObj.name].value[i]
                      : ""
                  }
                  checked={input[fieldObj.name]?.value.some(
                    (str) => str == item
                  )}
                  onChange={(e) => handleChange(fieldObj.name, item)}
                />
                <span htmlFor="">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
  }
};
