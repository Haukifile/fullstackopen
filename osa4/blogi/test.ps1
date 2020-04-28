Write-Host "Setting environment variables...";
$env:NODE_ENV="test"
Write-Host "Initializing process..."

npm run test