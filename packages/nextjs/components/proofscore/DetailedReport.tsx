import React from "react";
import AIScoreAnalysis from "./AIScoreAnalysis";
import ChainSection from "./ChainSection";
import { useAIScore } from "~~/hooks/proofscore/useAIScore";
import { NETWORKS } from "~~/utils/networks";

interface DetailedReportProps {
  address: string;
  data: {
    sepolia: {
      raw: any;
      metrics: any;
    };
    baseSepolia: {
      raw: any;
      metrics: any;
    };
  };
}

export default function DetailedReport({ address, data }: DetailedReportProps) {
  console.log("params", address, data);
  const { analysis, isLoading: isAILoading, error: aiError } = useAIScore(address, data);

  return (
    <div className="space-y-8">
      {analysis && <AIScoreAnalysis analysis={analysis as any} />}

      {isAILoading && (
        <div className="card p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Analyzing on-chain data with AI...</p>
        </div>
      )}

      {aiError && <div className="card p-6 text-center text-red-400">Error analyzing score: {aiError}</div>}
      <div className="space-y-6">
        {Object.entries(NETWORKS).map(([key, network]) => (
          <ChainSection
            key={key}
            network={network}
            address={address}
            data={key === "SEPOLIA" ? data.sepolia : key === "BASE_SEPOLIA" ? data.baseSepolia : undefined}
          />
        ))}
      </div>
    </div>
  );
}
