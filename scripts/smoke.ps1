param(
  [int]$Port = 3002,
  [int]$StartupTimeoutSec = 45
)

$ErrorActionPreference = "Stop"

function Test-Status {
  param(
    [string]$Url,
    [int[]]$Expected
  )

  $code = & curl.exe -s -o NUL -w "%{http_code}" "$Url"
  $status = [int]$code
  $ok = $Expected -contains $status
  $marker = if ($ok) { "PASS" } else { "FAIL" }
  Write-Host ("[{0}] {1} -> {2}" -f $marker, $Url, $status)

  return $ok
}

$root = "http://localhost:$Port"
$serverProcess = $null

try {
  Write-Host "[INFO] Starting dev server on port $Port..."
  $serverProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run", "dev", "--", "-p", "$Port" -PassThru

  $ready = $false
  $deadline = (Get-Date).AddSeconds($StartupTimeoutSec)
  while ((Get-Date) -lt $deadline) {
    try {
      $status = & curl.exe -s -o NUL -w "%{http_code}" "$root/"
      if ([int]$status -ge 200) {
        $ready = $true
        break
      }
    } catch {
      Start-Sleep -Milliseconds 800
    }
    Start-Sleep -Milliseconds 800
  }

  if (-not $ready) {
    throw "Server did not become ready within $StartupTimeoutSec seconds."
  }

  Write-Host "[INFO] Running smoke checks..."

  $checks = @(
    @{ url = "$root/"; expected = @(200) },
    @{ url = "$root/magaza"; expected = @(200) },
    @{ url = "$root/liderlik"; expected = @(200) },
    @{ url = "$root/iletisim"; expected = @(200) },
    @{ url = "$root/giris"; expected = @(200) },
    @{ url = "$root/api/liderlik?mode=genel"; expected = @(200) },
    @{ url = "$root/api/magaza/urunler"; expected = @(200) },
    @{ url = "$root/api/ceza-sorgula?username=mvpuser"; expected = @(200) },
    @{ url = "$root/hesabim"; expected = @(302, 307, 308) }
  )

  $allPassed = $true
  foreach ($check in $checks) {
    $passed = Test-Status -Url $check.url -Expected $check.expected
    if (-not $passed) {
      $allPassed = $false
    }
  }

  if (-not $allPassed) {
    throw "One or more smoke checks failed."
  }

  Write-Host "[INFO] Smoke checks completed successfully."
  exit 0
}
finally {
  if ($serverProcess -and -not $serverProcess.HasExited) {
    Write-Host "[INFO] Stopping dev server..."
    Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
  }
}

