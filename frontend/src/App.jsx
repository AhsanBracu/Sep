import { useState } from "react";
import Login from "./Login.jsx";
import ClientForm from "./ClientForm.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {loggedIn ? (
        <ClientForm />
      ) : (
        <Login onSuccess={() => setLoggedIn(true)} />
      )}
    </div>
  );
}
