import { useState } from "react";
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
import { useWallet } from "../components/walletcontext";

const MODULE_ADDRESS = "0xfd9a0dabf918baa54ffac27d2c545ce26b5e552f7acc0571b600eb98bc1fc647";
const MODULE_NAME = "registry";

const encodeVector = (str) => Array.from(new TextEncoder().encode(str));

export default function CredentialForm() {
  const { account } = useWallet();

  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [metadata, setMetadata] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const initAccount = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
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
    } catch (err) {
      console.error("❌ Failed to init account:", err);
      setStatus("❌ Failed to initialize: " + (err.message || JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!recipient || !title) {
      alert("Recipient and title are required.");
      return;
    }

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
              label="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
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
              label="Credential Description (Metadata)"
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? "Issuing..." : "Issue Credential"}
            </Button>
          </Grid>
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
        </Grid>
      </Box>

      {status && (
        <Box mt={3}>
          <Alert severity={status.startsWith("✅") ? "success" : status.startsWith("❌") ? "error" : "info"}>
            {status}
          </Alert>
        </Box>
      )}
    </Paper>
  );
}
