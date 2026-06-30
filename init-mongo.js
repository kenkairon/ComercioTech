// ==========================================================
// Proyecto: ComercioTech
// Inicialización automática de MongoDB
// ==========================================================

// Cambiar a la base de datos del proyecto
db = db.getSiblingDB("comerciotech");

// ==========================================================
// CREACIÓN DE USUARIOS
// ==========================================================

// Usuario para la aplicación
db.createUser({
    user: "app_user",
    pwd: "App123*",
    roles: [
        {
            role: "readWrite",
            db: "comerciotech"
        }
    ]
});

// Usuario auditor (solo lectura)
db.createUser({
    user: "auditor_user",
    pwd: "Audit123*",
    roles: [
        {
            role: "read",
            db: "comerciotech"
        }
    ]
});

// Usuario monitor
db.createUser({
    user: "monitor_user",
    pwd: "Monitor123*",
    roles: [
        {
            role: "clusterMonitor",
            db: "admin"
        }
    ]
});

// ==========================================================
// COLECCIÓN CLIENTES
// ==========================================================

db.createCollection("clientes", {

    validator: {

        $jsonSchema: {

            bsonType: "object",

            required: [
                "nombre",
                "correo",
                "telefono"
            ],

            properties: {

                nombre: {
                    bsonType: "string",
                    description: "Nombre del cliente"
                },

                correo: {
                    bsonType: "string",
                    description: "Correo electrónico"
                },

                telefono: {
                    bsonType: "string",
                    description: "Número telefónico"
                }

            }

        }

    }

});

// ==========================================================
// COLECCIÓN PRODUCTOS
// ==========================================================

db.createCollection("productos", {

    validator: {

        $jsonSchema: {

            bsonType: "object",

            required: [
                "nombre",
                "precio",
                "stock"
            ],

            properties: {

                nombre: {
                    bsonType: "string"
                },

                precio: {
                    bsonType: "double"
                },

                stock: {
                    bsonType: "int",
                    minimum: 0
                }

            }

        }

    }

});

// ==========================================================
// COLECCIÓN PEDIDOS
// ==========================================================

db.createCollection("pedidos", {

    validator: {

        $jsonSchema: {

            bsonType: "object",

            required: [

                "cliente_id",

                "producto_id",

                "cantidad",

                "fecha"

            ],

            properties: {

                cliente_id: {
                    bsonType: "objectId"
                },

                producto_id: {
                    bsonType: "objectId"
                },

                cantidad: {
                    bsonType: "int",
                    minimum: 1
                },

                fecha: {
                    bsonType: "date"
                }

            }

        }

    }

});

// ==========================================================
// ÍNDICES
// ==========================================================

// Clientes
db.clientes.createIndex(
    { correo: 1 },
    { unique: true }
);

// Productos
db.productos.createIndex(
    { nombre: 1 }
);

// Pedidos
db.pedidos.createIndex(
    { cliente_id: 1 }
);

db.pedidos.createIndex(
    { producto_id: 1 }
);

db.pedidos.createIndex(
    { fecha: -1 }
);

// ==========================================================
// MENSAJE FINAL
// ==========================================================

print("========================================");
print("Base de datos ComercioTech creada.");
print("Usuarios creados.");
print("Colecciones creadas.");
print("Validaciones aplicadas.");
print("Índices creados.");
print("========================================");