# ✅ DNS Setup Checklist for bookmethat.com

Quick checklist based on your Hostinger email configuration screen.

---

## 📋 Records to Add (From Your Screenshots)

### 1️⃣ MX Records - Receive Emails

| Type | Name | Value | Priority | TTL |
|------|------|-------|----------|-----|
| **MX** | @ | mx1.hostinger.com | 5 | 14400 |
| **MX** | @ | mx2.hostinger.com | 10 | 14400 |

✅ **Status:** Shown in screenshot as "Expected records"

---

### 2️⃣ DMARC Record - Authentication

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **TXT** | _dmarc | v=DMARC1; p=none | 3600 |

✅ **Status:** Shown in screenshot as "Expected records"

---

### 3️⃣ SPF Record - Prevent Spoofing

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **TXT** | @ | v=spf1 include:_spf.hostinger.com ~all | 14400 |

**Status:** ⚠️ Need to add this manually

---

### 4️⃣ DKIM Record - Email Signing

1. In Hostinger hPanel, go to the "Protect your reputation" tab
2. Enable DKIM
3. Copy the TXT record provided
4. Add to your DNS

**Status:** ⚠️ Need to enable and add to DNS

---

## 🚀 Where to Add These Records

### If Domain is with Hostinger:
1. Same hPanel → Domains
2. Select `bookmethat.com`
3. Click "DNS / Name Servers"
4. Add each record above
5. Click "Add Record" for each entry

### If Domain is Elsewhere (GoDaddy, Namecheap, etc.):
1. Login to your domain registrar
2. Find "DNS Management" or "DNS Settings"
3. Add each record from the table above
4. Save changes

---

## ⏱️ After Adding Records

**Wait Time:** 15-60 minutes for Hostinger DNS, up to 24 hours for other registrars

**Check Progress:**
```powershell
# Check MX records
nslookup -type=mx bookmethat.com

# Check TXT records (SPF/DMARC)
nslookup -type=txt bookmethat.com
```

**Expected Output:**
```
MX records:
  mx1.hostinger.com (priority 5)
  mx2.hostinger.com (priority 10)

TXT records:
  v=spf1 include:_spf.hostinger.com ~all
  v=DMARC1; p=none
```

---

## ✅ Verification Checklist

Once you've added all records, verify:

- [ ] MX records added (mx1 and mx2)
- [ ] DMARC record added (_dmarc)
- [ ] SPF record added (TXT with v=spf1)
- [ ] DKIM enabled in Hostinger and DNS record added
- [ ] Wait 15-60 minutes for propagation
- [ ] Test with `nslookup` commands above
- [ ] Check status in Hostinger hPanel (should show green checkmarks)
- [ ] Send test email from backend
- [ ] Receive test email at your Hostinger mailbox

---

## 🧪 Test Commands

```powershell
# Test MX records
nslookup -type=mx bookmethat.com

# Test all TXT records
nslookup -type=txt bookmethat.com

# Test specific DMARC record
nslookup -type=txt _dmarc.bookmethat.com

# Check all at once (online)
# Visit: https://mxtoolbox.com/SuperTool.aspx?action=mx%3abookmethat.com
```

---

## 🎯 Quick Actions

### Action 1: Add MX Records
```
Go to DNS settings → Add Record
Type: MX
Name: @ (or leave blank)
Value: mx1.hostinger.com
Priority: 5
TTL: 14400
Click Save

Repeat for mx2.hostinger.com with Priority: 10
```

### Action 2: Add DMARC Record
```
Go to DNS settings → Add Record
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none
TTL: 3600
Click Save
```

### Action 3: Add SPF Record
```
Go to DNS settings → Add Record
Type: TXT
Name: @ (or leave blank)
Value: v=spf1 include:_spf.hostinger.com ~all
TTL: 14400
Click Save
```

### Action 4: Enable DKIM
```
Hostinger hPanel → Email → bookmethat.com
Click "Protect your reputation" tab
Click "Enable DKIM"
Copy the TXT record shown
Add to DNS settings (Type: TXT, Name: default._domainkey or as shown)
```

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ Hostinger hPanel shows green checkmarks on all tabs
2. ✅ `nslookup -type=mx bookmethat.com` returns Hostinger MX servers
3. ✅ No red warning icons in Hostinger email dashboard
4. ✅ Can send test email from backend without errors
5. ✅ Can receive email at noreply@bookmethat.com

---

## 📞 Need Help?

**Hostinger Support:**
- Live Chat: Click the chat icon in hPanel
- Support: https://support.hostinger.com/

**DNS Checker Tools:**
- https://mxtoolbox.com/ (comprehensive)
- https://dnschecker.org/ (global propagation)
- https://toolbox.googleapps.com/apps/checkmx/ (Google MX check)

---

**Current Status:** 🟡 Waiting for DNS records to be added
**Next Step:** Add the 4 DNS records listed above
**Estimated Time:** 10 minutes to add + 30-60 minutes for propagation
**Last Updated:** November 24, 2025
