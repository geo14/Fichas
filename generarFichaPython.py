import requests
import pandas as pd
import sys

session = requests.Session()

user = sys.argv[1]
store = sys.argv[2]
password = ""
email = ""

if user == "Geova":
    email = "geova1402@gmail.com"
    password = "geova"
elif user == "Kei":
    email = "keisanchez2003@gmail.com"
    password = "tesorokei"
elif user == "Lavi":
    email = "lavi0707@hotmail.com"
    password = "colquin"
elif user == "Colco":
    email = "gzuniga62@hotmail.com"
    password = "geolavi"
elif user == "Dayi":
    email = "coralcolette@hotmail.com"
    password = "tesorodayi"
elif user == "Vale":
    email = "vale.roldan2505@gmail.com"
    password = "tesorovale"
elif user == "Nana":
    email = "kemblyroldan07@gmail.com"
    password = "tesoronana"
elif user == "Zayi":
    email = "zayira1382@gmail.com"
    password = "tesorozayi"
elif user == "Jonni":
    email = "jonnigomezcastro1212@gmail.com"
    password = "tesoro"
elif user == "Ventas":
    email = "ventasdiamante18@gmail.com"
    password = "tesoro"

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
