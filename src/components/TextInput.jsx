export default function TextInput({ label, ...prop }){
  return (
    <div class="relative flex flex-col mb-4">
      <div className="flex items-center mb-2">
        <div class="pl-5 w-32 flex justify-between items-center">
          <span class="text-black font-semibold sm:text-sm">{label}</span>
          <span>:</span>
        </div>
        <input 
          class="bg-neutral py-1 pl-32 rounded-md border border-purple-200 focus:outline-purple-200" 
        name={label}
        placeholder="Enter your answer here"
        {...prop}
      />
      </div>
    </div>);
}