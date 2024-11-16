import React from "react";
import { ArrowLeftRight, Network, Shield, X } from "lucide-react";
import { NETWORKS } from "~~/utils/networks";

interface ReportSidebarProps {
  address: string;
  isOpen: boolean;
  onClose: () => void;
  activeChain: keyof typeof NETWORKS;
  onChainChange: (chain: keyof typeof NETWORKS) => void;
}

export default function ReportSidebar({ address, isOpen, onClose, activeChain, onChainChange }: ReportSidebarProps) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
      <div
        className={`
        fixed top-0 right-0 h-full w-80 bg-gray-900/95 border-l border-gray-800
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0 lg:static lg:w-72
      `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-indigo-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-100">Chain Report</h2>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center mb-3">
              <Network className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-400">Networks</span>
            </div>
            {(Object.keys(NETWORKS) as Array<keyof typeof NETWORKS>).map(chainKey => {
              const network = NETWORKS[chainKey];
              const isActive = chainKey === activeChain;
              return (
                <button
                  key={chainKey}
                  onClick={() => onChainChange(chainKey)}
                  className={`
                    w-full flex items-center p-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r " + network.color + " bg-opacity-10 border border-gray-700"
                        : "hover:bg-gray-800/50"
                    }
                  `}
                >
                  <img src={network.icon} alt={network.name} className="h-6 w-6 mr-3" />
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${isActive ? "text-gray-100" : "text-gray-400"}`}>{network.name}</p>
                  </div>
                  {isActive && <div className="h-2 w-2 rounded-full bg-indigo-400" />}
                </button>
              );
            })}
          </div>
          <div className="mt-8">
            <div className="flex items-center mb-3">
              <ArrowLeftRight className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-400">Quick Links</span>
            </div>
            <div className="space-y-2">
              <a
                href={`${NETWORKS[activeChain].explorer}/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-gray-300">View in Explorer</span>
                <ArrowLeftRight className="h-4 w-4 text-gray-400 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
