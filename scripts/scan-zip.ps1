Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "f:\JAIKVIK-PROJECTS\stepcable\stepcable.zip"
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

Write-Host "Scanning $zipPath for videos..."
$videos = $zip.Entries | Where-Object { $_.FullName -like "*.mp4" -or $_.FullName -like "*.webm" -or $_.FullName -like "*video*" }
foreach ($v in $videos) {
    Write-Host "Video found: $($v.FullName) ($([Math]::Round($v.Length / 1MB, 2)) MB)"
}

Write-Host "`nScanning for images in root or assets..."
$images = $zip.Entries | Where-Object { $_.FullName -like "*.jpg" -or $_.FullName -like "*.png" -or $_.FullName -like "*.jpeg" }
Write-Host "Total images found: $($images.Count)"
Write-Host "Showing first 15:"
for ($i = 0; $i -lt [Math]::Min($images.Count, 15); $i++) {
    Write-Host "- $($images[$i].FullName) ($([Math]::Round($images[$i].Length / 1KB, 1)) KB)"
}

$zip.Dispose()
