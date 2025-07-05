```
START
  |
  ├── 1. Set Up Dev Environment
  |     ├── Install Aptos CLI
  |     ├── Set up local Move project
  |     └── Install React + Aptos Wallet Adapter
  |
  ├── 2. Design Data Model
  |     ├── Define Credential struct (issuer, recipient, title, metadata_uri)
  |     └── Define Resume struct (list of credentials)
  |
  ├── 3. Write & Deploy Move Smart Contract
  |     ├── Write Registry.move
  |     ├── Implement init_account(), issue_credential()
  |     └── Deploy to Devnet using Aptos CLI
  |
  ├── 4. Build React Frontend
  |     ├── Wallet Connect (Petra, Martian)
  |     ├── Profile Page (fetch & display resume)
  |     ├── Issue Page (input form → send txn)
  |     └── Resume Viewer (verify others' credentials)
  |
  ├── 5. (Optional) Integrate IPFS for Metadata
  |     ├── Use Web3.Storage or Pinata
  |     └── Store metadata_uri in the credential
  |
  ├── 6. Test Workflow
  |     ├── Connect as employer wallet
  |     ├── Issue credential to user
  |     └── View resume of user
  |
  ├── 7. UI/UX Polish (Hackathon Polish)
  |     ├── Add timestamps, tooltips
  |     ├── Visual timeline of credentials
  |     └── Dark mode / Tailwind theming
  |
  ├── 8. Prepare Demo
  |     ├── Record a demo video (optional)
  |     ├── 2-minute pitch deck or script
  |     └── Highlight: Web3-native Resume + trustless attestation
  |
  └── ✅ SUBMIT TO HACKATHON
```