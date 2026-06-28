export const CheckboxField = ({ label, checked, onChange }) => (
  <div
    style={{
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onChange(e.target.checked)}
      id={label}
    />
    <label htmlFor={label} style={{ fontWeight: "bold" }}>
      {label}
    </label>
  </div>
);
