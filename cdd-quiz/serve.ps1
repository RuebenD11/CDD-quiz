# Minimal static file server for previewing the CDD quiz (no node/python needed).
param([int]$Port = 8765)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$mime = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8";
  ".js" = "application/javascript; charset=utf-8"; ".json" = "application/json; charset=utf-8";
  ".svg" = "image/svg+xml"; ".ico" = "image/x-icon"; ".png" = "image/png"; ".woff2" = "font/woff2"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Output "CDD quiz server listening on http://localhost:$Port/ (root: $root)"

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $path = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }
    $file = Join-Path $root ($path.TrimStart("/"))
    if (Test-Path $file -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      $ct = $mime[$ext]; if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ctx.Response.ContentType = $ct
      $ctx.Response.Headers.Add("Cache-Control", "no-cache")
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.OutputStream.Close()
  } catch { }
}
