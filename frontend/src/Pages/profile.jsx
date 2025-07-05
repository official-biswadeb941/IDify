// src/Pages/profile.jsx
import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import ProfileCard from "../components/profilecard";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com"; // Use devnet or your custom node
const MODULE_ADDRESS = "<YOUR_MODULE_ADDRESS>"; // e.g., "0x123abc..."
const MODULE_NAME = "resume_registry"; // whatever your Move package is called
const RESOURCE_TYPE = `${MODULE_ADDRESS}::${MODULE_NAME}::Resume`;

export default function Profile() {
  const { account, connected } = useWallet();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const aptosClient = new AptosClient(NODE_URL);

  useEffect(() => {
    if (!connected || !account) return;

    const fetchResume = async () => {
      try {
        const resources = await aptosClient.getAccountResources(account.address);
        const resumeRes = resources.find(
          (r) => r.type === RESOURCE_TYPE
        );

        if (!resumeRes) {
          console.warn("Resume not found for this account.");
          setCredentials([]);
        } else {
          const creds = resumeRes.data.credentials.map((cred) => ({
            title: cred.title,
            issuer: cred.issuer,
            metadata_uri: cred.metadata_uri,
            timestamp: Number(cred.timestamp),
          }));
          setCredentials(creds);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
        setCredentials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [account, connected]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Resume</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ProfileCard credentials={credentials} />
      )}
    </div>
  );
}
