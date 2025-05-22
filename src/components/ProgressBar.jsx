import React from "react";

export default function ProgressBar({ campaign }) {
  // Defensive: handle undefined/null campaign
  if (!campaign) return null;
  // Convert wei to ETH safely
  const toEth = (wei) => {
    if (!wei) return 0;
    try {
      return Number(wei) / 1e18;
    } catch {
      return 0;
    }
  };
  const raised = toEth(campaign.raised);
  const goal = toEth(campaign.goal);
  const percent = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  // Color transition: green (0-50%), yellow (50-80%), purple (80-100%)
  let barColor = "from-green-400 to-green-500";
  if (percent > 80) barColor = "from-purple-500 to-indigo-500";
  else if (percent > 50) barColor = "from-yellow-400 to-yellow-500";

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-700">Progress</span>
        <span className="font-semibold text-gray-700">{percent.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
        <div
          className={`h-4 rounded-full bg-gradient-to-r ${barColor} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex flex-wrap justify-between text-base font-bold mb-2">
        <div>
          <div className="text-xs font-normal text-gray-500">Total Raised</div>
          <div>{raised} ETH</div>
        </div>
        <div>
          <div className="text-xs font-normal text-gray-500">Goal</div>
          <div>{goal} ETH</div>
        </div>
      </div>
    </div>
  );
}
