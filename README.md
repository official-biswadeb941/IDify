# 🪪 Idify – Decentralized Identity, Credentials & Reputation Protocol

> **Proof over Promises. Trust without Intermediaries. Welcome to Idify.**

**Idify** is a decentralized application (dApp) and protocol that redefines how resumes, credentials, and reputations are managed, verified, and trusted — all on-chain.

Once a candidate commits a credential (e.g., *"Graduated from IIT Delhi"*), it becomes **immutable**. Whether that claim is **credible** is determined **not by a central authority**, but by **verifiable attestations from HRs, employers, institutions, or community verifiers**.

Idify is your tamper-proof, censorship-resistant **Web3 resume protocol**, where **proof replaces trust**.

---

## ⚙️ Core Features

- 🧾 **Immutable Resume Claims**  
  Users commit educational, professional, or skill-based claims that are **permanently stored** on-chain or IPFS (off-chain hashed).

- 🧠 **On-Chain Verifications**  
  HRs, institutes, DAOs, or trusted entities can attach **verifications** through **attestations**, creating a decentralized trust graph.

- 🔍 **Verifiable Reputation System**  
  Candidates build reputation based on how many **trusted verifiers** confirm their claims. No verification? The claim remains untrusted.

## ⚙️ Upcoming Features

- 🧿 **DID & VC Friendly**  
  Built with support for Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs) to support global interoperability.

- 🪙 **Soulbound Tokens (SBTs)** (optional)  
  Credentials can be minted as **non-transferable tokens**, unique to the user’s identity.

- 🛡️ **ZK Privacy (WIP)**  
  Zero-Knowledge proof integration for **private credential verification** (e.g., “Graduated top 5%” without revealing GPA or school).

---

## 💼 Use Cases

- ✅ **Resume fraud protection** in hiring and recruitment.
- 🌍 **Global credential portability** across borders.
- 📜 **Academic certificate verification** for institutions and edtech.
- 🧑‍💻 **Decentralized freelance & DAO hiring**.
- 🛂 **Credential-based access systems** (e.g., for immigration, onboarding, or scholarships).

---

## 🚀 Quick Start

### 🔗 Prerequisites

- Node.js ≥ 18
- Install rust & cargo
- [Aptos Wallet](https://chromewebstore.google.com/detail/ejjladinnckdgjemekebdpeokbikhfci?utm_source=item-share-cb)
- Testnet/Devnet

### 🛠️ Install & Deploy

```bash
git clone https://github.com/your-org/idify.git
cd idify
npm install
````

#### Deploy Smart Contracts
```bash
aptos move init (Choose Devnet (Default))
aptos move compile
aptos move publish
```

#### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open your browser at: [http://localhost:3000](http://localhost:5173)

---

## 🧱 Architecture

| Layer              | Stack / Tooling                               |
| ------------------ | --------------------------------------------- |
| Smart Contracts    | Aptos & Move                                |
| Identity           | EIP-712, DIDs, Wallet Signatures              |
| Credential Storage | Local Storage (Till now)                        |
| Frontend           | React, plaincss, materialui                  |
| Verification       | Signature & Hashed based Attestations |

---

## 👥 Actors

* **Candidate**: Makes claims about achievements (education, work, skills).
* **Verifier**: HR, employer, university, DAO, or trusted entity that confirms/attests.
* **Employer / Observer**: Consumes verified resume data for decision-making.

---

## 🧭 Reputation Logic

Each attestation adds to a **reputation graph**:

* ✅ More attestations = higher trust weight
* 🧩 Attestation weight varies by verifier's reputation (staking model in roadmap)
* 🕵️‍♀️ Unverified claims are visible but flagged

---

## 🗺️ Roadmap

* [x] Resume claim commits + attestation system (MVP)
* [ ] Verifier staking & reputation weighting
* [ ] Token-gated or DAO-governed verifier onboarding
* [ ] Zero-Knowledge credential proofs
* [ ] Verifiable Credential & DID support (Ceramic/Spruce)
* [ ] NFT badge display + QR code integrations
* [ ] Mobile App (React Native)

---

## 🤝 Contributing

We welcome PRs, feature ideas, and feedback. If you're building in the DID/VC, DAO tooling, or ZK space, let's collaborate.

Please refer to `CONTRIBUTING.md` (coming soon).

---

## 📜 License

MIT License © 2025 Biswadeb Mukherjee


## 📡 Contact

Built with ❤️ by [@YourHandle](https://twitter.com/yourhandle)
For demos, partnerships, or integration, [open an issue](https://github.com/your-org/idify/issues) or drop a line.

---

**Idify – Own Your Identity. Prove Your Worth. On Your Terms.**
