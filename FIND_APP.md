# Find App on Emulator

## Check if App is Installed

### Step 1: Check Emulator is Running
**Look at your emulator window:**
- Is it showing the Android home screen?
- Is it fully booted?

### Step 2: Find App on Emulator

**On the emulator:**
1. **Swipe up from bottom** (or click the app drawer icon - usually 6 dots or grid icon)
2. **Look for "Phoenix"** app icon
3. **Tap it** to open

**Or search for it:**
1. **Swipe up** to open app drawer
2. **Type "Phoenix"** in the search box at the top
3. **Tap the app** when it appears

---

## Launch App Manually

### From Command Line:
```powershell
# Add ADB to PATH (if not already)
$env:PATH += ";$env:LOCALAPPDATA\Android\Sdk\platform-tools"

# Launch app
adb shell am start -n com.phoenix/.MainActivity
```

---

## Check if Build Succeeded

**Look at the terminal where you ran `npm run android`:**

1. **Did it say "BUILD SUCCESSFUL"?**
2. **Did it say "Installing APK"?**
3. **Did it say "Launching app"?**
4. **Any errors?**

---

## If App is Not There

### Option 1: Check Build Output
Look at the terminal output:
- Did the build complete?
- Any errors?
- Did it say "Installing APK"?

### Option 2: Try Building Again
```bash
npm run android
```

### Option 3: Check App Drawer
1. **On emulator, swipe up** from bottom
2. **Look for "Phoenix"** app
3. **If not there, the app might not be installed**

---

## Quick Steps

1. **On emulator, swipe up** to open app drawer
2. **Look for "Phoenix"** app icon
3. **Tap it** to open

**Or launch from command line:**
```powershell
$env:PATH += ";$env:LOCALAPPDATA\Android\Sdk\platform-tools"
adb shell am start -n com.phoenix/.MainActivity
```

---

## Check Build Status

**In the terminal where you ran `npm run android`:**
- What was the last message?
- Did it say "BUILD SUCCESSFUL"?
- Did it say "Installing APK"?
- Any errors?

---

## That's It!

Try finding the app in the app drawer, or check the build output to see if it installed successfully! 🚀

