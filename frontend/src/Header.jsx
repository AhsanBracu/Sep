import { UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Header({ onLogout }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-slate-900/80 border-b border-white/10 backdrop-blur-sm sticky top-0 z-50">
      <h1 className="text-xl font-semibold text-white">Client Request System</h1>

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex items-center gap-2">
          <UserCircleIcon className="w-8 h-8 text-gray-300" />
          <span className="text-gray-200 text-sm hidden sm:inline">Manager</span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
