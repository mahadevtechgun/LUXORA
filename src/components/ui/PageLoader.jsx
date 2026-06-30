import logo from "../../assets/img/woologo.png";

function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <img
        src={logo}
        alt="logo"
        className="w-40 sm:w-56 animate-pulse"
      />

      <div className="mt-6 w-40 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
        <div className="loader-bar h-full bg-[#D6BA72] rounded-full"></div>
      </div>

      <p className="mt-4 text-sm font-bold text-neutral-500 tracking-wider">
        Loading...
      </p>
    </div>
  );
}

export default PageLoader;