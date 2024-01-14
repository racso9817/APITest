# Express API
- Esta API fue hecha con node y express
- El API contiene un archivo llamado server.ts en el cual se encuentra toda la estructura del API
- Se hizo un solo endpoint llamado firmar-pdf, el cual se encarga de firmar y devolver el PDF firmado usando la librería @signpdf
- La función prepararPDF() se usa para devolver un PDF que tenga una región donde firmar, porque sino la librería causará un error al intentar firmar el PDF
- Los archivos enviados a través del app de angular son manejados como Buffer
- El API funciona con el pdf que se encuentra dentro de este proyecto, debido a que se genera un error con la librería @signpdf al usar archivos que tengan más contenido. Esto no se ha podido corregir debido al tiempo.