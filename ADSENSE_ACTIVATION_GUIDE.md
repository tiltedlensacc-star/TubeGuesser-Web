# Complete Google AdSense Activation Guide

## 🚀 Step-by-Step Setup Process

### STEP 1: Create Your AdSense Account

1. **Go to Google AdSense**
   - Visit: https://www.google.com/adsense/start/
   - Click "Get Started"

2. **Sign in with Google Account**
   - Use your existing Google account (or create new one)
   - Recommend using a business/professional email if possible

3. **Enter Your Website URL**
   - Enter: `londonstationgame.com` (or your actual domain)
   - Important: Must be the EXACT domain where ads will appear

4. **Fill Out Application Form**
   - Country/Territory
   - Email for important notifications
   - Accept terms and conditions
   - Click "Create Account"

---

### STEP 2: Add AdSense Code to Your Site

After creating account, Google will give you a **site verification code**.

**The code looks like this:**
```html
<script data-ad-client="ca-pub-1234567890123456" 
        async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
</script>
```

**How to add it:**

1. Open your `index.html` file
2. Find the `<head>` section (around line 3-16)
3. Add the verification code BEFORE the closing `</head>` tag

**Example:**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TubeGuessr - Daily London Underground Station Game</title>
    <link rel="stylesheet" href="styles.css">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GG42B0MVC7"></script>
    ...

    <!-- Google AdSense Verification Code - ADD THIS -->
    <script data-ad-client="ca-pub-YOUR-ACTUAL-ID-HERE" 
            async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
    </script>
</head>
```

4. **Save and push to GitHub:**
```bash
git add index.html
git commit -m "Add AdSense verification code"
git push
```

5. **Go back to AdSense and click "I've placed the code"**

---

### STEP 3: Wait for Approval (1-2 Weeks)

**What Google checks:**
- ✅ Original content (you have this)
- ✅ Sufficient content (you have this)
- ✅ Privacy policy (you have this)
- ✅ Easy navigation (you have this)
- ⚠️ Sufficient traffic (prefer 500+ daily visitors, but not required)

**During this time:**
- Keep adding content/features to your site
- Drive traffic through social media, Reddit, etc.
- Don't click your own ads (even to test!)

**You'll get an email when approved or if they need changes.**

---

### STEP 4: Create Ad Units (After Approval)

Once approved, create your ad units:

1. **Go to AdSense Dashboard**
   - Visit: https://adsense.google.com

2. **Navigate to Ads > By ad unit**
   - Click "Display ads" or "In-feed ads"

3. **Create Left Sidebar Ad:**
   - Name: "TubeGuessr Left Sidebar"
   - Ad type: **Display ads**
   - Shape: **Vertical (160x600)** ← IMPORTANT!
   - Click "Create"
   - Copy the ad code

4. **Create Right Sidebar Ad:**
   - Name: "TubeGuessr Right Sidebar"  
   - Ad type: **Display ads**
   - Shape: **Vertical (160x600)** ← IMPORTANT!
   - Click "Create"
   - Copy the ad code

---

### STEP 5: Update Your Website with Real Ad Codes

After creating ad units, you'll get codes like this:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1234567890123456"
     data-ad-slot="9876543210"
     data-ad-format="vertical"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

**Key parts to extract:**
- **Publisher ID:** `ca-pub-1234567890123456` (same for both ads)
- **Ad Slot ID (Left):** `9876543210`
- **Ad Slot ID (Right):** `1122334455` (different from left)

---

### STEP 6: Replace Placeholder Codes in index.html

**Find and replace in your index.html file:**

#### LEFT SIDEBAR AD (around line 23-35):

**FIND THIS:**
```html
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
data-ad-slot="XXXXXXXXXX"
```

**REPLACE WITH:**
```html
data-ad-client="ca-pub-1234567890123456"  ← Your real Publisher ID
data-ad-slot="9876543210"  ← Your real Left Sidebar Ad Slot ID
```

#### RIGHT SIDEBAR AD (around line 137-149):

**FIND THIS:**
```html
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
data-ad-slot="YYYYYYYYYY"
```

**REPLACE WITH:**
```html
data-ad-client="ca-pub-1234567890123456"  ← Your real Publisher ID
data-ad-slot="1122334455"  ← Your real Right Sidebar Ad Slot ID
```

**Note:** Replace BOTH instances (the script src AND the data-ad-client attribute)

---

### STEP 7: Deploy and Wait

1. **Commit your changes:**
```bash
git add index.html
git commit -m "Activate AdSense with real ad unit IDs"
git push
```

2. **Wait 24-48 hours**
   - Ads don't appear immediately
   - Google needs to crawl your updated site
   - Be patient!

3. **Check AdSense dashboard**
   - You'll see impressions and clicks start appearing
   - Revenue updates daily

---

## 🎯 Expected Timeline

| Step | Time |
|------|------|
| Sign up & submit | 10 minutes |
| Add verification code | 5 minutes |
| **Wait for approval** | **1-2 weeks** |
| Create ad units | 10 minutes |
| Replace placeholder codes | 5 minutes |
| **Wait for ads to show** | **24-48 hours** |

**Total time:** ~2-3 weeks from start to seeing ads

---

## 💰 Setting Up Payment

1. **Go to Payments in AdSense**
2. **Enter your payment information:**
   - Bank account details
   - Tax information (required)
   - Payment threshold: $100 USD

3. **Wait for $100 threshold**
   - Google pays monthly
   - Only when you reach $100
   - Typically takes 2-3 months for small sites

---

## ⚠️ Common Issues & Solutions

### "Site not approved"
**Reasons:**
- Insufficient content → Add more pages/features
- Low traffic → Focus on marketing first
- Policy violations → Read AdSense policies carefully

**Solution:** Fix issues and reapply after 30 days

### "Ads not showing after 48 hours"
**Check:**
1. Did you replace BOTH placeholder codes?
2. Is your Publisher ID correct (starts with `ca-pub-`)?
3. Did you use the correct ad slot IDs?
4. Check browser console for errors (F12)
5. Try incognito mode (clears cache)

### "Account disabled"
**Never:**
- ❌ Click your own ads
- ❌ Ask others to click ads
- ❌ Use bots or click farms
- ❌ Place ads on prohibited content

### "Low earnings"
**Normal for small sites:**
- Need 1,000+ daily visitors for meaningful revenue
- $30-50/month typical for 100-200 daily visitors
- Focus on growing audience first

---

## 📊 Tracking Performance

**AdSense Dashboard shows:**
- **Estimated earnings** (today, yesterday, this month)
- **Page RPM** (revenue per 1,000 page views)
- **Impressions** (how many times ads were shown)
- **Clicks** (how many ad clicks)
- **CTR** (click-through rate %)

**Good benchmarks:**
- CTR: 0.5% - 2%
- RPM: $3 - $10 for casual games
- Higher in UK than many countries

---

## 🆘 Need Help?

**Resources:**
- AdSense Help Center: https://support.google.com/adsense
- Community Forum: https://support.google.com/adsense/community
- Policy Center: https://support.google.com/adsense/answer/48182

**Support:**
- Email: Through AdSense dashboard (Help → Contact us)
- Usually responds within 24-48 hours

---

## ✅ Quick Checklist

Before applying:
- [ ] Website is live and accessible
- [ ] Have privacy policy page
- [ ] Have terms of service
- [ ] Original content (not copied)
- [ ] Site looks professional
- [ ] All pages work correctly

After approval:
- [ ] Created 2 vertical ad units (160x600)
- [ ] Copied Publisher ID
- [ ] Copied both Ad Slot IDs
- [ ] Replaced placeholders in index.html
- [ ] Committed and pushed to GitHub
- [ ] Waited 24-48 hours
- [ ] Checked AdSense dashboard

---

Good luck! 🚀 Remember: Growing your audience is more important than ads. Focus on making a great game first!
