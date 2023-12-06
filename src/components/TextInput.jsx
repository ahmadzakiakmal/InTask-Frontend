export default function TextInput({ label, ...prop }){
  return (
    <div className="relative flex flex-col mb-4">
      <div className="flex items-center mb-2">
        <div className="pl-5 w-32 flex justify-between items-center">
          <span className="text-black font-semibold sm:text-sm">{label}</span>
          <span>:</span>
        </div>
        <input 
          className="bg-neutral py-1 pl-32 rounded-md border border-purple-200 focus:outline-purple-200" 
          name={label}
          placeholder="Enter your answer here"
          {...prop}
        />
      </div>
    </div>);
}