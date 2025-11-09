# Detailed Step-by-Step: Get Google Maps API Key

## ✅ What Will Work After This:
- ✅ Map will display on your Android app
- ✅ You'll see markers for help requests
- ✅ You can click markers to see details
- ✅ Map will be fully functional

---

## Step-by-Step Instructions

### STEP 1: Go to Google Cloud Console

1. Open your web browser
2. Go to: **https://console.cloud.google.com/**
3. Sign in with your Google account (if not already signed in)

---

### STEP 2: Create a New Project

1. At the top of the page, click on **"Select a project"** (next to "Google Cloud")
2. A popup window will appear
3. Click the **"NEW PROJECT"** button (top right of the popup)
4. In the "Project name" field, type: **Phoenix** (or any name you want)
5. Click **"CREATE"** button
6. Wait a few seconds for the project to be created
7. Click **"SELECT"** to switch to your new project

---

### STEP 3: Enable Maps SDK for Android

1. In the left sidebar, click on **"APIs & Services"**
2. Click on **"Library"** (under APIs & Services)
3. In the search box at the top, type: **"Maps SDK for Android"**
4. Click on **"Maps SDK for Android"** from the search results
5. Click the blue **"ENABLE"** button
6. Wait a few seconds for it to enable

---

### STEP 4: Create an API Key

1. In the left sidebar, click on **"APIs & Services"** again
2. Click on **"Credentials"** (under APIs & Services)
3. At the top of the page, click **"CREATE CREDENTIALS"** button
4. From the dropdown menu, click **"API key"**
5. A popup will appear showing your new API key
6. **IMPORTANT:** Copy this API key immediately! It looks like: `AIzaSy...` (long string)
7. Click **"CLOSE"** to close the popup

**⚠️ IMPORTANT:** Save your API key somewhere safe. You'll need it in the next step.

---

### STEP 5: Add API Key to Your App

1. Open your project in your code editor (VS Code, Cursor, etc.)
2. Navigate to: `android/app/src/main/AndroidManifest.xml`
3. Find this line (around line 17):
   ```xml
   android:value="AIzaSyDummyKeyForTesting123456789"/>
   ```
4. Replace `AIzaSyDummyKeyForTesting123456789` with your **real API key** from Step 4
5. It should look like this (with your actual key):
   ```xml
   android:value="AIzaSyYourActualKeyHere123456789"/>
   ```
6. **Save the file** (Ctrl+S or Cmd+S)

---

### STEP 6: Rebuild Your App

1. Make sure Metro bundler is running (if not, run `npm start -- --reset-cache`)
2. Open a **NEW** terminal/PowerShell window
3. Navigate to your project:
   ```bash
   cd "C:\Users\sinaf\OneDrive\Desktop\Project_Pho\Phoenix"
   ```
4. Run:
   ```bash
   npm run android
   ```
5. Wait for the app to build and install on your emulator/device

---

## ✅ That's It!

Once you complete these steps:
- ✅ The map will display
- ✅ You'll see markers for help requests
- ✅ You can interact with the map
- ✅ Everything will work!

---

## Troubleshooting

### If the map still doesn't show:

1. **Check the API key is correct:**
   - Make sure you copied the entire API key (it's long!)
   - Make sure there are no extra spaces

2. **Make sure Maps SDK is enabled:**
   - Go back to Google Cloud Console
   - Check "APIs & Services" → "Library"
   - Search for "Maps SDK for Android"
   - Make sure it says "Enabled"

3. **Rebuild the app:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

4. **Check the error:**
   - Look at the Metro bundler terminal for any errors
   - Check the Android emulator/device logs

---

## Quick Checklist

- [ ] Created Google Cloud project
- [ ] Enabled "Maps SDK for Android"
- [ ] Created API key
- [ ] Copied API key
- [ ] Replaced dummy key in `AndroidManifest.xml`
- [ ] Saved the file
- [ ] Rebuilt the app with `npm run android`

---

## Need Help?

If you get stuck at any step, let me know which step and what error you see!

