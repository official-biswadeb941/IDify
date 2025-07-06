import React, { useEffect, useState } from "react";
import ProfileCard from "../components/profilecard";
import { fetchAptosCredentials } from "../components/aptos";

export default function ProfilePage() {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    async function init() {
      if (window.aptos) {
        try {
          const res = await window.aptos.connect();
          const address = res.address;

          const creds = await fetchAptosCredentials(address);
          setCredentials(creds);
        } catch (err) {
          console.error("Wallet connection or fetch failed:", err);
        }
      } else {
        alert("Install an Aptos wallet (e.g., Martian, Petra)");
      }
    }

    init();
  }, []);

  return (
    <div className="p-8">
      <ProfileCard credentials={credentials} />
    </div>
  );
}

