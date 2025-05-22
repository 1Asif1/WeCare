import React, { useState } from "react";

const categories = ["Health", "Education", "Humanitarian", "Housing"];

export default function CreateCampaignModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCreate({ title, description, category, image, goal });
      setTitle(""); setDescription(""); setCategory(categories[0]); setImage(""); setGoal("");
      onClose();
    } catch (err) {
      console.error("Create campaign failed:", err);
      alert("Create campaign failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose} disabled={loading}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">Create Campaign</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required disabled={loading} />
          <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required disabled={loading} />
          <select className="w-full border rounded-lg px-3 py-2" value={category} onChange={e => setCategory(e.target.value)} disabled={loading}>
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required disabled={loading} />
          <input className="w-full border rounded-lg px-3 py-2" type="number" min="0" step="any" placeholder="Goal (ETH)" value={goal} onChange={e => setGoal(e.target.value)} required disabled={loading} />
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold disabled:opacity-50" disabled={loading}>{loading ? "Creating..." : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
} 