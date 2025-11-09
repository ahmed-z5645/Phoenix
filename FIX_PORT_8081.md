# Fix Port 8081 Already in Use

## Problem
**Error:** `EADDRINUSE: address already in use :::8081`

**What this means:**
- Metro bundler is already running on port 8081
- You can't start another one on the same port

---

## Solution: Kill the Existing Process

### Option 1: Kill Process Using Port 8081

1. **Find the process:**
   ```powershell
   netstat -ano | findstr :8081
   ```
   This shows the PID (Process ID)

2. **Kill the process:**
   ```powershell
   taskkill /PID <PID> /F
   ```
   Replace `<PID>` with the actual number from step 1

3. **Then start Metro bundler again:**
   ```bash
   npm start
   ```

---

### Option 2: Use Different Port

```bash
npm start -- --port 8082
```

This starts Metro bundler on port 8082 instead.

---

### Option 3: Find and Kill Node Process

```powershell
# Find all Node processes
tasklist | findstr node

# Kill all Node processes (be careful!)
taskkill /F /IM node.exe
```

Then start Metro bundler again:
```bash
npm start
```

---

## Quick Fix

### Step 1: Kill Existing Metro Bundler
```powershell
# Find process on port 8081
netstat -ano | findstr :8081

# Kill it (replace PID with actual number)
taskkill /PID <PID> /F
```

### Step 2: Start Metro Bundler Again
```bash
npm start
```

---

## Or Use Different Port

```bash
npm start -- --port 8082
```

Then in your app, it will use port 8082.

---

## After Fixing

1. **Kill the existing process** (see above)
2. **Start Metro bundler:**
   ```bash
   npm start
   ```
3. **In another terminal, run:**
   ```bash
   npm run android
   ```

---

## That's It!

Once you kill the existing process, you can start Metro bundler again! 🚀

