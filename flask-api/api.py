from flask import Flask, jsonify, request, session
from flask_restful import Resource, Api
from flask_httpauth import HTTPBasicAuth
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, unset_jwt_cookies
from flask_cors import CORS
import paypalrestsdk
from payment import *

app = Flask(__name__)
CORS(app)
api = Api(app)
app.secret_key = 'hola'

app.config["JWT_SECRET_KEY"] = "hola2"
jwt = JWTManager(app)

paypalrestsdk.configure({
    "mode": "sandbox", # Usa "sandbox" para pruebas o "live" para producción
    "client_id": "AVGyXXPw8f7-Z64rqlif-4kpk9uQ-x5INXE5rcoC6ojCd0sXPIVOB7Oj78-BNgRnXP4n9r-upQeketqA",
    "client_secret": "EIjVSlmsmpEOqwsk2YTTXdi5_HEyvoH6qYt6HbDoeD9d2s2VwjmmlcB3p2jML6T6eg89FE5TPLJF4yja"
})

# global variables username & password
username = 'admin'
password = 'admin'
auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(usr, pswd):
    if usr == username and pswd == password:
        return True
    return False

class Login(Resource):
    def post(self):
        usr = request.json.get("username", None)
        pswd = request.json.get("password", None)

        access = verify_password(usr, pswd)
        if access:
            session['logged_in'] = True
            access_token = create_access_token(identity=username)
            return jsonify({"msg": "You are logged in", "access_token": access_token, "status": True})
        else:
            return jsonify({"msg": "Usuario o contraseña incorrectos", "status": False})

class Logout(Resource):
    @jwt_required()
    def post(self):
        response = jsonify({"msg": "You are logged out","status": True})
        session.pop('logged_in', None)
        unset_jwt_cookies(response)        
        return response
    
class Payment(Resource):
    @jwt_required()
    def post(self):
        validity_time = request.json.get("validity_time", None)
        print(validity_time)
        payment = paypal_payment()    
        payment_verify = verify_payment(payment['payment_id'], int(validity_time))
        # unit los dos diccionarios en uno solo
        if payment_verify['valid']:
            payment = {**payment, **payment_verify}
        else:
            payment = payment_verify
        return jsonify(payment)

api.add_resource(Login, '/login', methods=['POST'])
api.add_resource(Logout, '/logout', methods=['POST'])
api.add_resource(Payment, '/payment', methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)