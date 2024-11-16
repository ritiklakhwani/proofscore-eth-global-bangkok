import React from "react";
import { Coins } from "lucide-react";
import { formatValue } from "~~/lib/format";

interface TokenListProps {
  tokens: Array<{
    tokenSymbol: string;
    tokenName: string;
    value: string;
  }>;
  explorerUrl: string;
}

export default function TokenList({ tokens, explorerUrl }: TokenListProps) {
  console.log("explorerUrl", explorerUrl);
  const uniqueTokens = tokens.reduce((acc, token) => {
    if (!acc[token.tokenSymbol]) {
      acc[token.tokenSymbol] = {
        symbol: token.tokenSymbol,
        name: token.tokenName,
        totalValue: 0,
      };
    }
    acc[token.tokenSymbol].totalValue += parseFloat(token.value);
    return acc;
  }, {} as Record<string, { symbol: string; name: string; totalValue: number }>);

  return (
    <div className="card p-6">
      <div className="flex items-center mb-4">
        <Coins className="h-5 w-5 text-purple-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-200">Token Activity</h3>
      </div>
      <div className="space-y-3">
        {Object.values(uniqueTokens).map((token, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <div>
              <p className="text-gray-200 font-medium">{token.symbol}</p>
              <p className="text-sm text-gray-400">{token.name}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-200">{formatValue(token.totalValue)}</p>
              <p className="text-xs text-gray-500">Total Volume</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
