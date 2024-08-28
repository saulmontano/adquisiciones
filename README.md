Gestión de Adquisiciones - ADRES
Descripción del Proyecto

Este proyecto es una aplicación web diseñada para la gestión de adquisiciones dentro de la organización ADRES. La aplicación permite a los usuarios registrar, consultar, editar y eliminar adquisiciones, así como filtrar y visualizar el historial de cambios en cada adquisición. Se ha desarrollado una interfaz intuitiva y un backend robusto para manejar las operaciones de CRUD (Crear, Leer, Actualizar, Eliminar).
Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos y carpetas:

    index.html: Archivo principal que contiene la estructura HTML de la aplicación.
    styles.css: Hoja de estilos que define la apariencia visual de la aplicación.
    scripts.js: Archivo JavaScript que maneja la interacción del usuario y la lógica del frontend.
    server.js: Archivo principal del servidor que inicia la aplicación y configura las rutas para la API.
    adquisicionesRoutes.js: Define las rutas específicas para manejar las operaciones relacionadas con adquisiciones.
    adquisicionesModel.js: Contiene el modelo de datos de las adquisiciones.
    adquisicionesController.js: Controlador que maneja la lógica de negocio para las rutas de adquisiciones.
    app.py: Archivo Python que proporciona un backend adicional usando Flask, donde se gestionan las adquisiciones y sus filtros.
    LogoAdres.png: Imagen utilizada en la cabecera de la aplicación.

Funcionalidades

    Registro de Adquisiciones: Los usuarios pueden registrar nuevas adquisiciones especificando detalles como presupuesto, unidad administrativa, tipo de bien o servicio, cantidad, valor unitario, valor total, fecha de adquisición, proveedor y documentación.
    Consulta de Adquisiciones: Los usuarios pueden visualizar una lista de todas las adquisiciones registradas, con la posibilidad de filtrar los resultados por unidad administrativa, tipo de bien o servicio, fecha, documentación y proveedor.
    Edición de Adquisiciones: Las adquisiciones existentes pueden ser editadas para corregir o actualizar la información.
    Eliminación de Adquisiciones: Los usuarios pueden eliminar adquisiciones específicas.
    Historial de Cambios: Cada vez que una adquisición es editada, los cambios se registran en un historial que puede ser consultado posteriormente.
    Filtros Dinámicos: Los filtros se cargan dinámicamente según los datos disponibles en la base de datos.

Tecnologías Utilizadas

    Frontend:
        HTML5
        CSS3
        JavaScript

    Backend:
        Node.js
        Express.js
        Python (Flask)

    Base de Datos:
        JSON (archivo data.json como almacenamiento)

    Otras Herramientas:
        Flask-CORS: Para habilitar CORS en las rutas del backend.

Instalación y Ejecución
Requisitos Previos

    Node.js instalado en el sistema.
    Python 3.x instalado en el sistema.

Pasos para la Instalación

    Clonar el repositorio:

    bash

git clone https://github.com/tuusuario/gestion-adquisiciones.git
cd gestion-adquisiciones

    Instalar dependencias de Node.js:

    bash

    npm install

    Instalar dependencias de Python:

    bash

    pip install flask flask-cors

    Ejecutar el servidor:

    Para iniciar el servidor Node.js:

    bash

    node server.js

Para iniciar el servidor Flask:

bash

    python app.py

    Abrir la aplicación en el navegador:

    Visita http://localhost:3000 para acceder a la aplicación.

Uso de la Aplicación

    Registro de Adquisiciones: Completa el formulario en la sección "Registrar Nueva Adquisición" y haz clic en "Registrar" para guardar la adquisición.

    Aplicar Filtros: Selecciona las opciones deseadas en la sección de filtros y haz clic en "Aplicar Filtros" para refinar la búsqueda.

    Editar Adquisiciones: Haz clic en el botón "Editar" en una adquisición específica para modificar sus detalles.

    Eliminar Adquisiciones: Haz clic en el botón "Eliminar" para borrar una adquisición de la lista.

    Ver Historial de Cambios: Haz clic en "Historial" dentro de una tarjeta de adquisición para ver los cambios registrados.

Consideraciones Finales

    Seguridad: Asegúrate de ejecutar el proyecto en un entorno seguro, especialmente si vas a manejar datos sensibles.
    Escalabilidad: El proyecto está preparado para escalarse, pudiendo migrar de un almacenamiento basado en archivos JSON a una base de datos SQL si se requiere.
    Mantenimiento: El código está estructurado para facilitar futuras modificaciones y adiciones de funcionalidades.
