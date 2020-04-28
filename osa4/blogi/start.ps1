Write-Host "Setting environment variables...";
$env:NODE_ENV="development"
$env:SECRET="hahaahahaa"
Write-Host "Initializing process..."

npm run dev