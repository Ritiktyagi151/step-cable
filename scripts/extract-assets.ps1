Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = "f:\JAIKVIK-PROJECTS\stepcable\stepcable.zip"
$destDir = "f:\JAIKVIK-PROJECTS\stepcable\stepcable\public"

if (-not (Test-Path $zipPath)) {
    Write-Error "Backup file $zipPath does not exist!"
    exit
}

Write-Host "Opening backup file: $zipPath..."
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

$imgExts = @('.png', '.jpg', '.jpeg', '.gif', '.svg')
$vidExts = @('.mp4', '.webm', '.mov', '.avi')

Write-Host "Extracting image and video assets to $destDir..."
$count = 0

foreach ($entry in $zip.Entries) {
    # Skip directories
    if ($entry.FullName.EndsWith("/")) { continue }
    
    $ext = [System.IO.Path]::GetExtension($entry.FullName).ToLower()
    if ($imgExts -contains $ext -or $vidExts -contains $ext) {
        $targetFile = Join-Path $destDir $entry.FullName
        $targetDir = [System.IO.Path]::GetDirectoryName($targetFile)
        
        # Create folder if it doesn't exist
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
        }
        
        # Extract entry
        [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $targetFile, $true)
        Write-Host "Extracted: $($entry.FullName) -> $targetFile"
        $count++
    }
}

$zip.Dispose()
Write-Host "Done! Extracted $count assets to public folder."
