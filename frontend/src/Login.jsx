import { useState } from "react";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("ahsan@example.com");
  const [password, setPassword] = useState("123456");
  const [msg, setMsg] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000", { email, password });
      setMsg("✅ Token: " + data.token);
    } catch (err) {
      setMsg("❌ " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">Login</h1>
        <form onSubmit={login} className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium transition"
          >
            Login
          </button>
        </form>
        {msg && (
          <p className={`mt-4 text-center text-sm ${msg.startsWith("✅") ? "text-green-300" : "text-red-300"}`}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
