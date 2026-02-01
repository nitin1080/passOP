export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white w-full flex flex-col items-center justify-center py-4 mt-auto">
      <div className="logo font-bold text-2xl sm:text-3xl mb-1">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <div className="text-sm sm:text-lg text-center">
        Created With
        <i className="fa-solid fa-heart text-red-600 mx-1"></i>
        by <span className="font-semibold">Nitin Singh</span>
      </div>
    </footer>
  );
}
