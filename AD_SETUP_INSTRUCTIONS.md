# Google AdSense Setup Instructions for TubeGuessr

## ✅ Ads Have Been Added!

Two vertical sidebar ad placements have been added to your website:
1. **Left Sidebar** - Vertical ad on the left side of the game
2. **Right Sidebar** - Vertical ad on the right side of the game

**Note:** Sidebar ads only show on desktop (screen width > 1100px). They're hidden on tablets and mobile for better user experience.

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

**Ad 1 (Left Sidebar) - Line ~23:**
```html
<!-- REPLACE THIS: -->
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
data-ad-slot="XXXXXXXXXX"

<!-- WITH YOUR REAL IDS: -->
data-ad-client="ca-pub-1234567890123456"  ← Your Publisher ID
data-ad-slot="1234567890"  ← Your Ad Slot ID for Left Sidebar
```

**Ad 2 (Right Sidebar) - Line ~137:**
```html
<!-- REPLACE THIS: -->
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
data-ad-slot="YYYYYYYYYY"

<!-- WITH YOUR REAL IDS: -->
data-ad-client="ca-pub-1234567890123456"  ← Your Publisher ID
data-ad-slot="0987654321"  ← Your Ad Slot ID for Right Sidebar
```

**Important:** Use "Vertical" ad format (160x600 or similar) in your AdSense settings for best results!

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
- Ad 1: Lines ~21-35 (Left Sidebar)
- Ad 2: Lines ~135-149 (Right Sidebar)

**File: styles.css**
- Sidebar layout: Lines ~18-27
- Ad styling: Lines ~691-730

**Layout Structure:**
```
┌──────────┬──────────────┬──────────┐
│          │              │          │
│  Left    │     Game     │  Right   │
│  Ad      │   Content    │  Ad      │
│  160px   │   600px      │  160px   │
│          │              │          │
└──────────┴──────────────┴──────────┘
```

On screens < 1100px wide, sidebar ads are hidden and game takes full width.

Good luck with monetization! 🎉
