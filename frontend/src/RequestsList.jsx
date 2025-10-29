import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/events");
        if (mounted) setItems(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6 text-white">Loading…</div>;
  if (!items.length) return <div className="p-6 text-white">No requests yet.</div>;

  return (
    <div className="p-6 grid md:grid-cols-2 gap-4">
      {items.map((it) => (
        <div key={it._id || it.recordNumber} className="bg-white/10 border border-white/20 rounded-xl p-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{it.title || it.eventType || "Event"}</h3>
            <span className="text-xs px-2 py-1 rounded bg-white/15">{it.status || "initiated"}</span>
          </div>
          <p className="text-sm opacity-80">Client: {it.clientName || "—"}</p>
          <p className="text-sm opacity-80">
            Dates: {(it.from || it.startDate || "—")} → {(it.to || it.endDate || "—")}
          </p>
          {it.description && <p className="text-sm mt-2">{it.description}</p>}
        </div>
      ))}
    </div>
  );
}
