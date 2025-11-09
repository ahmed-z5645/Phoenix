# Step-by-Step Fix for Metro Bundler Error

## The Problem
Metro bundler can't find `react-native-screens` module. This is a cache issue.

## Solution: Step-by-Step Commands

### Step 1: Stop Metro Bundler
Open PowerShell/Terminal and run:
```bash
cd "C:\Users\sinaf\OneDrive\Desktop\Project_Pho\Phoenix"
taskkill /F /IM node.exe
```

### Step 2: Start Metro Bundler with Reset Cache
In the same terminal, run:
```bash
npm start -- --reset-cache
```

**Wait for Metro to start!** You should see:
```
Metro waiting on...
```

### Step 3: Reload the App

**Option A: Press 'r' in Metro Bundler Terminal**
- In the Metro bundler terminal window
- Press `r` to reload
- The app should reload automatically

**Option B: Run in a NEW Terminal**
Open a NEW PowerShell/Terminal window and run:
```bash
cd "C:\Users\sinaf\OneDrive\Desktop\Project_Pho\Phoenix"
npm run android
```

**Option C: Shake Device/Emulator**
- Shake your device/emulator
- Select "Reload" from the menu

---

## If It Still Doesn't Work

### Step 4: Reinstall react-native-screens
```bash
npm install react-native-screens@3.27.0
```

### Step 5: Restart Metro Bundler
```bash
taskkill /F /IM node.exe
npm start -- --reset-cache
```

### Step 6: Reload App Again
Press `r` in Metro bundler or run `npm run android`

---

## Quick Summary

1. `taskkill /F /IM node.exe` - Stop Metro
2. `npm start -- --reset-cache` - Start Metro with clean cache
3. Wait for "Metro waiting on..."
4. Press `r` in Metro terminal OR run `npm run android` in new terminal

---

## That's It!

The Metro bundler cache has been cleared, so it should now find `react-native-screens` correctly.

