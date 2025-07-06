import { useWallet } from "./walletcontext";
import CredentialForm from "./credentialform";

export default function WalletConnect() {
  const {
    account,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  return (
    <div className="p-4 border rounded-xl shadow-md w-fit">
      <div>


        {account ? (
          <div>
            <p className="text-sm break-all">Connected as: <strong>{account}</strong></p>
            <button
              onClick={disconnectWallet}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect Petra Wallet"}
          </button>
        )}
        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      </div>
      <div>
      </div>
    </div>
  );
}
