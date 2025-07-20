# DWFS_C18_proyecto7_front - Aplicación para cervecería

Este es un proyecto desarrollado como parte del curso de Desarrollo Web Full Stack (DWFS), Cohort 18 de UDD. Construido con **React 19**, **Vite**, **Material UI (MUI)** y **Axios** entrega un aplicativo completo desde la presentación de los productos, venta de estos hasta la administración ellos y los usuarios.


## 🛠 Tecnologías usadas

1. 📦 Dependencias
    - React 19
    - React DOM
    - React Router DOM v7
    - Axios
    - MUI (Material UI)
    - MUI Icons Material
    - @emotion/react
    - @emotion/styled
    - @mui/x-charts
    - @mui/x-data-grid
    - @mui/x-data-grid-generator

2. 🛠️ Dependencias de Desarrollo
    - Vite
    - @vitejs/plugin-react-swc
    - ESLint
    - @eslint/js
    - eslint-plugin-react-hooks
    - eslint-plugin-react-refresh
    - globals
    - @types/react
    - @types/react-dom


## 🧭 Navegación
El proyecto sigue la siguiente estructura de rutas:

- / – Página principal (Inicio)
- /inicio-sesion – Página de inicio de sesión (protegida con AuthRoute)
- /registro – Registro de nuevos usuarios
- /perfil – Perfil del usuario (protegida con PrivateRoute)
- /carrito – Carrito de compras y checkout (protegida)
- /admin-usuarios – Panel de administración de usuarios (protegida)
- /registrar-producto – Formulario para crear producto nuevo (protegida)
- /admin-productos – Panel de administración de productos (protegida)
- /editar-producto – Página para editar productos (protegida)
- /productos – Catálogo general de productos
- /producto/:slug – Detalle individual del producto
- /cerveceriasTipos – Tipos de cervecerías
- /contacto – Página de contacto
- /nosotros – Página "Sobre nosotros"
- /pago-exitoso – Página de confirmación de pago
- /pago-cancelado – Página de cancelación de pago
- * – Página 404 (no encontrada)

## ⚠️ Manejador de errores
El componente `ErrorBoundary` encapsula los componentes principales para capturar errores de forma segura.

## Estructura del proyecto
- El proyecto sigue una arquitectura modular separando componentes, hooks, vistas (pages) y config axios para conectarse a la DB.
- Se hace uso de rutas anidadas con un layout común (Layout.jsx) y navegación (Navbar.jsx).
- Se usa un ErrorBoundary para mejorar la experiencia de usuario en caso de fallos de renderizado.

<img width="233" height="1388" alt="image" src="https://github.com/user-attachments/assets/22c09244-6498-44d1-b90e-a6bc9da85329" />


## Despliegue
El proyecto se encuentra desplegado en Netlify
https://hopyhour.netlify.app/

<img width="1915" height="906" alt="image" src="https://github.com/user-attachments/assets/23833b4b-414a-4b5b-86b9-6852d6819c96" />


## Instalación

1. Clonar el repositorio
2. Ejecutar `npm install` para instalar las dependencias
3. Crear un archivo .env con las variables para las apis usadas
    - VITE_BACKEND_URL=`https://dwfs-c18-proyecto7-back.onrender.com/api`
4. Ejecutar `npm run dev` para iniciar el servidor de desarrollo

## Scripts disponibles
- `npm run dev` - Inicia el servidor de desarrollo Vite
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta ESLint para verificar el código
- `npm run preview` - Previsualiza la versión de producción


## Accesos del aplicativo

<img width="1211" height="376" alt="image" src="https://github.com/user-attachments/assets/dc4dbf1b-65d4-4eb9-8a49-321ff6d594e9" />

1. Usuario
    - Al ingresar con el email y contraseña verá las opciones comunes:
        - `Perfil`
        - `Carrito` 
        - `Cerrar sesión`
    - Se dejó un usuario registrado:
        - usuario: `juan.perez@email.com`
        - password: `123456`

<img width="235" height="846" alt="image" src="https://github.com/user-attachments/assets/d58496ba-0961-411d-af89-786e245f5e1f" />

2. Administrador
    - Al ingresar con el email y contraseña verá opciones adicionales a las del usuario:
        - `Lista de usuarios` permite ver los usuarios registrados y asignarle o quitarle permisos de `Administrador`
        - `Nuevo producto` permite registrar un nuevo producto en el sitio
        - `Lista de productos` permite editar y eliminar productos del sitio
    - Se dejó un usuario administrador registrado:
        - usuario: `admin@admin.cl`
        - password: `4Dm1N.072025`

<img width="234" height="849" alt="image" src="https://github.com/user-attachments/assets/7d81a13d-14e4-4306-8fe9-1ba974007f66" />


## Conclusión
Este proyecto representa una solución frontend moderna y eficiente para un e-commerce cervecero por su navegación dinámica se logró construir una interfaz intuitiva, modular y escalable.

La integración de manejo de errores con ErrorBoundary, y una arquitectura basada en rutas bien definidas permite que el proyecto sea fácilmente mantenible y escalable.

Este trabajo refleja no solo la aplicación de conocimientos técnicos adquiridos, sino también la capacidad de desarrollar una `SPA` funcional centrada en la experiencia del usuario y buenas prácticas de desarrollo.
