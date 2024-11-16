export interface WalletMetrics {
  balance: number;
  transactionCount: number;
  uniqueContacts: number;
  uniqueTokenCount: number;
  accountAge: string;
  totalValue: number;
  avgTransactionValue: number;
  gasUsed: number;
}

export interface ChainData {
  raw: any;
  metrics: WalletMetrics;
}

export interface WalletData {
  sepolia: ChainData;
  baseSepolia: ChainData;
  combinedMetrics: WalletMetrics;
}
