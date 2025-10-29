import { useState } from "react";
import axios from "axios";

// accept onSubmitted as a prop
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      console.log("Rendering EventForm", form);
    const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/events", form, {
        headers: { Authorization: `Bearer ${token}` },
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

      // call the callback passed from App.jsx to switch to the list view
      if (typeof onSubmitted === "function") onSubmitted();
    } catch (err) {
      alert("❌ " + (err.response?.data || err.message));
      console.error("Event creation error:", err);
    }
  };


  const labelStyle = "block text-sm font-semibold mb-1 text-gray-200";
  const inputStyle =
    "w-full px-4 py-2 rounded-lg bg-white/15 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="flex justify-center p-6">
      <form
        onSubmit={submitForm}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8 space-y-6 text-white"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Client Request Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Client Record Number:</label>
            <input
              name="recordNumber"
              value={form.recordNumber}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Enter record number"
            />
          </div>

          <div>
            <label className={labelStyle}>Client Name:</label>
            <input
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Enter client name"
            />
          </div>

          <div>
            <label className={labelStyle}>Event Type:</label>
            <input
              name="eventType"
              value={form.eventType}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Workshop, Seminar, etc."
            />
          </div>

          <div>
            <label className={labelStyle}>Description:</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Brief description"
            />
          </div>

          <div>
            <label className={labelStyle}>Expected Number:</label>
            <input
              name="expectedNumber"
              value={form.expectedNumber}
              onChange={handleChange}
              className={inputStyle}
              placeholder="e.g. 200"
            />
          </div>

          <div>
            <label className={labelStyle}>Planned Budget:</label>
            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className={inputStyle}
              placeholder="e.g. 50000"
            />
          </div>

          <div>
            <label className={labelStyle}>From (Start Date):</label>
            <input
              type="date"
              name="from"
              value={form.from}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>To (End Date):</label>
            <input
              type="date"
              name="to"
              value={form.to}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className={labelStyle}>Decorations:</label>
          <textarea
            name="decorations"
            value={form.decorations}
            onChange={handleChange}
            className={`${inputStyle} h-20`}
            placeholder="Describe decoration needs"
          />
        </div>

        <div>
          <label className={labelStyle}>Food / Drinks:</label>
          <textarea
            name="food"
            value={form.food}
            onChange={handleChange}
            className={`${inputStyle} h-20`}
            placeholder="e.g. buffet, coffee breaks"
          />
        </div>

        <div>
          <label className={labelStyle}>Filming / Photos:</label>
          <textarea
            name="photos"
            value={form.photos}
            onChange={handleChange}
            className={`${inputStyle} h-20`}
            placeholder="Any photo or video requirements"
          />
        </div>

        <div>
          <label className={labelStyle}>Music:</label>
          <textarea
            name="music"
            value={form.music}
            onChange={handleChange}
            className={`${inputStyle} h-20`}
            placeholder="Preferred genres or artists"
          />
        </div>

        <div>
          <label className={labelStyle}>Posters / Artwork:</label>
          <textarea
            name="artwork"
            value={form.artwork}
            onChange={handleChange}
            className={`${inputStyle} h-20`}
            placeholder="Specify posters or visuals needed"
          />
        </div>

        <div>
          <label className={labelStyle}>Computer-Related Issues:</label>
          <textarea
            name="computer"
            value={form.computer}
            onChange={handleChange}
            className={`${inputStyle} h-20`}
            placeholder="e.g. projector, materials from client"
          />
        </div>

        <div>
          <label className={labelStyle}>Other Needs:</label>
          <textarea
            name="other"
            value={form.other}
            onChange={handleChange}
            className={`${inputStyle} h-20`}
            placeholder="Any additional notes"
          />
        </div>

        <button
          type="button" 
          onClick={submitForm}
          className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
