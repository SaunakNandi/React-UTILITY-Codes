export const TextField = ({
  label,
  placeholder,
  value,
  onChange,
  required,
}) => (
  <div
    style={{ marginBottom: "15px", display: "flex", flexDirection: "column" }}
  >
    <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
    />
  </div>
);
