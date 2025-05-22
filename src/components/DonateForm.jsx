import React, { useState } from "react";
import { getContract } from "../web3";

export default function DonateForm({ campaignId, reloadCampaigns }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const quickAmounts = ["0.01", "0.05", "0.1", "0.5"];

  const handleDonate = async () => {
    setLoading(true);
    try {
      const { web3, contract } = await getContract();
      const accounts = await web3.eth.getAccounts();
      await contract.methods.donate(campaignId).send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
      });
      alert("Donation successful!");
      setAmount("");
      if (reloadCampaigns) await reloadCampaigns();
    } catch (err) {
      console.error("Donation failed:", err);
      alert("Donation failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50/40 rounded-xl p-4 shadow-inner mb-2">
      <div className="mb-4 relative">
        <input
          type="number"
          min="0"
          step="any"
          placeholder="0.00"
          className="border border-indigo-200 rounded-lg px-4 py-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
        />
        <span className="absolute right-6 top-3 text-gray-400 font-semibold">ETH</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-indigo-200 transition-all"
            onClick={() => setAmount(amt)}
            disabled={loading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3" /></svg>
            {amt} ETH
          </button>
        ))}
      </div>
      <button
        onClick={handleDonate}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg text-lg mb-2 shadow-lg transition-all disabled:opacity-50"
        disabled={loading || !amount}
      >
        {loading ? "Processing..." : "Donate Now"}
      </button>
      <p className="text-xs text-gray-500 text-center mt-2">
        All donations are processed on the Ethereum blockchain and are subject to network fees.
      </p>
    </div>
  );
}
