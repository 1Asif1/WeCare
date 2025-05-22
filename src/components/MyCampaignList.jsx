import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import DonateForm from "./DonateForm";
import WithdrawButton from "./WithdrawButton";
import CampaignDetailsModal from "./CampaignDetailsModal";

const badgeColors = {
  Health: "bg-pink-100 text-pink-700 border-pink-200",
  Education: "bg-blue-100 text-blue-700 border-blue-200",
  Humanitarian: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Housing: "bg-green-100 text-green-700 border-green-200",
};

export default function MyCampaignList({ campaigns, reloadCampaigns, donations, currentAccount }) {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleCardClick = (campaign, index) => {
    setSelectedCampaign({ campaign, index });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {campaigns.map((c, i) => (
        <div
          key={i}
          onClick={() => handleCardClick(c, i)}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 border border-gray-100 group fade-in flex flex-col overflow-hidden cursor-pointer"
          style={{ minWidth: 0 }}
        >
          {/* Image */}
          <div className="w-full aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
            <img
              src={c.image || "https://via.placeholder.com/400x200?text=Campaign"}
              alt={c.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          {/* Content */}
          <div className="flex-1 flex flex-col justify-between p-6">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-2 ${badgeColors[c.category] || "bg-gray-100 text-gray-700 border-gray-200"}`}>{c.category}</span>
              <h3 className="font-bold text-2xl mb-2 text-gray-900 break-words leading-tight line-clamp-2">{c.title}</h3>
              <p className="text-gray-600 text-base mb-3 line-clamp-3 break-words leading-snug">{c.description}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">Owner:</span>
                <span className="font-mono text-xs text-gray-700" title={c.owner}>{c.owner.slice(0, 6)}...{c.owner.slice(-4)}</span>
              </div>
            </div>
            <div className="mt-2">
              <ProgressBar campaign={c} />
            </div>
          </div>
          {/* Actions */}
          <div className="bg-indigo-50/40 px-6 py-4 flex flex-col md:flex-row gap-2 border-t border-indigo-100">
            <WithdrawButton campaignId={i} reloadCampaigns={reloadCampaigns} />
          </div>
        </div>
      ))}

      {selectedCampaign && (
        <CampaignDetailsModal
          isOpen={!!selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          campaign={selectedCampaign.campaign}
          campaignId={selectedCampaign.index}
          donations={donations}
          reloadCampaigns={reloadCampaigns}
          isOwner={true}
        />
      )}

      <style>{`.fade-in { animation: fadeIn 0.7s; } @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; }}`}</style>
    </div>
  );
} 