/**
 * SteriQual Solutions — enquiry log (Google Apps Script)
 *
 * This script ONLY saves enquiries to this Google Sheet. It sends no email.
 * The website emails the company and the customer itself, through Hostinger SMTP,
 * and then posts each enquiry here so the team has a running log.
 *
 * Setup steps: docs/email-setup.md ("Google Sheet log") in the website repo.
 */

// ---------------------------------------------------------------------------
// 1. SETTINGS
// ---------------------------------------------------------------------------
const CONFIG = {
  // Must match ENQUIRY_SHEET_SECRET in the website's environment variables.
  // Stops anyone who finds this URL from writing junk into the sheet.
  SECRET: 'Mg3ionO5eMaYeXhwWfQCzIurzAIj039Y',
  SHEET_NAME: 'Enquiries',
  TIMEZONE: 'Asia/Kolkata',
};

const HEADERS = ['Reference', 'Received', 'Name', 'Email', 'Phone', 'Company', 'Sector', 'Service', 'Message', 'Page', 'Status'];

// ---------------------------------------------------------------------------
// 2. WEB ENDPOINTS
// ---------------------------------------------------------------------------
function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (!CONFIG.SECRET || p.secret !== CONFIG.SECRET) return json_({ ok: false, error: 'Not allowed' });

    const row = {
      ref: clean_(p.ref, 40),
      name: clean_(p.name, 120),
      email: clean_(p.email, 254),
      phone: clean_(p.phone, 20),
      company: clean_(p.company, 160),
      sector: clean_(p.sector, 60),
      service: clean_(p.service, 80),
      message: clean_(p.message, 4000),
      page: clean_(p.page, 300),
    };
    if (!row.name || !row.email) return json_({ ok: false, error: 'Missing name or email' });

    const ref = saveRow_(row);
    return json_({ ok: true, ref: ref });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Server error' });
  }
}

function doGet() {
  return json_({ ok: true, service: 'SteriQual enquiry log' });
}

// ---------------------------------------------------------------------------
// 3. HELPERS
// ---------------------------------------------------------------------------
function clean_(value, max) {
  return String(value || '').trim().slice(0, max);
}

function saveRow_(d) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0D1B3D').setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }
    const now = new Date();
    const ref = d.ref || 'SQ-' + Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyMMdd') + '-' + String(sheet.getLastRow()).padStart(3, '0');
    // Prefix values that start with = + - @ so the sheet never treats them as formulas.
    const safe = (v) => (/^[=+\-@]/.test(v) ? "'" + v : v);
    sheet.appendRow([
      ref,
      Utilities.formatDate(now, CONFIG.TIMEZONE, 'dd MMM yyyy, hh:mm a'),
      safe(d.name), safe(d.email), "'" + d.phone, safe(d.company), safe(d.sector), safe(d.service), safe(d.message), safe(d.page), 'New',
    ]);
    return ref;
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------------------
// 4. RUN ONCE FROM THE EDITOR TO TEST: adds a test row to the sheet (delete it afterwards)
// ---------------------------------------------------------------------------
function testLog() {
  const res = doPost({
    parameter: {
      secret: CONFIG.SECRET,
      ref: 'SQ-TEST',
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '+91 98765 43210',
      company: 'Test Pharma Ltd.',
      sector: 'Pharmaceutical',
      service: 'Training',
      message: 'Test row from the Apps Script editor.',
      page: 'editor-test',
    },
  });
  console.log(res.getContent());
}
