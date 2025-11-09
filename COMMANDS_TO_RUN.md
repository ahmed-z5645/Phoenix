# Commands to Run - Step by Step

## Step 1: Stop Metro Bundler
```bash
taskkill /F /IM node.exe
```

## Step 2: Start Metro Bundler with Reset Cache
```bash
npm start -- --reset-cache
```
**Wait for Metro to show "Metro waiting on..." before proceeding!**

## Step 3: Reload the App

**Option A: Press 'r' in Metro Bundler Terminal**
- Just press the `r` key in the Metro bundler terminal window

**Option B: Run in a NEW Terminal Window**
Open a NEW PowerShell window and run:
```bash
cd "C:\Users\sinaf\OneDrive\Desktop\Project_Pho\Phoenix"
npm run android
```

---

## If It Still Doesn't Work, Run These:

## Step 4: Reinstall react-native-screens
```bash
npm install react-native-screens@3.27.0
```

## Step 5: Stop Metro Again
```bash
taskkill /F /IM node.exe
```

## Step 6: Start Metro Again
```bash
npm start -- --reset-cache
```

## Step 7: Reload App
Press `r` in Metro terminal OR run `npm run android` in new terminal

---

## That's It!

