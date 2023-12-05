export default function AddProjectButton({ onClick }) {
  return (
    <div className="relative right-0 w-[50px] sm:w-[70px] aspect-square grid place-items-center z-[1]">
      <button
        onClick={onClick}
        className="w-full h-full bg-navy absolute top-0 left-0 py-5 px-5 rounded-full text-[50px] sm:text-[60px] text-yellow grid place-items-center"
      >
        <span className="absolute">+</span>
      </button>
    </div>
  );
}
