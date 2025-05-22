import React, { useState } from "react";
import { getContract } from "../web3";

export default function WithdrawButton({ campaignId, reloadCampaigns }) {
  const [loading, setLoading] = useState(false);
  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const { contract, web3 } = await getContract();
      const accounts = await web3.eth.getAccounts();
      await contract.methods.withdraw(campaignId).send({ from: accounts[0] });
      alert("Funds withdrawn!");
      if (reloadCampaigns) await reloadCampaigns();
    } catch (err) {
      console.error("Withdraw failed:", err);
      alert("Withdraw failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleWithdraw} className="bg-red-600 text-white px-4 py-2 rounded mt-4 disabled:opacity-50" disabled={loading}>
      {loading ? "Withdrawing..." : "Withdraw (Owner Only)"}
    </button>
  );
}
