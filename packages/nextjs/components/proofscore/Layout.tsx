import React from "react";
import { useState } from "react";
import { Github, Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Documentation", href: "#" },
    { name: "API", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-[#030014]">
      <nav className="glass-effect border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">PS</span>
                </div>
                <span className="text-xl font-bold gradient-text">ProofScore</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </nav>
      <main>{children}</main>
      <footer className="glass-effect border-t border-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>© {new Date().getFullYear()} Ritik. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
