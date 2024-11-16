import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function useWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setIsLoading(false);
    }
  }, [isConnected]);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      const connector = connectors[0];
      if (connector) {
        await connectAsync({ connector });
      }
    } catch (error) {
      console.error("Connection error:", error);
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error("Disconnection error:", error);
    }
  };

  return {
    address,
    isConnected,
    isLoading,
    chain,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
}
