# 🌸 Desi Dutch (Jaipur Havelis × Amsterdam Canals)

> **Where the Pink City of Jaipur meets the historic canals of Amsterdam.**  
> Royal Indian tandoor dining, Dutch-Desi street fusion, and boutique merchandise on Prinsengracht.

---

## 🏛️ Fusion Concept & Visual Identity

- **Jaipur Aesthetic**: Royal terracotta pink (`#E07A5F`), deep rose (`#C84B5B`), royal saffron (`#F4A261`), amber gold (`#E9C46A`), peacock teal (`#1A535C`), cusped Rajput haveli arches, and aromatic tandoor woodsmoke.
- **Amsterdam Aesthetic**: Historic stepped-gable canal house silhouettes, weathered dark canal brick (`#6E2D25`), Delft cobalt accents (`#1F4E79`), clean Dutch typography, and authentic canal-side *gezelligheid*.
- **The Signature Motif**: Hybrid *Cusped Gable* merging 17th-century Amsterdam canal gables with Jaipur's multi-foil palatial arches.

---

## ✨ Features

1. **Artisanal Menu & Boutique Merch Catalog**:
   - Filterable categories: *Street Bites & Fusion*, *Tandoor & Charcoal*, *Heritage Curries*, *Biryani & Breads*, *Desserts & Libations*, and *Artisanal Merch & Pantry*.
   - Live search by dish name, ingredient, and dietary preference (Vegetarian, Vegan, Halal, Gluten-Free).
   - Spice level indicators (1 to 4 peppers).
   - Dutch and English culinary descriptions with recommended beverage pairings.

2. **Direct WhatsApp Ordering**:
   - Clicking **"Order"** on any dish or merch instantly opens WhatsApp with a prefilled message containing the item name, price in Euros, and availability inquiry.
   - Global WhatsApp action in navbar and contact cards.

3. **"What's Special Today" Showcase**:
   - Dynamic royal feature section showcasing today's chef specials.
   - Chef's daily announcement quote loaded from `config.yaml`.
   - Instant toggle controls inside the `/admin` portal.

4. **Multi-Photo Dish Showcase & Seamless Image Blending**:
   - Each dish card features a multi-photo carousel supporting **any number of uploaded photos**.
   - Custom curved arch mask with soft gradient blending into the warm parchment card background.
   - Interactive high-resolution **Image Lightbox** with thumbnail navigation.

5. **Restricted Admin Portal (`/admin`)**:
   - **Google OAuth Authentication**: Access is strictly limited to whitelisted Google accounts defined in `config.yaml`.
   - **Access Denied Gate (`/admin/unauthorized`)**: Unwhitelisted Google users are gracefully redirected with instructions.
   - **Dish Setup**: Add/edit dishes with dish name, category, price (€), spice level, dietary designations, English/Dutch descriptions, drink pairing, and **uploading any number of photos**!
   - **Today's Specials Manager**: One-click toggles to feature or unfeature dishes as specials.
   - **Configuration Editor**: Edit address, phone number, opening hours, and whitelisted Google accounts saved directly into `config.yaml`.
   - **Developer Access**: Includes passcode access (`admin`) for instant local testing before Google Cloud credentials are configured.

---

## ⚙️ Configuration (`config.yaml`)

All core restaurant settings, contact numbers, hours, and whitelisted Google accounts are maintained in `config.yaml`:

```yaml
restaurant:
  name: "Desi Dutch"
  tagline: "Where the Pink City of Jaipur meets the Canals of Amsterdam"
  currency: "EUR"
  currency_symbol: "€"

contact:
  address:
    street: "Prinsengracht 412"
    postal_code: "1016 JA"
    city: "Amsterdam"
    country: "The Netherlands"
    neighborhood: "Nine Streets (De Negen Straatjes)"
    google_maps_url: "https://maps.google.com/?q=Prinsengracht+412,+1016+JA+Amsterdam"
  phone: "+31 20 789 4521"
  whatsapp: "+31 6 1234 5678"
  email: "info@desidutch.nl"

hours:
  monday_thursday: "12:00 - 22:30"
  friday_saturday: "12:00 - 23:30"
  sunday: "12:30 - 22:00"
  note: "Kitchen closes 30 minutes before closing time"

# Only Google accounts with these emails are granted access to /admin
admin_users:
  - "admin@desidutch.nl"
  - "paras@desidutch.nl"
  - "owner@desidutch.nl"
  - "your-google-email@gmail.com"
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+
- **npm** or **pnpm**

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

### Method 1: Git Push to GitHub / GitLab (Recommended)
1. Commit and push the project to a GitHub repository:
   ```bash
   git add .
   git commit -m "Initial Desi Dutch production release"
   git remote add origin https://github.com/<your-username>/desi-dutch.git
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/new), click **Import Project** and select your repository.
3. Add your Environment Variables in Vercel Project Settings:
   - `NEXTAUTH_SECRET`: Random 32-character string (`openssl rand -base64 32`)
   - `NEXTAUTH_URL`: `https://<your-project>.vercel.app`
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
4. Click **Deploy**. Vercel will build and deploy your site on its global Edge/Serverless network.

### Method 2: Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to link and deploy your project.

---

## 🔐 Setting up Google OAuth for the Admin Portal

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services > Credentials**.
3. Create an **OAuth 2.0 Client ID** (Web Application).
4. Add the following **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google` (for local development)
   - `https://<your-vercel-domain>.vercel.app/api/auth/callback/google` (for production)
5. Copy your **Client ID** and **Client Secret** into `.env.local` / Vercel Environment Variables.
6. Ensure your desired Google email is listed in `config.yaml` under `admin_users`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom Jaipur & Amsterdam design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: NextAuth.js (Auth.js) with Google Provider & Whitelist Enforcement
- **Config Management**: YAML parser (`yaml`)
- **Type Safety**: TypeScript
