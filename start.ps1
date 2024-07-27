$appName = "TaxiAllDrive"
$version = "2.2.1"   
Clear-Host
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "           $appName" -ForegroundColor Cyan
Write-Host "           Версия $version" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Yellow

$confirmation = Read-Host "WARNING: Этот скрипт запустит Docker Compose и откроет браузер. Вы хотите продолжить? (Y/N)"
if ($confirmation -ne 'Y' -and $confirmation -ne 'y') {
    Write-Host "Операция была отменена пользователем."
    exit
}

Clear-Host
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "Загрузка..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Yellow

# Execute Docker Compose command
docker-compose -f ./taxi-manger-app/docker-compose.yaml up  -d --build 

# Wait for a few seconds to allow the container to start

Start-Sleep -Seconds 5

# Open default browser to localhost:80
Start-Process "http://localhost:80"
Clear-Host
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "Приложение успешно запущено. Хорошей вам работы!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Yellow