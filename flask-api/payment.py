import paypalrestsdk
from datetime import datetime, timedelta

pagos = {}

def paypal_payment():
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {"payment_method": "paypal"},
        "redirect_urls": {
            "return_url": "http://localhost:5000/payment/execute",
            "cancel_url": "http://localhost:4200/flask"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "5.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "total": "5.00",
                "currency": "USD"
            },
            "description": "This is the payment description."
        }]
    })

    if payment.create():        
        for link in payment.links:
            if link.rel == "approval_url":
                approval_url = str(link.href)                
                pagos[payment.id]={
                    "approval_url": approval_url,
                    "created_at": datetime.now()
                }
                return {'approval_url': approval_url, 'payment_id': payment.id}
    else:        
        return {'error': payment.error}
    
def verify_payment(payment_id, validity_time):
    if payment_id in pagos:
        payment_info = pagos[payment_id]
        time_created = payment_info['created_at']    
        if datetime.now() - time_created <= timedelta(minutes=validity_time):
            return {'valid': True, 'approval_url': payment_info['approval_url']}
        else:
            return {'valid': False, 'message': 'El link de pago ha expirado'}
    else:
        return {'valid': False, 'message': 'ID de pago no válido'}