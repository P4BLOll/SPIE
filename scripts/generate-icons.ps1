Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\Pablo\SPIE\assets\logo.png"
$baseDir = "c:\Users\Pablo\SPIE\android\app\src\main\res"

$densities = @(
    @{ folder = "mipmap-mdpi"; size = 48; fgSize = 108 },
    @{ folder = "mipmap-hdpi"; size = 72; fgSize = 162 },
    @{ folder = "mipmap-xhdpi"; size = 96; fgSize = 216 },
    @{ folder = "mipmap-xxhdpi"; size = 144; fgSize = 324 },
    @{ folder = "mipmap-xxxhdpi"; size = 192; fgSize = 432 }
)

if (-not (Test-Path $srcPath)) {
    Write-Error "Source image not found at $srcPath"
    exit 1
}

$srcImg = [System.Drawing.Image]::FromFile($srcPath)

foreach ($d in $densities) {
    $targetDir = Join-Path $baseDir $d.folder
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir | Out-Null
    }

    # 1. ic_launcher (standard)
    $bmp = New-Object System.Drawing.Bitmap($d.size, $d.size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($srcImg, 0, 0, $d.size, $d.size)
    $g.Dispose()
    
    $bmp.Save((Join-Path $targetDir "ic_launcher.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Save((Join-Path $targetDir "ic_launcher_round.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    # 2. ic_launcher_foreground (centered with padding for adaptive icon)
    $fgBmp = New-Object System.Drawing.Bitmap($d.fgSize, $d.fgSize)
    $gFg = [System.Drawing.Graphics]::FromImage($fgBmp)
    $gFg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gFg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $gFg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $contentSize = [int]($d.fgSize * 0.72)
    $offset = [int](($d.fgSize - $contentSize) / 2)
    $gFg.DrawImage($srcImg, $offset, $offset, $contentSize, $contentSize)
    $gFg.Dispose()

    $fgBmp.Save((Join-Path $targetDir "ic_launcher_foreground.png"), [System.Drawing.Imaging.ImageFormat]::Png)
    $fgBmp.Dispose()

    # Remove older webp files if present so Android uses the new PNGs
    Remove-Item (Join-Path $targetDir "ic_launcher.webp") -ErrorAction SilentlyContinue
    Remove-Item (Join-Path $targetDir "ic_launcher_round.webp") -ErrorAction SilentlyContinue
    Remove-Item (Join-Path $targetDir "ic_launcher_foreground.webp") -ErrorAction SilentlyContinue
    
    Write-Host "Generated icons for $($d.folder)"
}

$srcImg.Dispose()
Write-Host "All Android icons generated successfully!"
