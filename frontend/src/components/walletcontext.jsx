import { createContext, useContext, useEffect, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (!window.aptos) {
      setError("Petra Wallet not detected. Please install it.");
      return;
    }

    try {
      setIsConnecting(true);
      const response = await window.aptos.connect();
      const accountInfo = await window.aptos.account();
      setAccount(accountInfo.address);
      localStorage.setItem("isWalletConnected", "true");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("User rejected the connection or another error occurred.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await window.aptos.disconnect();
      setAccount(null);
      localStorage.removeItem("isWalletConnected");
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  useEffect(() => {
    const autoConnect = async () => {
      const isWalletPreviouslyConnected = localStorage.getItem("isWalletConnected");

      if (isWalletPreviouslyConnected && window.aptos) {
        try {
          const isConnected = await window.aptos.isConnected();
          if (isConnected) {
            const accountInfo = await window.aptos.account();
            setAccount(accountInfo.address);
          } else {
            await connectWallet();
          }
        } catch (err) {
          console.error("Auto-connect failed:", err);
          setError("Failed to auto-connect wallet.");
        }
      }
    };

    autoConnect();
  }, []);

  useEffect(() => {
    const handleAccountChange = (newAccount) => {
      setAccount(newAccount?.address || null);
    };

    window.aptos?.on("accountChange", handleAccountChange);
    return () => {
      window.aptos?.off("accountChange", handleAccountChange);
    };
  }, []);

  const value = {
    account,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => useContext(WalletContext);
