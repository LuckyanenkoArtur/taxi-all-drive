Clear-Host
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "Завершение работы..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Yellow
# Execute Docker Compose command
docker-compose -f ./taxi-manger-app/docker-compose.yaml down -v

# Wait for a few seconds to allow the container to start
Start-Sleep -Seconds 5

Clear-Host
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "Приложение было успешно закрыта. Спасибо, что выбрали нас!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Yellow
