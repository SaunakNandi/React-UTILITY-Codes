export const ProgressBar = ({ value }) => {
  return (
    <div className="progress-bar">
      <div
        className="slider"
        style={{
          width: `${value ? value : 0}%`,
        }}
      />
    </div>
  );
};
