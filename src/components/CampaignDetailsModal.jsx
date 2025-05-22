import React from "react";
import ProgressBar from "./ProgressBar";
import DonateForm from "./DonateForm";

const badgeColors = {
  Health: "bg-pink-100 text-pink-700 border-pink-200",
  Education: "bg-blue-100 text-blue-700 border-blue-200",
  Humanitarian: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Housing: "bg-green-100 text-green-700 border-green-200",
};

export default function CampaignDetailsModal({ isOpen, onClose, campaign, donations, campaignId, reloadCampaigns }) {
  if (!isOpen) return null;

  const campaignDonations = donations.filter(d => d.campaignId === campaignId.toString());

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-3 py-2 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Campaign Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Campaign Image */}
          <div className="w-full aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden mb-3">
            <img
              src={campaign.image || "https://via.placeholder.com/800x400?text=Campaign"}
              alt={campaign.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Campaign Info */}
          <div className="space-y-3">
            <div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border mb-1.5 ${badgeColors[campaign.category] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                {campaign.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-1.5">{campaign.title}</h3>
              <p className="text-gray-600 text-sm whitespace-pre-wrap">{campaign.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs text-gray-500">Owner:</span>
                <span className="font-mono text-xs text-gray-700" title={campaign.owner}>
                  {campaign.owner.slice(0, 6)}...{campaign.owner.slice(-4)}
                </span>
              </div>
              <ProgressBar campaign={campaign} />
            </div>

            {/* Donation Form */}
            <div className="bg-indigo-50/40 rounded-lg p-2 border border-indigo-100">
              <DonateForm campaignId={campaignId} reloadCampaigns={reloadCampaigns} />
            </div>

            {/* Donation History */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Donation History</h4>
              {campaignDonations.length === 0 ? (
                <p className="text-gray-500 text-center py-2 text-xs">No donations yet. Be the first to contribute!</p>
              ) : (
                <div className="space-y-1.5">
                  {campaignDonations.map((donation, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 text-xs font-semibold">{donation.address.slice(2, 4)}</span>
                        </div>
                        <div>
                          <p className="font-mono text-xs text-gray-700" title={donation.address}>
                            {donation.address.slice(0, 6)}...{donation.address.slice(-4)}
                          </p>
                          <p className="text-xs text-gray-500">{donation.time}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600 text-xs">{donation.amount} ETH</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 