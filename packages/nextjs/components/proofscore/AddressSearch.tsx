import React, { useEffect, useState } from "react";
import { ArrowRight, Loader2, Search } from "lucide-react";

interface AddressSearchProps {
  onSearch: (address: string) => void;
  initialAddress?: string;
}

export default function AddressSearch({ onSearch, initialAddress }: AddressSearchProps) {
  const [address, setAddress] = useState(initialAddress || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialAddress) {
      setAddress(initialAddress);
    }
  }, [initialAddress]);

  const validateAddress = (address: string) => {
    return address.match(/^0x[a-fA-F0-9]{40}$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError("Please enter an Ethereum address");
      return;
    }
    if (!validateAddress(address)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      onSearch(address);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-8 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="address" className="text-lg font-medium text-gray-300">
            {initialAddress ? "Connected Address" : "Enter an Ethereum Address to Begin"}
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              id="address"
              placeholder="0x..."
              value={address}
              onChange={e => {
                setAddress(e.target.value);
                setError("");
              }}
              className="input-primary pl-12"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary py-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Analyze
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-400 flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-red-400 mr-2"></span>
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
