import { useState } from "react";
import axios from "axios";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("ahsan@example.com");
  const [password, setPassword] = useState("123456");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });
      if (!data.token) throw new Error("Token not returned");
      setMsg("✅ Login successful");
      onSuccess(); // switch to form
    } catch (err) {
      setMsg("❌ " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Manager Login</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
          >
            Login
          </button>
        </form>
        {msg && (
          <p
            className={`mt-4 text-center text-sm ${
              msg.startsWith("✅") ? "text-green-300" : "text-red-300"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
