<#
PowerShell helper to prepare a `docs` folder for GitHub Pages.
Run this from the `video` folder.
#>
param(
    [string]$SourceDir = $PSScriptRoot,
    [string]$DocsDir = "$PSScriptRoot\docs"
)

Write-Host "Preparing docs folder for GitHub Pages..."

if (Test-Path $DocsDir) {
    Write-Host "Removing existing docs folder..."
    Remove-Item -Recurse -Force $DocsDir
}

Write-Host "Copying files..."
New-Item -ItemType Directory -Path $DocsDir | Out-Null

# Copy HTML and mp4 files
Get-ChildItem -Path $SourceDir -Include *.html,*.mp4,*.css,*.js -File | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $DocsDir
}

Write-Host "Docs prepared at:`n$DocsDir"
Write-Host "You can now commit the docs folder and push to GitHub. If using Git LFS, ensure you track '*.mp4' before committing."