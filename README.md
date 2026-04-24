# Prometheus Advisory - Deployment Guide

This project is a high-end React application built with **Vite** and **Tailwind CSS**. It is configured as a **Static Single Page Application (SPA)** for easy deployment to servers like OVH, GitHub Pages, or Netlify.

## 🚀 Quick Start (Local)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```

## 🏗️ Building for Production

To create a production-ready build, run:
```bash
npm run build
```
This will generate a `dist/` folder containing your static assets.

## ☁️ Deployment on OVH

### Option 1: OVH Shared Hosting (Custom Upload)
1. Run `npm run build` locally.
2. Connect to your OVH FTP/SFTP.
3. Upload the **contents** of the `dist/` folder to your `www` (or root) directory.
4. **Note:** Since this is an SPA, you may need a `.htaccess` file in your `www` folder to handle routing if you use multiple URLs (deep links):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Option 2: OVH Cloud Web PaaS (via GitHub)
1. Push your code to a GitHub repository.
2. In the OVH project configuration:
   - **Environment:** Node.js
   - **Build Command:** `npm install && npm run build`
   - **Static directory:** `dist`
3. OVH will automatically build and serve your app every time you push to GitHub to the branch you selected.

## ⚠️ Troubleshooting "Black Screen" / Empty Page
If you see a black screen or an empty page after deploying:
1. **Check the files:** Ensure you uploaded the *contents* of `dist/` and not the folder itself. Your `index.html` should be at the root of your web folder (e.g., `/www/index.html`).
2. **Check relative paths:** If your app is hosted in a subdirectory (e.g., `domain.com/app/`), you must update `base` in `vite.config.ts`.
3. **Console Errors:** Open your browser's Developer Tools (F12) to check for missing scripts or network errors.

---
© 2025 Prometheus Advisory Group
