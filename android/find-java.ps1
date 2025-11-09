# Script to find Java 17 and set it in gradle.properties

$javaPaths = @(
    "$env:ProgramFiles\Android\Android Studio\jbr",
    "$env:LOCALAPPDATA\Programs\Android\Android Studio\jbr",
    "$env:ProgramFiles\Android\Android Studio\jbr-17",
    "$env:LOCALAPPDATA\Programs\Android\Android Studio\jbr-17",
    "C:\Program Files\Android\Android Studio\jbr",
    "C:\Program Files\Android\Android Studio\jbr-17"
)

$foundJava = $null

foreach ($path in $javaPaths) {
    if (Test-Path $path) {
        if (Test-Path "$path\bin\java.exe") {
            try {
                $version = & "$path\bin\java.exe" -version 2>&1 | Out-String
                if ($version -match "version.*17" -or $version -match "17\.") {
                    $foundJava = $path
                    break
                }
            } catch {
                # Continue searching
            }
        }
    }
}

if ($foundJava) {
    Write-Host "Found Java 17 at: $foundJava"
    $gradleProps = Get-Content "gradle.properties" -Raw
    $javaHomeLine = "org.gradle.java.home=" + ($foundJava -replace '\\', '\\')
    if ($gradleProps -match "org\.gradle\.java\.home=") {
        $gradleProps = $gradleProps -replace "org\.gradle\.java\.home=.*", $javaHomeLine
    } else {
        $gradleProps += "`n$javaHomeLine"
    }
    Set-Content "gradle.properties" $gradleProps
    Write-Host "Updated gradle.properties with Java 17 path"
} else {
    Write-Host "Java 17 not found. Please set it manually in gradle.properties"
}


