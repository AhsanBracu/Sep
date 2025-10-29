import { useState } from "react";
import axios from "axios";

export default function ClientForm() {
  const [form, setForm] = useState({
    recordNumber: "",
    clientName: "",
    eventType: "Workshop",
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
    other: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/client-request", form);
      alert("✅ Request submitted successfully!");
      setForm({
        recordNumber: "",
        clientName: "",
        eventType: "Workshop",
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
        other: "",
      });
    } catch (err) {
      alert("❌ " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="flex justify-center p-6">
      <form
        onSubmit={submitForm}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Client Request Details</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input name="recordNumber" placeholder="Client Record Number" value={form.recordNumber} onChange={handleChange} className="input" />
          <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} className="input" />
          <input name="eventType" placeholder="Event Type" value={form.eventType} onChange={handleChange} className="input" />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input" />
          <input name="expectedNumber" placeholder="Expected Number" value={form.expectedNumber} onChange={handleChange} className="input" />
          <input name="budget" placeholder="Planned Budget (SEK)" value={form.budget} onChange={handleChange} className="input" />
          <input type="date" name="from" value={form.from} onChange={handleChange} className="input" />
          <input type="date" name="to" value={form.to} onChange={handleChange} className="input" />
        </div>

        <textarea name="decorations" placeholder="Decorations" value={form.decorations} onChange={handleChange} className="input h-20" />
        <textarea name="food" placeholder="Food/Drinks" value={form.food} onChange={handleChange} className="input h-20" />
        <textarea name="photos" placeholder="Filming/Photos" value={form.photos} onChange={handleChange} className="input h-20" />
        <textarea name="music" placeholder="Music" value={form.music} onChange={handleChange} className="input h-20" />
        <textarea name="artwork" placeholder="Posters/Art Work" value={form.artwork} onChange={handleChange} className="input h-20" />
        <textarea name="computer" placeholder="Computer-Related Issues" value={form.computer} onChange={handleChange} className="input h-20" />
        <textarea name="other" placeholder="Other Needs" value={form.other} onChange={handleChange} className="input h-20" />

        <button type="submit" className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium">
          Submit Request
        </button>
      </form>
    </div>
  );
}
