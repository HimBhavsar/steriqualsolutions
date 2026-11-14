# Contact form email setup (Hostinger SMTP)

Every enquiry from the Contact page (and from AI agents using the `submit_enquiry` tool) sends two emails from your Hostinger mailbox, for example `noreply@steriqual.com`:

1. **Alert to the company**: "New enquiry: Training – Rahul Mehta (Acme Pharma) [SQ-261114-UKEP]". Hitting **Reply** writes straight to the customer.
2. **Thank-you to the customer**: their copy of the enquiry with a reference number. If they reply, it goes to your company inbox (not to noreply).

The website's own server sends the emails (`app/lib/enquiry.ts`, route `/api/enquiry`). The mailbox password stays on the server and never reaches visitors' browsers.

---

## Step 1: Get the mailbox details

In hPanel go to **Emails → your domain → Email accounts**. You need:

| Setting | Value |
|---|---|
| SMTP host | `smtp.hostinger.com` |
| Port | `465` (SSL). If that fails, use `587` (STARTTLS). |
| Username | the full address, e.g. `noreply@steriqual.com` |
| Password | that mailbox's password |

## Step 2: Add the settings to the live site

In hPanel open **Websites → your site → Node.js app** (the app that runs the website) and find **Environment variables**. Add:

| Name | Example value |
|---|---|
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `noreply@steriqual.com` |
| `SMTP_PASS` | *(the mailbox password)* |
| `ENQUIRY_TO` | `info@steriqual.com` (where alerts arrive; separate several with commas) |
| `ENQUIRY_CC` | optional, e.g. `mehul@steriqual.com,dharmesh@steriqual.com` |
| `REPLY_TO` | optional; where customer replies go (defaults to `ENQUIRY_TO`) |

Save, then **redeploy / restart** the app so it picks up the values.

## Step 3: Test

1. Open the live Contact page and send a test enquiry with your own email.
2. You should see the "Enquiry received" screen with a reference number.
3. Check both inboxes: the alert in `ENQUIRY_TO`, the thank-you in your own email.
4. If the page says "our mail server didn't respond", the username, password or port is wrong. Check the Node.js app's logs in hPanel for the exact error.

To test on your laptop first: copy `.env.example` to `.env.local`, fill in the same values, and run `npm run dev`. `.env.local` is in `.gitignore`, so the password never goes to GitHub.

## Step 4: Make sure emails land in the inbox, not spam

In hPanel go to **Emails → your domain** and check that **SPF, DKIM and DMARC** are set up (Hostinger usually adds them automatically when the domain's DNS is on Hostinger). Without them, Gmail and Outlook may send the emails to spam.

Send a first test to a Gmail address and, if it lands in spam, mark it "Not spam".

---

## Google Sheet log

Every enquiry is also saved as a row in a Google Sheet (the sheet only stores data; it never sends email). Setup: `docs/contact-form-setup.md`. Add `ENQUIRY_SHEET_WEBHOOK` and `ENQUIRY_SHEET_SECRET` next to the SMTP settings.

## Good to know

- **Spam protection:** a hidden trap field catches bots, and the site accepts at most 5 enquiries an hour from one email address or IP.
- **Sending limits:** Hostinger mailboxes have a daily sending limit that depends on the email plan. Each enquiry uses two emails.
- **Logo:** the logo is embedded inside each email, so it shows even before the website is live.
