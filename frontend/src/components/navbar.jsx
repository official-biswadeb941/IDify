import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [aptosAccount, setAptosAccount] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const connectAptosWallet = async () => {
    if (!window.aptos) {
      alert("Please install Petra Wallet from https://petra.app/");
      return;
    }

    try {
      const response = await window.aptos.connect();
      const account = await window.aptos.account();
      setAptosAccount(account);
      console.log("Connected Aptos account:", account);
    } catch (err) {
      console.error("Aptos wallet connection failed:", err);
    }
  };

  const disconnectWallet = async () => {
    if (window.aptos && window.aptos.disconnect) {
      try {
        await window.aptos.disconnect();
        setAptosAccount(null);
      } catch (err) {
        console.error("Failed to disconnect Aptos wallet:", err);
      }
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.aptos && window.aptos.isConnected) {
        try {
          const account = await window.aptos.account();
          setAptosAccount(account);
        } catch (e) {
          console.error("Error getting Aptos account:", e);
        }
      }
    };
    checkConnection();
  }, []);

  // Handle wallet connection from Link click
  const handleWalletLinkClick = async (e) => {
    e.preventDefault(); // prevent default navigation
    if (aptosAccount) {
      disconnectWallet();
    } else {
      await connectAptosWallet();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">IDify</Link>
      </div>

      <div className={`navbar-links ${open ? 'active' : ''}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/issue" onClick={() => setOpen(false)}>Issue</Link>
        <Link to="/history" onClick={() => setOpen(false)}>History</Link>

        {/* Connect Wallet via Link */}
        <Link 
          to="#"
          onClick={(e) => {
            handleWalletLinkClick(e);
            setOpen(false);
          }}
        >
          {aptosAccount 
            ? `${aptosAccount.address.slice(0, 6)}...${aptosAccount.address.slice(-4)}`
            : "Connect Wallet"}
        </Link>
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
