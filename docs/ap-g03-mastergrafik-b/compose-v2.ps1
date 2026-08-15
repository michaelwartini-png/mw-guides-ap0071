Add-Type -AssemblyName System.Drawing

$docs = Split-Path -Parent $MyInvocation.MyCommand.Path
$srcPath = Join-Path $docs "mastergrafik-b-v1.png"
$outPath = Join-Path $docs "mastergrafik-b-v2.1.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$scale = 2
$W = $src.Width * $scale
$H = $src.Height * $scale
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $W, $H))

$ink = [System.Drawing.Color]::FromArgb(22, 32, 58)
$inkSoft = [System.Drawing.Color]::FromArgb(55, 68, 92)
$white = [System.Drawing.Color]::FromArgb(254, 254, 254)
$iboxBg = [System.Drawing.Color]::FromArgb(247, 248, 252)
$cardBg = [System.Drawing.Color]::FromArgb(255, 255, 255)
$s4Bg = [System.Drawing.Color]::FromArgb(255, 255, 255)
$brushInk = New-Object System.Drawing.SolidBrush $ink
$brushSoft = New-Object System.Drawing.SolidBrush $inkSoft

function Cover([int]$x, [int]$y, [int]$w, [int]$h, [System.Drawing.Color]$c) {
  $br = New-Object System.Drawing.SolidBrush $c
  $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $g.FillRectangle($br, $x, $y, $w, $h)
  $g.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
  $br.Dispose()
}

function DrawText([string]$text, [int]$x, [int]$y, [int]$w, [int]$h, [int]$size, [bool]$bold, $brush, [System.Drawing.StringAlignment]$align) {
  $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
  $font = New-Object System.Drawing.Font("Segoe UI", [float]$size, $style, [System.Drawing.GraphicsUnit]::Pixel)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = $align
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $fmt.Trimming = [System.Drawing.StringTrimming]::None
  $rect = New-Object System.Drawing.RectangleF $x, $y, $w, $h
  $g.DrawString($text, $font, $brush, $rect, $fmt)
  $font.Dispose()
  $fmt.Dispose()
}

function DrawTop([string]$text, [int]$x, [int]$y, [int]$w, [int]$h, [int]$size, [bool]$bold, $brush, [System.Drawing.StringAlignment]$align) {
  $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
  $font = New-Object System.Drawing.Font("Segoe UI", [float]$size, $style, [System.Drawing.GraphicsUnit]::Pixel)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = $align
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Near
  $rect = New-Object System.Drawing.RectangleF $x, $y, $w, $h
  $g.DrawString($text, $font, $brush, $rect, $fmt)
  $font.Dispose()
  $fmt.Dispose()
}

$t = Get-Content -Raw -Encoding UTF8 (Join-Path $docs "v2-texts.json") | ConvertFrom-Json

# --- 1. Subtitle ---
Cover 80 76 1204 48 $white
DrawText $t.subtitle 80 76 1204 48 18 $false $brushInk ([System.Drawing.StringAlignment]::Center)

# --- 3. Infobox list (keep title, numbers, icons, legend) ---
Cover 1024 922 255 42 $iboxBg
DrawText $t.step3_1 1024 922 250 42 15 $true $brushInk ([System.Drawing.StringAlignment]::Near)

Cover 1024 962 275 42 $iboxBg
DrawText $t.step3_2 1024 962 255 42 15 $true $brushInk ([System.Drawing.StringAlignment]::Near)

Cover 1024 1002 318 82 $iboxBg
DrawTop $t.step3_3 1024 1006 308 74 15 $true $brushInk ([System.Drawing.StringAlignment]::Near)

# --- 3. Hint above selected experiences ---
Cover 280 1116 700 48 $white
DrawText $t.hint 280 1116 700 48 15 $true $brushInk ([System.Drawing.StringAlignment]::Center)

# --- 4. Title + description ---
Cover 96 1264 236 110 $s4Bg
DrawTop $t.step4_title 98 1268 230 104 18 $true $brushInk ([System.Drawing.StringAlignment]::Near)

Cover 24 1374 300 130 $s4Bg
DrawTop $t.step4_desc 26 1376 296 126 14 $false $brushSoft ([System.Drawing.StringAlignment]::Near)

# --- 2. Premium-Guide hint on trip cards (keep stars) ---
function PremiumHint([int]$x, [int]$y) {
  Cover ($x + 4) ($y + 226) 206 40 $cardBg
  DrawText $t.premium_hint ($x + 6) ($y + 226) 176 40 11 $true $brushSoft ([System.Drawing.StringAlignment]::Near)
}
PremiumHint 588 516
PremiumHint 820 516
PremiumHint 1052 516

# --- 5. Title (Reisepaket → digitale Reisebegleiter) ---
Cover 76 1596 270 130 $s4Bg
DrawTop $t.step5_title 78 1600 264 124 17 $true $brushInk ([System.Drawing.StringAlignment]::Near)

Cover 330 1604 560 72 $white
DrawTop $t.step5_grid 330 1608 560 36 15 $true $brushInk ([System.Drawing.StringAlignment]::Near)

# --- 5. Product cards (3 products + Handout-Bestandteile) ---
function CardText([int]$x, [int]$y, [string]$title, [string]$desc) {
  Cover ($x + 4) ($y + 100) 104 128 $cardBg
  DrawTop $title ($x + 4) ($y + 100) 104 48 11 $true $brushInk ([System.Drawing.StringAlignment]::Center)
  DrawTop $desc ($x + 4) ($y + 148) 104 80 10 $false $brushSoft ([System.Drawing.StringAlignment]::Center)
}

# original cards ~ 168+58*n, 818  → 2x
$c1x = 336; $cy = 1636
$stride = 116
CardText $c1x $cy $t.c1_title $t.c1_desc
CardText ($c1x + 1 * $stride) $cy $t.c2_title $t.c2_desc
CardText ($c1x + 2 * $stride) $cy $t.c3_title $t.c3_desc
CardText ($c1x + 3 * $stride) $cy $t.c4_title $t.c4_desc
CardText ($c1x + 4 * $stride) $cy $t.c5_title $t.c5_desc
CardText ($c1x + 5 * $stride) $cy $t.c6_title $t.c6_desc

# Card 6 tag: Premium → Optional (clone existing Optional pill from step 4)
Cover 910 1864 124 56 $cardBg
$optDst = New-Object System.Drawing.Rectangle 918, 1872, 108, 40
$optSrc = New-Object System.Drawing.Rectangle 82, 756, 80, 32
$g.DrawImage($src, $optDst, $optSrc, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$src.Dispose()
$brushInk.Dispose()
$brushSoft.Dispose()
Write-Output "wrote $outPath"
