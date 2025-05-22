import React from "react";

function makeBlockie(address) {
  // Simple blockie placeholder (replace with real blockie lib for production)
  const color = address ? `#${address.slice(2, 8)}` : "#ccc";
  return <span style={{ background: color }} className="inline-block w-8 h-8 rounded-full mr-3 border-2 border-white shadow" />;
}

export default function RecentDonations({ donations }) {
  if (!donations || !donations.length) {
    return <div className="bg-white rounded-xl shadow p-6 text-gray-500 text-center">No donations yet. Be the first to contribute!</div>;
  }
  return (
    <div className="bg-white rounded-xl shadow divide-y">
      {donations.map((d, i) => (
        <div key={i} className="flex items-center px-6 py-4 hover:bg-indigo-50 transition-all group">
          {makeBlockie(d.address)}
          <div className="flex-1">
            <span className="font-mono text-xs text-gray-700 group-hover:text-indigo-700 transition-all" title={d.address}>{d.address.slice(0, 6)}...{d.address.slice(-4)}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="font-semibold text-indigo-600">{d.amount} ETH</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-xs text-gray-400">{d.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 