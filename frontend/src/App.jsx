import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import EventForm from "./EventForm.jsx";
import RequestsList from "./RequestsList.jsx";
import Login from "./Login.jsx";

export default function App() {
  const [view, setView] = useState("new");
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Sidebar view={view} setView={setView} />
      <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        <Header onLogout={handleLogout} />
        <div className="flex-1 overflow-y-auto">
          {view === "new" ? (
            <EventForm onSubmitted={() => setView("list")} />
          ) : (
            <RequestsList />
          )}
        </div>
      </main>
    </div>
  );
}
