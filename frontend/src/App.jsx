// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Issue from "./Pages/Issue";
import Profile from "./Pages/profile";
import History from "./Pages/history";
import Navbar from "./components/navbar";
import { useWallet } from "./components/walletcontext";

function App() {
  const {
    account,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const walletProps = {
    account,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar {...walletProps} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home {...walletProps} />} />
            <Route path="/issue" element={<Issue {...walletProps} />} />
            <Route path="/history" element={<History {...walletProps} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
