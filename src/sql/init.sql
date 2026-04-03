create database my_app;
use my_app;

create table clientes(
	id int primary key auto_increment,
	nombre varchar(50),
    email varchar(200),
    telefono varchar(20),
    estado varchar(50)
);

insert into clientes(nombre,email,telefono,estado)
values
('Julio', 'julio.martel.4561@gmail.com', '341-3157617', 'activo'),
('Sakura', 'saku.flame@gmail.com', '814-4512365', 'activo'),
('Jake', 'j4ke.784@gmail.com', '987-7812356', 'inactivo');
