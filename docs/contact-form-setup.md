# Google Sheet log setup (stores enquiries only)

The website sends both emails itself through Hostinger SMTP (see `docs/email-setup.md`).
This Google Apps Script **only saves each enquiry as a row in a Google Sheet**. It sends no email.

## Step 1: Create the sheet and add the script

1. Sign in to the Google account that should own the enquiry log and open [sheets.new](https://sheets.new). Name it **SteriQual Website Enquiries**.
2. Open **Extensions → Apps Script**, delete everything in `Code.gs`, and paste the full contents of `integrations/google-apps-script/Code.gs` from the website repo.
3. Check `SECRET` at the top. It must be exactly the same as `ENQUIRY_SHEET_SECRET` in the website's environment variables (`.env` locally, hPanel for the live site).
4. Click **Save**.

## Step 2: Test it

1. Choose **testLog** in the function dropdown and click **Run**. Allow the permissions the first time.
2. A row with reference `SQ-TEST` appears in the **Enquiries** tab. Delete it.

## Step 3: Publish it

- **First time:** **Deploy → New deployment → Web app**, set **Execute as: Me** and **Who has access: Anyone**, click **Deploy**, and copy the URL ending in `/exec`.
- **Already deployed before?** Use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. The URL stays the same.

## Step 4: Connect the website

Set these in `.env` (local) and in hPanel → Node.js app → Environment variables (live), then restart/redeploy:

| Name | Value |
|---|---|
| `ENQUIRY_SHEET_WEBHOOK` | the `/exec` URL from step 3 |
| `ENQUIRY_SHEET_SECRET` | the same value as `SECRET` in the script |

## Good to know

- If the sheet is unreachable, the emails still go out; only the row is skipped (the error appears in the Node.js app logs).
- The **Status** column starts as "New". Change it to "Contacted", "Quoted" and so on to track follow-ups.
- The secret stops anyone who finds the URL from writing junk rows into the sheet.
