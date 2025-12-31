# Google AdSense Setup Instructions for TubeGuessr

## ✅ Ads Have Been Added!

Two ad placements have been added to your website:
1. **Welcome Screen** - Below the welcome buttons
2. **Completed Screen** - After the game ends and "View Stats" button

## 🚀 How to Activate the Ads

### Step 1: Sign Up for Google AdSense
1. Go to https://www.google.com/adsense
2. Click "Get Started"
3. Sign in with your Google account
4. Enter your website URL: `londonstationgame.com` (or whatever your domain is)
5. Fill out the application form

### Step 2: Wait for Approval (1-2 weeks)
- Google will review your site
- They check for:
  - Original content ✅ (you have this)
  - Sufficient traffic (they prefer 500+ daily visitors)
  - Privacy policy ✅ (you have this)
  - Terms of service ✅ (you have this)

### Step 3: Get Your Ad Code
Once approved, you'll receive:
1. **Publisher ID** (looks like: `ca-pub-1234567890123456`)
2. **Ad Slot IDs** (looks like: `1234567890`)

### Step 4: Update the Placeholder Code

In `index.html`, find and replace these placeholders:

**Ad 1 (Welcome Screen) - Line ~46:**
```html
<!-- REPLACE THIS: -->
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
data-ad-slot="XXXXXXXXXX"

<!-- WITH YOUR REAL IDS: -->
data-ad-client="ca-pub-1234567890123456"  ← Your Publisher ID
data-ad-slot="1234567890"  ← Your Ad Slot ID for Welcome Screen
```

**Ad 2 (Completed Screen) - Line ~130:**
```html
<!-- REPLACE THIS: -->
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
data-ad-slot="YYYYYYYYYY"

<!-- WITH YOUR REAL IDS: -->
data-ad-client="ca-pub-1234567890123456"  ← Your Publisher ID
data-ad-slot="0987654321"  ← Your Ad Slot ID for Completed Screen
```

### Step 5: Deploy and Wait
- Commit and push your changes to GitHub
- Ads can take 24-48 hours to start showing
- Google needs to crawl your site first

## 📊 Where to Find Your Ad Performance

1. Go to https://adsense.google.com
2. Dashboard shows:
   - **Earnings** - How much you've made
   - **RPM** - Revenue per 1,000 views
   - **Clicks** - How many ad clicks
   - **Impressions** - How many times ads were shown

## ⚠️ Important Notes

### Payment Threshold
- Google pays when you reach **$100**
- Paid monthly via bank transfer
- Set up payment info in AdSense dashboard

### Ad Policies
**DON'T:**
- ❌ Click your own ads (instant ban!)
- ❌ Ask others to click ads
- ❌ Place ads on auto-generated content
- ❌ Use misleading placement

**DO:**
- ✅ Create original content
- ✅ Follow Google's policies
- ✅ Be patient (earnings take time)

### Ad Blockers
- ~30-40% of users have ad blockers
- They won't see ads (no revenue from them)
- Can't force users to disable blockers

## 🎯 Expected Revenue

Based on typical traffic:
- **100 daily visitors** = ~$30-50/month
- **500 daily visitors** = ~$150-250/month
- **1,000 daily visitors** = ~$300-500/month

Your actual revenue depends on:
- Traffic volume
- User location (UK traffic = higher value)
- Click-through rate
- Ad blockers

## 🆘 Troubleshooting

### Ads Not Showing?
1. Check if you replaced placeholder IDs
2. Wait 24-48 hours after going live
3. Clear browser cache
4. Make sure AdSense account is active
5. Check AdSense dashboard for errors

### "Ads.txt" Warning?
If you see this in AdSense:
1. Create a file called `ads.txt` in your website root
2. Add the line Google provides (from AdSense dashboard)
3. Upload to your site

## 📞 Need Help?

- **Google AdSense Help:** https://support.google.com/adsense
- **Community Forum:** https://support.google.com/adsense/community

---

## Current Ad Locations in Code

**File: index.html**
- Ad 1: Lines ~44-58 (Welcome Screen)
- Ad 2: Lines ~128-142 (Completed Screen)

**File: styles.css**
- Ad styling: Lines ~680-705

Good luck with monetization! 🎉
