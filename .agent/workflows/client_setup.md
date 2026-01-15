---
description: Simple checklist for setting up client workspace and services for iman-islam.org
---

# Client Workspace Setup Checklist

## 1. Initial Information Gathering
- **Domain:** https://iman-islam.org/
- **Admin password** (provided by client) – keep it secure.
- **Contact person** (name, phone, email).
- **Desired email addresses** (e.g., info@iman-islam.org, support@iman-islam.org, team@iman-islam.org).
- **Social media accounts** to create or link:
  - Facebook Page
  - YouTube Channel
  - X (Twitter) account
- **Form requirements**:
  - Confirmation email to the submitter.
  - PDF attachment with information.

## 2. Secure the Domain & Hosting
1. Log in to the domain registrar (where the domain is registered).
2. Verify ownership and update **nameservers** to point to your hosting provider (e.g., Netlify, Vercel, or a traditional VPS).
3. Set up **SSL/TLS** (HTTPS) – most hosts provide this automatically.

## 3. Set Up Hosting / Service
- Choose a hosting service that supports static sites or a Node.js app (Vercel, Netlify, or a simple Apache/Nginx server).
- Deploy the existing website code (the `iman_islamic_center` repo) to the host.
- Configure environment variables for any secret keys (e.g., email service API keys, PDF generation keys).

## 4. Create Email Accounts
- If the domain is hosted on a provider that offers email (Google Workspace, Microsoft 365, Zoho Mail, etc.):
  1. Add the desired email addresses.
  2. Set up **aliases** if needed.
  3. Enable **two‑factor authentication** for security.
- Record the **SMTP credentials** – you’ll need them for sending confirmation emails.

## 5. Set Up Social Media Profiles
| Platform | Steps |
|----------|-------|
| **Facebook** | 1. Create a Facebook Page using the organization name.<br>2. Add the website URL and profile picture.<br>3. Verify the page (optional but recommended). |
| **YouTube** | 1. Create a Google account (or use an existing one).<br>2. Create a YouTube channel named *Iman Islamic Center*.<br>3. Upload a banner and link the website in the description. |
| **X (Twitter)** | 1. Create a Twitter account with the handle `@ImanIslamicCenter` (or similar).<br>2. Fill out the profile, add the website link, and set a profile image. |

## 6. Implement the Form on the Website
1. **Front‑end** – add a simple HTML/React form with fields you need (name, email, etc.).
2. **Back‑end** – when the form is submitted:
   - Store the data (e.g., in a lightweight database or a JSON file).
   - Send a **confirmation email** using an email service (SendGrid, Mailgun, Gmail SMTP, etc.).
   - Generate a **PDF** (use a library like `pdf-lib` or a server‑side service) containing the information you want to share.
   - Attach the PDF to the confirmation email.
3. **Security** – protect the endpoint with a secret token or reCAPTCHA to avoid spam.

## 7. Test Everything
- Submit the form yourself and verify:
  - Email arrives in the inbox.
  - PDF is attached and opens correctly.
- Check that all email accounts can send/receive.
- Verify that social media links on the site point to the correct pages.

## 8. Handover Documentation
- Write a short **README** for the client covering:
  - How to log into the hosting dashboard.
  - How to access email accounts.
  - Where to find the form code and how to update it.
  - Credentials (store them securely, e.g., in a password manager).

## 9. Ongoing Maintenance (Optional)
- Set up **automatic backups** for the site and database.
- Schedule **monthly security checks** for the hosting environment.
- Keep social media passwords updated and enable 2FA.

---

**Quick First Step:** Secure the admin password you received, store it safely (e.g., in a password manager), and log into the domain registrar to confirm you have control over `iman‑islam.org`. From there you can point the domain to your chosen hosting service.
