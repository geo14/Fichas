import requests
import pandas as pd
import sys

session = requests.Session()

email = sys.argv[1]
password = sys.argv[2]
store = sys.argv[3]

loginData =  {'txtEmail': email, 'txtClave': password}

response = session.get('https://www.fichascr.com/GeneradorFichas.php?CodTienda=' + store)
#print(response.text)

while True:
    seconds = pd.datetime.now().second
    print("Esperando para ingresar... ", seconds)
    if seconds == 0:
        response = session.post('https://www.fichascr.com/VerificaIngreso.php', loginData)
        #print(len(response.content))
        if len(response.content) > 4200:
            response = session.get('https://www.fichascr.com/GeneraFichas.php')
            print(response.text)
        else: 
            print('Error en login')
        break
