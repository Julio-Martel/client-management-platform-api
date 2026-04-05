USE client_management;

/*INSERT INTO clientes(nombre,email,telefono,rol) VALUES
('Julio', 'julio.martel.4561@gmail.com', '341-3157617', 'Admin');*/

ALTER TABLE Clientes ADD rol VARCHAR(50);

select * from clientes;