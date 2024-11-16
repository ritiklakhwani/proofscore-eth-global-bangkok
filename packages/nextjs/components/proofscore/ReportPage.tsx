import React, { useState } from "react";
import DetailedReport from "./DetailedReport";
import ReportSidebar from "./ReportSidebar";
import { useParams } from "react-router-dom";
import { useWalletData } from "~~/hooks/proofscore/useWalletData";
import { NETWORKS } from "~~/utils/networks";

export default function ReportPage() {
  const { address } = useParams<{ address: string }>();
  const [activeChain, setActiveChain] = useState<keyof typeof NETWORKS>("SEPOLIA");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading, error } = useWalletData(address || "");

  if (!address) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">No address provided</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading report data...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <ReportSidebar
        address={address}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeChain={activeChain as string}
        onChainChange={setActiveChain}
      />
      <div className="flex-1 p-8">
        <DetailedReport address={address} data={data} activeChain={activeChain} />
      </div>
    </div>
  );
}
