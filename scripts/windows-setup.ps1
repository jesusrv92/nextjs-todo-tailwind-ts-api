# PowerShell script to install prerequisites and run the app (Windows 10/11)
# Usage (from an elevated PowerShell): 
#   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
#   powershell -ExecutionPolicy Bypass -File .\scripts\windows-setup.ps1

Write-Host "=== Next.js To-Do (TS) Windows setup ==="

function Ensure-Command($name) {
  $cmd = Get-Command $name -ErrorAction SilentlyContinue
  if (-not $cmd) { return $false } else { return $true }
}

# Install Node.js LTS and Git using winget if available
$hasWinget = Ensure-Command "winget"
if ($hasWinget) {
  if (-not (Ensure-Command "node")) {
    Write-Host "Installing Node.js LTS via winget..."
    winget install -e --id OpenJS.NodeJS.LTS --silent
  } else {
    Write-Host "Node.js already installed."
  }
  if (-not (Ensure-Command "git")) {
    Write-Host "Installing Git via winget..."
    winget install -e --id Git.Git --silent
  } else {
    Write-Host "Git already installed."
  }
} else {
  Write-Host "winget not found. Please install Node.js LTS and Git manually from:"
  Write-Host " - Node: https://nodejs.org/"
  Write-Host " - Git:  https://git-scm.com/download/win"
}

# Re-load PATH for the current session just in case
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Install dependencies and run dev server
if (-not (Test-Path -Path "package.json")) {
  Write-Host "Error: Run this script from the project root (where package.json is)."
  exit 1
}

Write-Host "Installing npm dependencies..."
npm install

Write-Host "Running tests..."
npm test

Write-Host "Starting dev server on http://localhost:3000"
npm run dev
