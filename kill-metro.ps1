# PowerShell script to kill Metro bundler on port 8081
$port = 8081
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    Write-Host "Found process $process using port $port"
    Stop-Process -Id $process -Force
    Write-Host "Metro bundler stopped successfully"
} else {
    Write-Host "No process found using port $port"
}

