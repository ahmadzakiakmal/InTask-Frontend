export default function AddProjectButton({ onClick }) {
  return (
    <div className="relative right-0 w-[70px] h-[70px]">
      <button 
        onClick={onClick}
        className="w-full h-full bg-navy absolute top-0 left-0 py-5 px-5 rounded-full"
        style={{ top:"0px",left:"0px", alignItems:"center", justifyContent:"center", display:"flex" }}>
        <span style = {{ fontSize:"60px", fontWeight:"semi-bold", color: "#D6D5A8" }}>+</span>
      </button>
    </div>
  );
}
