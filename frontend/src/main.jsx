// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// 🧩 Wallet Providers
import { WalletProvider as CustomWalletProvider } from "./components/walletcontext.jsx";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

// 👛 Register compatible wallets (can add more later)
const wallets = [new PetraWallet()];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true} // ✅ Enables persistent wallet connection
    >
      <CustomWalletProvider> {/* ✅ Your custom UI context */}
        <App />
      </CustomWalletProvider>
    </AptosWalletAdapterProvider>
  </StrictMode>
);
