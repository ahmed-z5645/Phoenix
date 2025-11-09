# Download Java 17 Manually

## Step 1: Download Java 17

### Option A: Download from Adoptium (Recommended)
1. Go to: **https://adoptium.net/temurin/releases/?version=17**
2. Select:
   - **Operating System:** Windows
   - **Architecture:** x64
   - **Package Type:** JDK
3. Click **"Latest"** or **"17.0.x"** version
4. Click **"Download"** button
5. Wait for download to complete

### Option B: Download from Microsoft
1. Go to: **https://learn.microsoft.com/en-us/java/openjdk/download**
2. Find **"OpenJDK 17"**
3. Download **Windows x64** version

---

## Step 2: Install Java 17

1. **Run the downloaded installer** (e.g., `OpenJDK17U-jdk_x64_windows_hotspot_17.0.x_x64.msi`)
2. **Follow the installation wizard**
3. **Note the installation path** (usually `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot` or `C:\Program Files\Microsoft\jdk-17.x.x`)

---

## Step 3: Find the Installation Path

After installation, find where Java 17 was installed:

```powershell
# Check common installation paths
Get-ChildItem -Path "C:\Program Files" -Filter "*jdk*17*" -Directory -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_.FullName }
Get-ChildItem -Path "C:\Program Files" -Filter "*java*17*" -Directory -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_.FullName }
Get-ChildItem -Path "C:\Program Files\Eclipse Adoptium" -Directory -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_.FullName }
Get-ChildItem -Path "C:\Program Files\Microsoft" -Filter "*jdk*17*" -Directory -ErrorAction SilentlyContinue | ForEach-Object { Write-Host $_.FullName }
```

---

## Step 4: Set the Path in gradle.properties

Once you find the path, edit `android/gradle.properties` and set:

```properties
org.gradle.java.home=C:\\Program Files\\Eclipse Adoptium\\jdk-17.x.x-hotspot
```

**Important:** 
- Use double backslashes (`\\`) in the path!
- Replace `jdk-17.x.x-hotspot` with your actual folder name

---

## Step 5: Verify Java 17

Check if it's Java 17:
```powershell
& "C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin\java.exe" -version
```

You should see something like: `openjdk version "17.0.x"`

---

## That's It!

After setting the path, try building again:
```bash
npm run android
```


