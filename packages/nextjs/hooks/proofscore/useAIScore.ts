import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CreditScoreAnalysis, analyzeCreditScore } from "~~/services/openai";
import { WalletData } from "~~/types/wallet";

export function useAIScore(address: string, data: WalletData | null) {
  const [error, setError] = useState<string | null>(null);

  const {
    data: analysis,
    isLoading,
    error: queryError,
  } = useQuery<CreditScoreAnalysis>({
    queryKey: ["ai-score", address],
    queryFn: () => analyzeCreditScore(data!),
    enabled: !!data && !!address,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  useEffect(() => {
    if (queryError) {
      setError(queryError.message || "Failed to analyze score");
    }
  }, [queryError]);

  return {
    analysis,
    isLoading,
    error,
  };
}
