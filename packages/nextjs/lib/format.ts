import { formatDistanceToNow } from "date-fns";

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(parseInt(timestamp) * 1000);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatValue(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(2)}K`;
  return value.toFixed(2);
}

export function getTransactionType(
  tx: any,
  userAddress: string,
): {
  type: "sent" | "received" | "contract";
  label: string;
  color: string;
} {
  const from = tx.from.toLowerCase();
  const to = tx.to?.toLowerCase();
  const user = userAddress.toLowerCase();

  if (from === user && to === user) {
    return {
      type: "contract",
      label: "Self",
      color: "bg-purple-500/20 text-purple-400",
    };
  }
  if (from === user) {
    return {
      type: "sent",
      label: "Sent",
      color: "bg-red-500/20 text-red-400",
    };
  }
  return {
    type: "received",
    label: "Received",
    color: "bg-green-500/20 text-green-400",
  };
}
