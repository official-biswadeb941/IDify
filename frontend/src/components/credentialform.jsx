import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const MODULE_ADDRESS = "0xfd9a0dabf918baa54ffac27d2c545ce26b5e552f7acc0571b600eb98bc1fc647";
const MODULE_NAME = "registry";
const RESOURCE_NAME = "Resume";

const encodeVector = (str) => Array.from(new TextEncoder().encode(str));

export default function CredentialForm() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [institute, setInstitute] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [issuedCredentials, setIssuedCredentials] = useState([]);
  const [resumeInitialized, setResumeInitialized] = useState(false);

  const isFormComplete = recipient && name && title && institute;

  useEffect(() => {
    const fetchWallet = async () => {
      if (window.aptos) {
        try {
          const acc = await window.aptos.account();
          setWalletAddress(acc.address);
        } catch (err) {
          console.warn("Wallet not connected:", err);
        }
      }
    };

    fetchWallet();
  }, []);

  useEffect(() => {
    const savedCreds = JSON.parse(localStorage.getItem("issuedCredentials")) || [];
    setIssuedCredentials(savedCreds);
  }, []);

  const checkIfAccountInitialized = async (addr) => {
    try {
      const resourceUrl = `https://fullnode.mainnet.aptoslabs.com/v1/accounts/${addr}/resource/${MODULE_ADDRESS}::${MODULE_NAME}::${RESOURCE_NAME}`;
      const response = await fetch(resourceUrl);
      if (response.status === 404) return false;
      const data = await response.json();
      return !!data;
    } catch (error) {
      console.error("⚠️ Error checking resume status:", error);
      return false;
    }
  };

  useEffect(() => {
    const checkResumeStatus = async () => {
      if (!walletAddress) return;

      setLoading(true);
      setStatus("🔍 Checking resume status...");

      const initialized = await checkIfAccountInitialized(walletAddress);

      if (!initialized) {
        setStatus("🛠️ Resume not initialized.");
        setResumeInitialized(false);
      } else {
        setStatus("✅ Resume already initialized.");
        setResumeInitialized(true);
      }

      setLoading(false);
    };

    checkResumeStatus();
  }, [walletAddress]);

  const initAccount = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    // Defensive check
    const alreadyInitialized = await checkIfAccountInitialized(walletAddress);
    if (alreadyInitialized) {
      setStatus("✅ Resume already initialized.");
      setResumeInitialized(true);
      return;
    }

    setLoading(true);
    setStatus("🛠️ Initializing resume...");

    try {
      const tx = await window.aptos.signAndSubmitTransaction({
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::init_account`,
        type_arguments: [],
        arguments: [],
      });

      setStatus(`✅ Resume initialized. Tx Hash: ${tx.hash}`);
      setResumeInitialized(true);
    } catch (err) {
      console.error("❌ Failed to initialize:", err);
      setStatus("❌ Failed to initialize: " + (err.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!isFormComplete) {
      alert("Please fill in all fields.");
      return;
    }

    const timestamp = new Date().toISOString();
    const metadataObj = { name, title, institute, timestamp };
    const metadata = JSON.stringify(metadataObj);

    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::issue_credential`,
      type_arguments: [],
      arguments: [
        recipient,
        encodeVector(title),
        encodeVector(metadata),
        encodeVector(""),
      ],
    };

    try {
      setLoading(true);
      setStatus("📤 Signing and submitting transaction...");

      const tx = await window.aptos.signAndSubmitTransaction(payload);
      setStatus(`✅ Credential issued! Tx Hash: ${tx.hash}`);

      const newCredential = {
        recipient,
        name,
        title,
        institute,
        metadata,
        txHash: tx.hash,
        timestamp,
      };

      const updatedCreds = [newCredential, ...issuedCredentials];
      setIssuedCredentials(updatedCreds);
      localStorage.setItem("issuedCredentials", JSON.stringify(updatedCreds));

      setRecipient("");
      setName("");
      setTitle("");
      setInstitute("");
    } catch (err) {
      console.error("❌ Transaction failed:", err);
      setStatus("❌ Transaction failed: " + (err.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={4} sx={{ padding: 4, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Issue a New Credential
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Recipient Wallet Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Recipient Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Credential Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="College / Institute Name"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={loading || !isFormComplete || !resumeInitialized}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? "Issuing..." : "Issue Credential"}
            </Button>
          </Grid>

          {!resumeInitialized && (
            <Grid item xs={12} sm={6}>
              <Button
                onClick={initAccount}
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                {loading ? "Processing..." : "Initialize Resume"}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      {status && (
        <Box mt={3}>
          <Alert
            severity={
              status.startsWith("✅") ? "success" :
              status.startsWith("❌") ? "error" :
              "info"
            }
          >
            {status}
          </Alert>
        </Box>
      )}

      {issuedCredentials.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Previously Issued Credentials</Typography>
          {issuedCredentials.map((cred, index) => (
            <Paper key={index} sx={{ mt: 2, p: 2 }}>
              <Typography><strong>Recipient Wallet:</strong> {cred.recipient}</Typography>
              <Typography><strong>Recipient Name:</strong> {cred.name}</Typography>
              <Typography><strong>Title:</strong> {cred.title}</Typography>
              <Typography><strong>Institute:</strong> {cred.institute}</Typography>
              <Typography><strong>Metadata:</strong> {cred.metadata}</Typography>
              <Typography><strong>Tx Hash:</strong> {cred.txHash}</Typography>
              <Typography variant="caption"><strong>Issued At:</strong> {new Date(cred.timestamp).toLocaleString()}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  );
}
