import { useFieldArray, useForm, type FieldErrors } from "react-hook-form";
import "./App.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { mainSchema, type MainSchemaType } from "./schema";

function App() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MainSchemaType>({
    resolver: zodResolver(mainSchema),
    defaultValues: {
      role: "select",
      project: [
        {
          title: "",
          url: "",
        },
      ],
    },
  });
  const selectedRole = watch("role");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "project",
  });

  const roleMapping = [
    { label: "select", value: "Select a role" },
    { label: "frontend", value: "Frontend" },
    { label: "backend", value: "Backend" },
  ];
  console.log("selectd role");
  function onSubmit(data: MainSchemaType) {
    console.log("data ", data);
  }
  return (
    <div className="">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="">
            <input {...register("name")} placeholder="Enter name" />
            {errors.name && <p>{errors?.name?.message}</p>}
          </div>
          <div className="">
            <p>Enter Address</p>
            <input
              {...register("contact.address.city")}
              style={{ display: "block" }}
              placeholder="City"
            />
            <input
              {...register("contact.address.pinCode")}
              style={{ display: "block" }}
              placeholder="pincode"
            />
          </div>
          <div className="">
            <p>Select Role</p>
            <select {...register("role")}>
              {roleMapping.map((option) => (
                <option value={option.label} key={option.label}>
                  {option.value}
                </option>
              ))}
            </select>
            {selectedRole === "frontend" && (
              <div className="">
                <input {...register("framork_or_library")} />
                <p>
                  {
                    (
                      errors as FieldErrors<
                        Extract<MainSchemaType, { role: "frontend" }>
                      >
                    ).framork_or_library?.message
                  }
                </p>
              </div>
            )}
            {selectedRole === "backend" && (
              <div className="">
                <input {...register("framork_or_library")} />
              </div>
            )}
          </div>
          <div className="">
            <h2>Projet Name</h2>
            {fields.map((field, idx) => (
              <div className="" key={field.id}>
                <div className="">
                  <input {...register(`project.${idx}.title`)} />
                  {<p>{errors?.project?.[idx]?.title?.message}</p>}
                </div>
                <div className="">
                  <input {...register(`project.${idx}.url`)} />
                  <p>{errors?.project?.[idx]?.url?.message}</p>
                </div>
                <button type="button" onClick={() => remove(idx)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  url: "",
                  id: new Date().getTime().toString(),
                })
              }
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
