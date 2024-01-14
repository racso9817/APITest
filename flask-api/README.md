# API Flask
- Esta es un API realizada con Flask
- Esta API tiene un archivo principal llamado api.py que contiene los endpoints
- El archivo payment.py contiene las funciones para obtener el link de pagos de Paypal
- La función ```paypal_payment``` devuelve un diccionario que contiene el link de pagos.
- La función ```verify_payment``` devuelve un diccionario que revisa si el link de pagos sigue siendo válido después del tiempo especificado por el usuario en el app de angular.
- El api utiliza JWT como medida de seguridad. La única petición que no pide el token de seguridad es login, ya que esta solo hace el inicio de sesión.
- NO se ha creado ninguna base de datos para esto, solo se tienen valores quemados por defecto.
- El usuario es admin y la contraseña es admin