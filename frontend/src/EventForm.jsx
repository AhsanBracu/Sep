import { useState } from "react";
import axios from "axios";

export default function EventForm({ onSubmitted }) {
  const [form, setForm] = useState({
    recordNumber: "",
    clientName: "",
    eventType: "",
    description: "",
    expectedNumber: "",
    budget: "",
    from: "",
    to: "",
    decorations: "",
    food: "",
    photos: "",
    music: "",
    artwork: "",
    computer: "",
    other: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // 1) Functional updater prevents focus loss / stale state in StrictMode
  // functional state update (keystroke-safe)
const handleChange = (e) => {
  const { name, value } = e.target;

  // prevent negatives and non-digits for numeric fields
  if (["expectedNumber", "budget"].includes(name)) {
    // strip non-digits
    const num = value.replace(/[^0-9]/g, "");
    // prevent typing 0 as the only char
    if (num === "0") return;
    setForm((prev) => ({ ...prev, [name]: num }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
};

const validate = () => {
  const e = {};
  const empty = (v) => !v || String(v).trim() === "";

  if (empty(form.recordNumber)) e.recordNumber = "Required";
  if (empty(form.clientName)) e.clientName = "Required";
  if (empty(form.eventType)) e.eventType = "Required";
  if (empty(form.description)) e.description = "Required";
  if (empty(form.from)) e.from = "Required";
  if (empty(form.to)) e.to = "Required";
  if (!empty(form.from) && !empty(form.to) && new Date(form.from) > new Date(form.to))
    e.to = "End must be after start";

  // positive integer validation (>=1)
  const toInt = (v) => parseInt(v, 10);
  if (empty(form.expectedNumber) || toInt(form.expectedNumber) < 1)
    e.expectedNumber = "Must be at least 1";
  if (empty(form.budget) || toInt(form.budget) < 1)
    e.budget = "Must be at least 1";

  setErrors(e);
  return Object.keys(e).length === 0;
};

  // 2) Submit only via form onSubmit + button type="submit"
  const submitForm = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      const fill = (v) => (v && String(v).trim() ? v : "N/A");
      const payload = {
        ...form,
        decorations: fill(form.decorations),
        food: fill(form.food),
        photos: fill(form.photos),
        music: fill(form.music),
        artwork: fill(form.artwork),
        computer: fill(form.computer),
        other: fill(form.other),
        title:
          `${form.eventType || "Event"} - ${form.clientName || "Client"}` +
          (form.recordNumber ? ` (#${form.recordNumber})` : "")
      };

      await axios.post("http://localhost:8000/events", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Request submitted successfully!");
      setForm({
        recordNumber: "",
        clientName: "",
        eventType: "",
        description: "",
        expectedNumber: "",
        budget: "",
        from: "",
        to: "",
        decorations: "",
        food: "",
        photos: "",
        music: "",
        artwork: "",
        computer: "",
        other: ""
      });
      setErrors({});
      if (typeof onSubmitted === "function") onSubmitted();
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || err.message));
      console.error("Event creation error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const label = "block text-sm font-semibold mb-1 text-gray-200";
  const input =
    "w-full px-4 py-2 rounded-lg bg-white/15 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="flex justify-center p-6">
      {/* 3) Do NOT add a changing `key` prop to this form or its parents */}
      <form onSubmit={submitForm} className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8 space-y-6 text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Client Event Request Details</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={label}>Client Record Number:</label>
            <input name="recordNumber" value={form.recordNumber} onChange={handleChange} className={input} placeholder="Enter record number" />
            {errors.recordNumber && <p className="mt-1 text-xs text-red-300">{errors.recordNumber}</p>}
          </div>

          <div>
            <label className={label}>Client Name:</label>
            <input name="clientName" value={form.clientName} onChange={handleChange} className={input} placeholder="Enter client name" />
            {errors.clientName && <p className="mt-1 text-xs text-red-300">{errors.clientName}</p>}
          </div>

          <div>
            <label className={label}>Event Type:</label>
            <input name="eventType" value={form.eventType} onChange={handleChange} className={input} placeholder="Workshop, Seminar, etc." />
            {errors.eventType && <p className="mt-1 text-xs text-red-300">{errors.eventType}</p>}
          </div>

          <div>
            <label className={label}>Description:</label>
            <input name="description" value={form.description} onChange={handleChange} className={input} placeholder="Brief description" />
            {errors.description && <p className="mt-1 text-xs text-red-300">{errors.description}</p>}
          </div>

          <div>
            <label className={label}>Expected Number:</label>
            <input name="expectedNumber" value={form.expectedNumber} onChange={handleChange} className={input} placeholder="e.g. 200" inputMode="numeric" />
            {errors.expectedNumber && <p className="mt-1 text-xs text-red-300">{errors.expectedNumber}</p>}
          </div>

          <div>
            <label className={label}>Planned Budget:</label>
            <input name="budget" value={form.budget} onChange={handleChange} className={input} placeholder="e.g. 50000" inputMode="decimal" />
            {errors.budget && <p className="mt-1 text-xs text-red-300">{errors.budget}</p>}
          </div>

          <div>
            <label className={label}>From (Start Date):</label>
            <input type="date" name="from" value={form.from} onChange={handleChange} className={input} />
            {errors.from && <p className="mt-1 text-xs text-red-300">{errors.from}</p>}
          </div>

          <div>
            <label className={label}>To (End Date):</label>
            <input type="date" name="to" value={form.to} onChange={handleChange} className={input} />
            {errors.to && <p className="mt-1 text-xs text-red-300">{errors.to}</p>}
          </div>
        </div>

        <div>
          <label className={label}>Decorations:</label>
          <textarea name="decorations" value={form.decorations} onChange={handleChange} className={`${input} h-20`} placeholder="Describe decoration needs" />
        </div>

        <div>
          <label className={label}>Food / Drinks:</label>
          <textarea name="food" value={form.food} onChange={handleChange} className={`${input} h-20`} placeholder="e.g. buffet, coffee breaks" />
        </div>

        <div>
          <label className={label}>Filming / Photos:</label>
          <textarea name="photos" value={form.photos} onChange={handleChange} className={`${input} h-20`} placeholder="Any photo or video requirements" />
        </div>

        <div>
          <label className={label}>Music:</label>
          <textarea name="music" value={form.music} onChange={handleChange} className={`${input} h-20`} placeholder="Preferred genres or artists" />
        </div>

        <div>
          <label className={label}>Posters / Artwork:</label>
          <textarea name="artwork" value={form.artwork} onChange={handleChange} className={`${input} h-20`} placeholder="Specify posters or visuals needed" />
        </div>

        <div>
          <label className={label}>Computer-Related Issues:</label>
          <textarea name="computer" value={form.computer} onChange={handleChange} className={`${input} h-20`} placeholder="e.g. projector, materials from client" />
        </div>

        <div>
          <label className={label}>Other Needs:</label>
          <textarea name="other" value={form.other} onChange={handleChange} className={`${input} h-20`} placeholder="Any additional notes" />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-medium"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
