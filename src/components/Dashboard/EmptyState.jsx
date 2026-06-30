import { FiInbox } from "react-icons/fi";

function EmptyState({
  title = "No Data Found",
  text = "Nothing available right now.",
  icon,
  buttonText,
  onClick,
}) {
  return (
    <div className="bg-[#fbfaf7] border border-black/5 rounded-3xl p-10 text-center">

      <div className="w-20 h-20 mx-auto rounded-full bg-[#D6BA72]/20 flex items-center justify-center text-[#9b7423] text-4xl">
        {icon || <FiInbox />}
      </div>

      <h3 className="text-2xl font-black mt-6">
        {title}
      </h3>

      <p className="text-neutral-500 mt-3 max-w-md mx-auto">
        {text}
      </p>

      {buttonText && (
        <button
          onClick={onClick}
          className="mt-7 px-7 py-3 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;