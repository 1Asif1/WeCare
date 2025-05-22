import React, { useEffect, useState } from "react";

export default function Header({ onCreateCampaign, onViewChange }) {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [noMetaMask, setNoMetaMask] = useState(false);
  const [activeView, setActiveView] = useState('all'); // 'all' or 'my'

  // Connect to MetaMask and get account/chain
  const connectWallet = async () => {
    setConnecting(true);
    setNoMetaMask(false);
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        setChainId(parseInt(chain, 16));
      } else {
        setNoMetaMask(true);
        alert("Please install MetaMask!");
      }
    } catch (err) {
      console.error("MetaMask connection error:", err);
      alert("MetaMask connection failed. See console for details.");
    } finally {
      setConnecting(false);
    }
  };

  // Listen for account or chain changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => setAccount(accounts[0] || ""));
      window.ethereum.on("chainChanged", (chain) => setChainId(parseInt(chain, 16)));
      // Try to get current account/chain on mount
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      });
      window.ethereum.request({ method: "eth_chainId" }).then((chain) => setChainId(parseInt(chain, 16)));
    }
  }, []);

  const handleViewClick = (view) => {
    setActiveView(view);
    if (onViewChange) onViewChange(view);
  };

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 shadow-lg">
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-extrabold text-white drop-shadow-sm">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.15" />
            <path d="M10 22V10h12v12H10zm2-2h8V12h-8v8z" fill="#fff" />
          </svg>
        </span>
        <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-sm">WeCare</span>
      </div>
      <div className="flex items-center space-x-4">
        {/* View Tabs */}
        <div className="flex bg-white/20 rounded-lg p-1">
          <button
            className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${activeView === 'all' ? 'bg-white text-indigo-700 shadow' : 'text-white hover:bg-white/10'}`}
            onClick={() => handleViewClick('all')}
          >
            All Campaigns
          </button>
          <button
            className={`px-4 py-1 rounded-md text-sm font-semibold transition-colors ${activeView === 'my' ? 'bg-white text-indigo-700 shadow' : 'text-white hover:bg-white/10'}`}
            onClick={() => handleViewClick('my')}
          >
            My Campaigns
          </button>
        </div>

        <button
          className="bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={onCreateCampaign}
        >
          + Create Campaign
        </button>
        {account ? (
          <span className="bg-white/20 text-white px-3 py-1 rounded-lg font-mono text-sm shadow border border-white/30 cursor-pointer hover:bg-white/30 transition-all" title={account}>
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : noMetaMask ? (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg font-mono">MetaMask Not Installed</span>
        ) : (
          <button
            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-150 disabled:opacity-50"
            onClick={connectWallet}
            disabled={connecting}
          >
            {connecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
        {chainId && (
          <span className="bg-green-400/20 text-green-900 px-3 py-1 rounded-lg font-mono text-sm shadow border border-green-400/30">
            Chain ID: {chainId}
          </span>
        )}
      </div>
    </header>
  );
} 