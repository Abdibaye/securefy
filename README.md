# 🚨 SecureFy — Digital Identity Verification for Ethiopia

SecureFy is a lightweight, privacy-focused digital identity verification solution tailored for the Ethiopian market. It empowers businesses to securely verify customer identities using national ID documents, facial recognition, and real-time validation workflows.

> 👷‍♂️ Built in 7 days during the Fayda Hackathon Addis Ababa 2025
> 🔐 Designed to boost digital trust for local startups, enterprises, and institutions

---

## 🌍 Why SecureFy?

Ethiopian businesses need a local, affordable, and reliable digital identity system. Most existing solutions are either not available for Ethiopia or don’t reflect the unique challenges of verifying local identities.

SecureFy solves this by:

* ✅ Supporting national ID cards, passports, driving licenses, and residence permits
* 🤖 Using AI-powered document analysis and face matching
* 🧩 Offering easy-to-integrate APIs for local platforms
* 🔒 Ensuring user data stays private and compliant with local standards

---

## 🔧 Features

* 📸 Upload or scan ID documents for quick verification
* 🧠 Auto OCR + document parsing (Amharic & English supported)
* 🪞 Liveness detection using selfie or short video
* 🔄 Face match between selfie and ID photo
* 📊 Admin dashboard for verification status
* 📩 Email/Webhook notifications when verification is complete
* 📱 Built for mobile-first, real-world usage

---

## 🧪 Tech Stack

| Layer        | Tech                                      |
| ------------ | ----------------------------------------- |
| Frontend     | Next.js, Tailwind CSS, ShadCN UI          |
| Backend      | Node.js (Express), Prisma ORM             |
| Auth         | BetterAuth                                |
| DB           | Neon (PostgreSQL)                         |
| File Uploads | Amazon S3 (pre-signed URLs)               |
| AI Services  | Google Vision API (or local OCR fallback) |
| ID Lookup	   | Fayda API                                 | 
| Deployment   | Vercel (frontend), Render (backend)       |

---

## 📦 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/securefy.git && cd securefy

# 2. Install dependencies
pnpm install

# 3. Add env variables
cp .env.example .env.local
# Add Supabase / BetterAuth / DB / S3 creds

# 4. Run the dev server
pnpm dev
```

---

## 🧑‍💻 Team

Built by

Abdi Bayisa,
Abdi Gashahun,
Sagni Tsega,

---

## 📄 License

MIT License — open for collaboration and use in projects that support Ethiopia's digital ecosystem.


