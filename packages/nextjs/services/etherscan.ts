import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { BASE_SCAN_API_KEY, ETHERSCAN_API_KEY, ETHERSCAN_API_URL } from "~~/utils/etherscan";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  isError: string;
  gasUsed: string;
}

interface TokenTransfer {
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  timeStamp: string;
}

export async function getWalletData(address: string, chain: "SEPOLIA" | "BASE_SEPOLIA") {
  const apiKey = chain === "SEPOLIA" ? ETHERSCAN_API_KEY : BASE_SCAN_API_KEY;
  const apiUrl = ETHERSCAN_API_URL[chain];

  try {
    // get ETH balance
    const balanceResponse = await axios.get(apiUrl, {
      params: {
        module: "account",
        action: "balance",
        address,
        tag: "latest",
        apikey: apiKey,
      },
    });

    // get normal transactions
    const txResponse = await axios.get(apiUrl, {
      params: {
        module: "account",
        action: "txlist",
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 100,
        sort: "desc",
        apikey: apiKey,
      },
    });

    // get ERC20 token transfers
    const tokenTxResponse = await axios.get(apiUrl, {
      params: {
        module: "account",
        action: "tokentx",
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 100,
        sort: "desc",
        apikey: apiKey,
      },
    });

    return {
      balance: balanceResponse.data.result,
      transactions: txResponse.data.result || [],
      tokenTransfers: tokenTxResponse.data.result || [],
    };
  } catch (error) {
    console.error(`Error fetching ${chain} data:`, error);
    return {
      balance: "0",
      transactions: [],
      tokenTransfers: [],
    };
  }
}

export function calculateWalletMetrics(data: {
  balance: string;
  transactions: Transaction[];
  tokenTransfers: TokenTransfer[];
}) {
  const { balance, transactions, tokenTransfers } = data;

  // calculate transaction metrics
  const successfulTxs = transactions.filter(tx => tx.isError === "0");
  const uniqueAddresses = new Set([...transactions.map(tx => tx.to), ...tokenTransfers.map(tx => tx.to)]);

  // calculate token metrics
  const uniqueTokens = new Set(tokenTransfers.map(tx => tx.tokenSymbol));

  // calculate time-based metrics
  const oldestTx = [...transactions, ...tokenTransfers].sort(
    (a, b) => parseInt(a.timeStamp) - parseInt(b.timeStamp),
  )[0];

  const accountAge = oldestTx ? formatDistanceToNow(new Date(parseInt(oldestTx.timeStamp) * 1000)) : "Unknown";

  // calculate value metrics
  const totalValue = successfulTxs.reduce((sum, tx) => sum + parseFloat(tx.value) / 1e18, 0);
  const avgTxValue = successfulTxs.length > 0 ? totalValue / successfulTxs.length : 0;

  return {
    balance: parseFloat(balance) / 1e18,
    transactionCount: successfulTxs.length,
    uniqueContacts: uniqueAddresses.size,
    uniqueTokenCount: uniqueTokens.size,
    accountAge,
    totalValue,
    avgTransactionValue: avgTxValue,
    gasUsed: successfulTxs.reduce((sum, tx) => sum + parseInt(tx.gasUsed), 0),
  };
}
