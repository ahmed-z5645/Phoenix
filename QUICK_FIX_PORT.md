# Quick Fix: Port 8081 Already in Use

## Problem
Metro bundler is already running on port 8081.

---

## Quick Solutions

### Option 1: Kill All Node Processes (Easiest)
```powershell
taskkill /F /IM node.exe
```

**Then start Metro bundler again:**
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

### Option 3: Find and Kill Specific Process

1. **Find process on port 8081:**
   ```powershell
   netstat -ano | findstr :8081
   ```
   This shows the PID

2. **Kill it:**
   ```powershell
   taskkill /PID <PID> /F
   ```
   Replace `<PID>` with the number from step 1

3. **Start Metro bundler:**
   ```bash
   npm start
   ```

---

## Recommended: Kill All Node Processes

**Just run:**
```powershell
taskkill /F /IM node.exe
```

**Then:**
```bash
npm start
```

---

## After Fixing

1. **Kill existing process** (see above)
2. **Start Metro bundler:**
   ```bash
   npm start
   ```
3. **In another terminal:**
   ```bash
   npm run android
   ```

---

## That's It!

Kill the existing process, then start Metro bundler again! 🚀

