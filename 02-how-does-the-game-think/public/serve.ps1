# Serves this folder on http://localhost and opens the slides in the default browser.
# Uses only built-in Windows PowerShell, so nothing needs to be installed.
param([switch]$NoBrowser)

$root = $PSScriptRoot
$mime = @{
  '.html' = 'text/html; charset=utf-8'; '.js' = 'application/javascript'; '.mjs' = 'application/javascript'
  '.css' = 'text/css'; '.json' = 'application/json'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'
  '.jpg' = 'image/jpeg'; '.gif' = 'image/gif'; '.ico' = 'image/x-icon'; '.woff' = 'font/woff'
  '.woff2' = 'font/woff2'; '.wasm' = 'application/wasm'; '.pdf' = 'application/pdf'
}

# Pick the first free port (kept away from Slidev's dev port 3030).
# HttpListener can bind a port another server already holds on IPv6, so probe first.
function Test-PortInUse($p) {
  try { $c = New-Object System.Net.Sockets.TcpClient; $c.Connect('localhost', $p); $c.Close(); return $true }
  catch { return $false }
}
$listener = $null
foreach ($port in 8730..8750) {
  if (Test-PortInUse $port) { continue }
  try {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    break
  } catch { $listener = $null }
}
if (-not $listener) { Write-Host 'No free port between 8730 and 8750.'; Read-Host 'Press Enter to exit'; exit 1 }

$url = "http://localhost:$port/"
Write-Host ''
Write-Host "  Slides are running at $url"
Write-Host '  Keep this window open while presenting. Close it to stop.'
Write-Host ''
if (-not $NoBrowser) { Start-Process $url }

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    $file = if ($path) { Join-Path $root $path } else { Join-Path $root 'index.html' }
    # Slide URLs like /5 or /presenter/5 are app routes, not files
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { $file = Join-Path $root 'index.html' }
    $ext = [IO.Path]::GetExtension($file).ToLower()
    $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
    $bytes = [IO.File]::ReadAllBytes($file)
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    # Browser cancelled the request; ignore
  } finally {
    $ctx.Response.Close()
  }
}
