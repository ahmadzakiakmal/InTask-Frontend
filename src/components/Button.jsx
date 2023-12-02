export default function Button({ text, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-max rounded-[10px] py-2 px-3 bg-purple-200 hover:bg-[#9676B0] transition duration-200 font-semibold text-white">
      <span>{text}</span>
    </button>
  );
}