<#
PowerShell helper to download 12 Jyotirlinga images into public/assets/jyotirlinga/

USAGE:
1) Edit the $images array below and set the `url` for each `slug` (URLs must be direct image file links, e.g. ending with .jpg or .png).
2) Run this script in PowerShell from the project root:
   .\scripts\download_jyotirlinga_images.ps1

LICENSE / NOTES:
- Only download images you are allowed to use. Prefer Wikimedia Commons or your own photos.
- This script does not check license terms; verify each image's license before using in production.
#>

$projectRoot = Split-Path -Parent $PSCommandPath
$destDir = Join-Path $projectRoot 'public\assets\jyotirlinga'
if (-not (Test-Path $destDir)) { New-Item -Path $destDir -ItemType Directory | Out-Null }

# Edit these URLs to point to real images (direct links ending in .jpg/.png).
$images = @(
    @{ slug = 'somnath';        url = 'https://source.unsplash.com/featured/900x1200?somnath,temple,india' },
    @{ slug = 'mallikarjuna';   url = 'https://source.unsplash.com/featured/900x1200?mallikarjuna,temple,india' },
    @{ slug = 'mahakaleshwar'; url = 'https://source.unsplash.com/featured/900x1200?mahakaleshwar,temple,india' },
    @{ slug = 'omkareshwar';    url = 'https://source.unsplash.com/featured/900x1200?omkareshwar,temple,india' },
    @{ slug = 'kedarnath';      url = 'https://source.unsplash.com/featured/900x1200?kedarnath,temple,india' },
    @{ slug = 'bhimashankar';   url = 'https://source.unsplash.com/featured/900x1200?bhimashankar,temple,india' },
    @{ slug = 'vishwanath';     url = 'https://source.unsplash.com/featured/900x1200?kashi%20vishwanath,temple,india' },
    @{ slug = 'trimbakeshwar';  url = 'https://source.unsplash.com/featured/900x1200?trimbakeshwar,temple,india' },
    @{ slug = 'baidyanath';     url = 'https://source.unsplash.com/featured/900x1200?baidyanath,temple,india' },
    @{ slug = 'nageshwar';      url = 'https://source.unsplash.com/featured/900x1200?nageshwar,temple,india' },
    @{ slug = 'rameshwaram';    url = 'https://source.unsplash.com/featured/900x1200?rameshwaram,temple,india' },
    @{ slug = 'grishneshwar';   url = 'https://source.unsplash.com/featured/900x1200?grishneshwar,temple,india' }
)

Write-Host "Downloading images into: $destDir`n" -ForegroundColor Cyan

foreach ($img in $images) {
    $slug = $img.slug
    $url = $img.url
    if ([string]::IsNullOrWhiteSpace($url)) {
        Write-Host "Skipping $slug — no URL provided" -ForegroundColor Yellow
        continue
    }

    $ext = [System.IO.Path]::GetExtension($url)
    if ([string]::IsNullOrWhiteSpace($ext)) { $ext = '.jpg' }

    $outFile = Join-Path $destDir ($slug + $ext)
    try {
        Write-Host "Downloading $slug from $url -> $outFile" -ForegroundColor Green
        Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing -ErrorAction Stop
    } catch {
        Write-Host "Failed to download $slug" -ForegroundColor Red
        Write-Host ($_ | Out-String) -ForegroundColor DarkRed
    }
}

Write-Host "`nDone. Verify files in $destDir" -ForegroundColor Cyan
