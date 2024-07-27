## Database strucuture

-- Создание таблицы "Пользователи"
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	login_time VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE
);

-- Создание таблицы "Диспетчеры"
CREATE TABLE dispatchers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	surename VARCHAR(100) NOT NULL  DEFAULT 'Отсуствует',
	position VARCHAR(255) NOT NULL,
	phone VARCHAR(20) DEFAULT 'Отсуствует',
	email VARCHAR(255)  DEFAULT 'Отсуствует',
	address VARCHAR(255)  DEFAULT 'Отсуствует',
	comment VARCHAR(255)  DEFAULT 'Отсуствует',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Создание таблицы "Клиенты"
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
	lastname VARCHAR(100) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	surename VARCHAR(100) NOT NULL DEFAULT 'Отсуствует',
	phone VARCHAR(20) NOT NULL UNIQUE,
	preferences VARCHAR(255) DEFAULT 'Отсуствует',
	status VARCHAR(255) DEFAULT 'Отсуствует',
	comment VARCHAR(255) DEFAULT 'Отсуствует'
);

-- Создание таблицы "Автомобили"
CREATE TABLE veicles (
    id SERIAL PRIMARY KEY,
	model VARCHAR(255) NOT NULL,
	color VARCHAR(100) NOT NULL,
	tech_condition VARCHAR(100) NOT NULL DEFAULT 'Отсуствует',
	fuel_type VARCHAR(50) NOT NULL,
	licence_plate VARCHAR(255) DEFAULT 'Отсуствует',
	comment VARCHAR(255) DEFAULT 'Отсуствует'
);

-- Создание таблицы "Водители"
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
	lastname VARCHAR(100) NOT NULL,
	firstname VARCHAR(100) NOT NULL,
	surename VARCHAR(100) NOT NULL DEFAULT 'Отсуствует',
	phone VARCHAR(20) DEFAULT 'Отсуствует',
	address VARCHAR(255) DEFAULT 'Отсуствует',
	driver_licence VARCHAR(255) NOT NULL UNIQUE,
	driver_licence_category VARCHAR(20) NOT NULl,
	drive_experience VARCHAR(99) NOT NULl,
	vehicle_id INTEGER NOT NULL,
	birthday VARCHAR(15) NOT NULL,
	status VARCHAR(255) DEFAULT 'Отсуствует',
	comment VARCHAR(255) DEFAULT 'Отсуствует',
	FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Создание таблицы "Расписания"
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL,
	shift_date VARCHAR(50) NOT NULL DEFAULT 'Отсуствует',
	shift_start_time VARCHAR(100) NOT NULL DEFAULT 'Отсуствует',
	shift_end_time VARCHAR(100) NOT NULL  DEFAULT 'Отсуствует',
	completed_orders INT NOT NULL DEFAULT 0 ,
	comment VARCHAR(255) DEFAULT 'Отсуствует',
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

-- Создание таблицы "Заказы"
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER NOT NULL,
	client_id INTEGER NOT NULL,
	order_time VARCHAR(25) NOT NULL,
	destination_address VARCHAR(100) NOT NULL,
	pickup_address VARCHAR(100) NOT NULL,
	status VARCHAR(50) DEFAULT 'Отсуствует',
	price INT NOT NULL DEFAULT 0,
	pay_method VARCHAR(10) DEFAULT 'Наличные',
	ride_time VARCHAR(25) DEFAULT 'Отсуствует',
	end_time VARCHAR(25) DEFAULT 'Отсуствует',
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
	FOREIGN KEY (client_id) REFERENCES clients(id)
);


-- Создание View "Клиенты"
CREATE VIEW clients_view AS
SELECT 
    c.id,
	CONCAT(c.lastname, ' ', c.firstname, ' ', c.surename) as fullname,
	c.status,
	c.phone,
	c.comment
	
FROM 
    clients c;


-- Создание View "Автомобили"
CREATE VIEW vehicles_view AS
SELECT 
    v.id,
	CONCAT(v.model, ' ', v.licence_plate) AS veichel, 
	v.model,
	v.color,
	v.tech_condition,
	v.fuel_type,
	v.licence_plate,
	v.comment
FROM 
    vehicles v;

-- Создание View "Водителя"
CREATE VIEW drivers_view AS
SELECT 
    d.id,
	CONCAT(d.lastname, ' ', d.firstname, ' ', d.surename) AS fullname,
	CONCAT(v.model, ' ', v.licence_plate) AS veichel,
	d.phone,
	d.address,
	d.driver_licence,
	d.driver_licence_category,
	d.drive_experience,
	d.birthday,
	d.status,
	d.comment
FROM 
    drivers d
JOIN 
    vehicles v ON v.id = d.vehicle_id;

-- Создание View "Аккаунт"
CREATE VIEW accounts_view AS
SELECT 
    u.id,
	d.lastname,
	d.firstname, 
	d.surename,
	d.phone,
	d.email,
	u.username,
	u.password
FROM 
    dispatchers d
JOIN 
    users u ON u.id = d.user_id;;


-- Создание View "Диспечера"
CREATE VIEW dispatchers_view AS
SELECT 
    d.id,
	d.user_id,
	CONCAT(d.lastname, ' ', d.firstname, ' ', d.surename) AS fullname,
	d.phone,
	d.email,
	d.address,
	d.comment,
	u.username
FROM 
    dispatchers d
JOIN 
    users u ON u.id = d.user_id