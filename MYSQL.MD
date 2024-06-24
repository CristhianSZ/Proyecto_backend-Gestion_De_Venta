Para instalar las dependencias del proyecto en la terminal se debe ejecutar

npm i

Luego para levantar el servidor

npm run dev

------------------------------------------------------------------------------------------------------------
# Peticiones: En postman o thunder client

## -Seccion productos-

Solicitar todos los productos
Metodo: get
En la url
http://localhost:3000/api/productos
En la cabecera
authorization : `token que se genero al identificarse en el login`

Crear un producto
Metodo: post
En la url
http://localhost:3000/api/productos
En el body
{
  "nombre": "Nuevo Producto",
  "descripcion": "Descripción del nuevo producto",
  "precio": 150.75,
  "categoriaId": 1,
  "proveedorId": 1
}

Modificar un producto
Metodo: put
En la url
http://localhost:3000/api/productos/`id`
En el body
{
  "nombre": "Nuevo nombre de producto",
  "descripcion": "Nueva descripción del producto",
  "precio": 199.99,
  "categoriaId": 2,
  "proveedorId": 3
}
Eliminar un producto
Metodo: put
En la url
http://localhost:3000/api/productos/`id`
En el body
{
 "id": 1
}
## -Seccion usuarios-

Registro de usuarios
    Al registrar un usuario se hashea la contraseña antes de ser guardada.

Metodo: post
Url:
http://localhost:3000/api/usuarios/register
En el body:
{
  "nombre": "Juan Perez",
  "email": "juan.perez@example.com",
  "password": "password123",
  "rol": "empleado"
}

Identificacion de usuario
    Cuando un usuario se identifica, genera un token

Metodo: post
Url:
http://localhost:3000/api/usuarios/login
En el body:
{
  "email": "juan.perez@example.com",
  "password": "password123"
}



## -Meddleware verificarToken
--PRODUCTOS---
    Cuando se hace una peticion a la ruta 
    http://localhost:3000/api/productos
        Para traer todos productos, primero verifica el token y luego sigue con traer todos los productos

Para ello debo hacer una identificacion, que generar el token , tomar el token y utilizarlo en la cabecera

Metodo: get
En la url
http://localhost:3000/api/productos
En la cabecera
authorization : `token que se genero al identificarse en el login`

--CLIENTES---
obtener clientes
Metodo: get
En la url
http://localhost:3000/api/clientes
En la cabecera
authorization : `token que se genero al identificarse en el login`


--VENTAS---
obtener una venta
Metodo: get
En la url
http://localhost:3000/api/ventas/`id`
En la cabecera
authorization : `token que se genero al identificarse en el login`

obtener todas las ventas
Metodo: get
En la url
http://localhost:3000/api/ventas/
En la cabecera
authorization : `token que se genero al identificarse en el login`


## -Seccion Clientes

Crear un cliente
Metodo: post
En la url
http://localhost:3000/api/clientes
En el body
{
  "nombre":  "nombre del cliente",
  "apellido": "apellido del cliente",
  "telefono": "3865-24120"
}

Modificar un cliente
Metodo: put
En la url
http://localhost:3000/api/clientes/`id`
En el body
{
  "nombre":  "nombre del cliente",
  "apellido": "Nuevo apellido del cliente",
  "telefono": "3865-24120"
}

eliminar un cliente
Metodo: delete
En la url
http://localhost:3000/api/clientes/`id`



## -Seccion Ventas

Crear una venta
Metodo: post
En la url
http://localhost:3000/api/ventas
En el body
{
  "fecha": "2024-06-22T00:00:00.000Z",
  "cantidad": 102,
  "total": 100.00,
  "productoId": 1,
  "clientesId": 2
}






------------------------------------------------------------------------------------------------------------







Se creo la base de datos sistema_gestion_venta

Se creo las tablas: categorias , productos , proveedores y usuarios.

creacion de las tablas

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'empleado') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Categorías
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Proveedores
CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoriaId INT,
    proveedorId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoriaId) REFERENCES categorias(id),
    FOREIGN KEY (proveedorId) REFERENCES proveedores(id)
);


CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    cantidad INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    productoId INT DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    clientesId INT DEFAULT NULL,
    KEY fk_producto (productoId),
    KEY fk_ventas_clientes (clientesId),
    CONSTRAINT fk_producto FOREIGN KEY (productoId) REFERENCES productos (id),
    CONSTRAINT fk_ventas_clientes FOREIGN KEY (clientesId) REFERENCES clientes (id)
);



CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255),
    telefono VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
