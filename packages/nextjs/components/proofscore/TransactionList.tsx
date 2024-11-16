import React from "react";
import TransactionItem from "./TransactionItem";
import { ArrowRightLeft } from "lucide-react";

interface TransactionListProps {
  transactions: any[];
  address: string;
  explorerUrl: string;
}

export default function TransactionList({ transactions, address, explorerUrl }: TransactionListProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center mb-4">
        <ArrowRightLeft className="h-5 w-5 text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-200">Recent Transactions</h3>
      </div>
      <div className="space-y-3">
        {transactions.slice(0, 10).map((tx: any) => (
          <TransactionItem key={tx.hash} tx={tx} userAddress={address} explorerUrl={explorerUrl} />
        ))}
      </div>
    </div>
  );
}
