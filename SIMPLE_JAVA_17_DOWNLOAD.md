# Simple Java 17 Download

## Quick Steps

1. **Go to:** https://adoptium.net/temurin/releases/?version=17
2. **Click:** "Windows" → "x64" → "JDK" → "Latest"
3. **Download:** The `.msi` installer file
4. **Install:** Run the installer (default location is fine)
5. **Find path:** Usually `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`
6. **Set in gradle.properties:**
   ```properties
   org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-17.x.x-hotspot
   ```
   (Replace `jdk-17.x.x-hotspot` with your actual folder name)
7. **Try building:** `npm run android`

---

## Direct Download

**Windows x64 JDK 17:**
- https://adoptium.net/temurin/releases/?version=17
- Select: Windows → x64 → JDK → Download

---

## After Installation

Run this to find the exact path:
```powershell
Get-ChildItem -Path "C:\Program Files\Eclipse Adoptium" -Directory | ForEach-Object { Write-Host $_.FullName }
```

Then set it in `android/gradle.properties` with double backslashes!

---

## That's It!

Download, install, set path, build! 🚀


