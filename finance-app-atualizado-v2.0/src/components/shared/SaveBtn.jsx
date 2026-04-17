export function SaveBtn({ onClick, children = "Salvar" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white py-3 rounded-xl font-semibold mt-2 transition-all"
    >
      {children}
    </button>
  );
}
