// ... (The Brain setup goes above this)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-gray-900 text-white min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">Tech Ninja App 🥷</h1>

      {/* 🪆 The Russian Doll Inputs */}
      <div className="bg-[#F8FDC1] text-black p-4 rounded-lg space-y-4 shadow-lg">
        <h2 className="font-bold">Personal Info</h2>
        <div>
          <input 
            {...register("name")} 
            placeholder="Ninja Name" 
            className="border p-2 w-full rounded" 
          />
          <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
        </div>
        
        <div className="flex gap-4">
          <div className="w-1/2">
            <input 
              {...register("contact.address.city")} 
              placeholder="City" 
              className="border p-2 w-full rounded" 
            />
            <p className="text-red-600 text-sm mt-1">{errors.contact?.address?.city?.message}</p>
          </div>
          <div className="w-1/2">
            <input 
              {...register("contact.address.zipCode")} 
              placeholder="Zip Code (5 digits)" 
              className="border p-2 w-full rounded" 
            />
            <p className="text-red-600 text-sm mt-1">{errors.contact?.address?.zipCode?.message}</p>
          </div>
        </div>
      </div>

      {/* 🔀 The Shape-Shifter Inputs */}
      <div className="bg-[#F8FDC1] text-black p-4 rounded-lg space-y-4 shadow-lg">
        <h2 className="font-bold">Specialty</h2>
        <select {...register("role")} className="border p-2 w-full rounded cursor-pointer">
          <option value="frontend">Frontend 🎨</option>
          <option value="backend">Backend ⚙️</option>
        </select>

        {selectedRole === "frontend" && (
          <div>
            <input 
              {...register("favoriteFramework")} 
              placeholder="Favorite Framework (e.g., React)" 
              className="border p-2 w-full rounded" 
            />
            {/* Note: TypeScript needs a little help here because of the union type */}
            <p className="text-red-600 text-sm mt-1">
              {(errors as any).favoriteFramework?.message}
            </p>
          </div>
        )}

        {selectedRole === "backend" && (
          <div>
            <input 
              {...register("favoriteDatabase")} 
              placeholder="Favorite Database (e.g., Postgres)" 
              className="border p-2 w-full rounded" 
            />
            <p className="text-red-600 text-sm mt-1">
              {(errors as any).favoriteDatabase?.message}
            </p>
          </div>
        )}
      </div>

      {/* 👯‍♂️ The Clone Army Inputs */}
      <div className="bg-gray-800 p-4 rounded-lg space-y-4 shadow-lg">
        <h2 className="font-bold text-[#EAFF00]">Past Projects</h2>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-start bg-gray-700 p-3 rounded">
            <div className="w-2/5">
              <input 
                {...register(`projects.${index}.title`)} 
                placeholder="Project Title" 
                className="border p-2 w-full rounded text-black" 
              />
              <p className="text-red-400 text-sm mt-1">
                {errors.projects?.[index]?.title?.message}
              </p>
            </div>
            
            <div className="w-2/5">
              <input 
                {...register(`projects.${index}.url`)} 
                placeholder="Project URL" 
                className="border p-2 w-full rounded text-black" 
              />
              <p className="text-red-400 text-sm mt-1">
                {errors.projects?.[index]?.url?.message}
              </p>
            </div>
            
            <button 
              type="button" 
              onClick={() => remove(index)} 
              className="text-red-400 hover:text-red-300 p-2 font-bold text-xl"
              title="Remove Project"
            >
              🗑️
            </button>
          </div>
        ))}
        
        <button 
          type="button" 
          onClick={() => append({ title: "", url: "" })}
          className="bg-[#EAFF00] text-black px-4 py-2 rounded font-bold hover:bg-yellow-400 transition-colors"
        >
          + Add Project
        </button>
        
        <p className="text-red-400 text-sm">{errors.projects?.root?.message}</p>
      </div>

      {/* 🚀 Submit Button */}
      <button 
        type="submit" 
        className="bg-[#EAFF00] text-black w-full py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg"
      >
        Submit Application 🚀
      </button>
    </form>
  );
};