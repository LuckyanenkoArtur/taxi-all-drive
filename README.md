# entertainment-plus on WINDOWS 10:

## Requirenments:

1. Docker Desktop - чтобы развернуть структуру приложения
2. Postgree PG Admin - для управления базами данных и загрузки стурктуры БД

## Deployment

1. Запускаем Docker Desktop
2. Преходим в папку entertainment-plus-
3. Запускаем в cmd или в powershell комнду: docker-compose up -d --build
4. Запускаем PG admin
5. Добавляем наш сервер: Register -> Server
   hostname: localhost
   port: 5432
   Пользователь: postgres
   Пароль: #15Gjcn3128Uh.#
6. Идем Servers -> entertaiment-db -> Databases -> entertaiment-db (тут правой кнопкой мыши и контекстном меню выбираем "Restore...")

7. Выбираем "ready-stage-bd-29-05-2024.sql" файл в "C:\Users\lukyanena\Desktop\entertainment-plus-\backend\db"

## Addresses

localhost:80 - Web UI
localhost:5000 - BackendServer
localhost:5432 - PostGR DB
