export default function Button({ text, onClick, className, disabled, type }) {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={"w-max rounded-[10px] py-2 px-3 bg-purple-200 hover:bg-[#9676B0] transition duration-200 font-semibold text-white disabled:bg-purple-200/80 disabled:cursor-not-allowed " + className}>
      <span>{text}</span>
    </button>
  );
}