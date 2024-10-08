// Navbar.tsx
"use client";

import React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useNetwork } from "../../wallet/WalletContextProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
const Navbar = () => {
  const { network, setNetwork } = useNetwork();

  const toggleNetwork = () => {
    setNetwork((prevNetwork) =>
      prevNetwork === WalletAdapterNetwork.Devnet
        ? WalletAdapterNetwork.Mainnet
        : WalletAdapterNetwork.Devnet
    );
  };

  return (
    <nav className="p-4">
      <section className="flex p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-[#03E1FF] font-bold mb-4 sm:mb-0 h-100 w-40 cursor-pointer">
            <img src="/images/Asset 15Asset .png" alt="logo" />
          </div>
          <div className="flex items-center ">
            <button
              onClick={toggleNetwork}
              className="mr-4 p-3 rounded text-white text-l font-bold bg-[#b63efc] hover:bg-[#d187fd] transition-all duration-200"
            >
              Switch to{" "}
              {network === WalletAdapterNetwork.Devnet ? "Mainnet" : "Devnet"}
            </button>
            <div className="border hover:border-slate-900 rounded">
              <WalletMultiButton className="!bg-[#2d0355] hover:!bg-black transition-all duration-200 !rounded-lg  " />
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
