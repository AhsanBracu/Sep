export default function Sidebar({ view, setView }) {
  const Item = ({ id, label }) => (
    <button
      onClick={() => setView(id)}
      className={`w-full text-left px-4 py-2 rounded-lg mb-2 text-white ${
        view === id ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <aside
      className="fixed inset-y-0 left-0 w-64 p-4
                 bg-slate-900/90 backdrop-blur-sm
                 border-r border-white/10 overflow-y-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-white">Manager</h2>
      <Item id="new" label="New Request" />
      <Item id="list" label="Requests" />
    </aside>
  );
}
