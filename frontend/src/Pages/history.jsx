// src/pages/History.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  useTheme,
  Avatar,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function History() {
  const [issuedCredentials, setIssuedCredentials] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const savedCreds =
      JSON.parse(localStorage.getItem("issuedCredentials")) || [];
    setIssuedCredentials(savedCreds);
  }, []);

  return (
    <Box sx={{ mt: 4, px: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        🎓 Previous History
      </Typography>

      {issuedCredentials.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
          📭 No credentials issued yet.
        </Typography>
      ) : (
        <Timeline position="alternate">
          {issuedCredentials.map((cred, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < issuedCredentials.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    mb: 2,
                    bgcolor: theme.palette.background.default,
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 36,
                        height: 36,
                        mr: 2,
                        fontSize: 16,
                      }}
                    >
                      {cred.name?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={500}>
                        {cred.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cred.title} @ {cred.institute}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="body2">
                    <strong>👜 Wallet:</strong> {cred.recipient}
                  </Typography>
                  <Typography variant="body2">
                    <strong>📦 Metadata:</strong> {cred.metadata}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ wordBreak: "break-all", mt: 1 }}
                  >
                    <strong>🔗 Tx Hash:</strong> {cred.txHash}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(cred.timestamp).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </Typography>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </Box>
  );
}
