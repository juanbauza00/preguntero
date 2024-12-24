# Preguntero

Esta aplicación permite gestionar y generar preguntas a partir de un archivo Excel (.xlsx). La aplicación está desarrollada con Angular 18 y proporciona una interfaz para seleccionar un archivo de preguntas, configurar la generación de preguntas y visualizar las preguntas generadas.

## Requisitos del archivo

El archivo seleccionado debe ser de tipo `.xlsx` y debe contener la siguiente estructura en la primera fila:

- Columna 1: `nro` (Número de la pregunta)
- Columna 2: `pregunta` (Texto de la pregunta)
- Columna 3: `unidad` (Unidad a la que pertenece la pregunta)

## Funcionalidades

- **Seleccionar archivo**: Permite seleccionar un archivo `.xlsx` con las preguntas.
- **Configurar generación de preguntas**: Permite configurar la cantidad de preguntas y las unidades a incluir.
- **Generar preguntas**: Genera preguntas basadas en la configuración seleccionada.
- **Visualizar preguntas**: Muestra las preguntas generadas en una tabla.
- **Cambiar archivo**: Permite cambiar el archivo de preguntas seleccionado.

## Instrucciones

1. **Seleccionar archivo**: Al iniciar la aplicación, seleccione un archivo `.xlsx` con la estructura mencionada.
2. **Configurar**: Configure la cantidad de preguntas y las unidades a incluir.
3. **Generar**: Haga clic en "Generar preguntas" para ver las preguntas generadas.
4. **Cambiar archivo**: Si desea cambiar el archivo, haga clic en "Cambiar preguntero" y seleccione un nuevo archivo.

## Desarrollo
Antes de ejecutar por primera vez, ejecute `npm install` para instalar todos los paquetes y dependencias necesarias en la carpeta local `node_modules` del proyecto.

Para ejecutar el servidor de desarrollo, ejecute `ng serve -o` o en su defecto `ng serve` y navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos fuente.

Para obtener más ayuda sobre Angular CLI, use `ng help` o consulte la [documentación de Angular CLI](https://angular.dev/tools/cli).

## Contacto

Para cualquier consulta o problema, por favor contacte a `juanbauza00` (Usuario de GitHub).
