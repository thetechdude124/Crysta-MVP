from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse

from flask_cors import CORS #remember to comment out on deployment
from api.ApiHandler import ApiHandler

app = Flask(__name__)
CORS(app) #remember to comment out on deployment
api = Api(app)
# socket_ = SocketIO(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder, '')   

api.add_resource(ApiHandler, '/user')

if __name__ == '__main__':
    from waitress import serve
    import webbrowser
    link = "https://crysta-app.herokuapp.com/"
    webbrowser.open(link)
    print("Hey there! Glad you're here. Login or refresh to start tracking your energy levels!")
    print('\n')
    serve(app, host="127.0.0.1", port = 5000)
    # app.run(host='127.0.0.1', port = 5000, debug = False )
    