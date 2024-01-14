# Estructura del Proyecto

- [README.md](../APITest/README.md): Project documentation and instructions.
- [express-api/](../APITest/express-api/): API made with Node.js and Express.
    - [app.js](../APITest/express-api/app.js): Main Node.js and Express script.
- [flask-api/](../APITest/flask-api/): API made with Flask.
    - [api.py](../APITest/flask-api/api.py): Main Flask script.
- [test/](../APITest/test/): Angular app for testing the APIs.

# Como ejecutar el proyecto correctamente
1. Tener instalado Docker en su computador
2. Ejecutar el comando ```docker compose up -d --build``` dentro de la ruta /APITest
3. Entrar a http://localhost:80
4. Las credenciales son usuario: admin, password: admin
5. Es importante probar el proyecto solo dentro del localhost ya que las rutas de las APIs están configuradas para funcionar dentro del entorno local

## Disclaimer
- Debido a conflictos con la librería signpdf para firmar PDFs con certificados P12, encontré dificultades debido al tiempo para hacerla funcional sin errores. Tengo un caso de éxito que es con el archivo ```attachment_1__pdf-prueba.pdf``` que se encuentra dentro del proyecto, el cual es firmado exitosamente, pero con una firma electrónica invisible. Esto se puede comprobar debido a que el archivo original y el peso del archivo firmado son diferentes. El ```pdf-firmado.pdf``` pesa más que el archivo original.