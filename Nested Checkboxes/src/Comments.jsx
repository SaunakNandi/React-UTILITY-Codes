import React from "react";

const Comments = ({ data, handleChange }) => {
  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <div className="">
              <label htmlFor={item.id}>
                <input
                  id={item.id}
                  checked={item.checked}
                  type="checkbox"
                  onChange={() => handleChange(item.id, !item.checked)}
                />
                {item.label}
              </label>
              {item?.children.length > 0 && (
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  <Comments data={item.children} handleChange={handleChange} />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Comments;
