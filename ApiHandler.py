from flask_restful import Api, Resource, reqparse
from flask import request
from data_handler import get_active_window, task_switch_detector
import certifi
import pymongo
from pymongo import MongoClient
import time

cluster = MongoClient("mongodb+srv://crysta:3.14159265e@crysta-database.qrvsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", tlsCAFile=certifi.where())
db = cluster["crysta"]
collection = db["task-switches"]


class ApiHandler(Resource):
  post_counter = 0
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Hello Api Handler"
      }

  def post(self):
    # print(self) #COMMENT OUT BEFORE V.0.1 RELEASE
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)
    args = parser.parse_args()

    if ApiHandler.post_counter == 0:

      print('\n')

      print('Your username:', request.json['username'])
      username = request.json['username']

      print("Success! We've started tracking your energy levels. Feel free to minimize this tab and continue working.")
      print('\n')
      print("Have a productive day :D")
      ApiHandler.post_counter = 1
      task_switch_detector(collection, username)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_type = args['type']
    request_json = args['message']
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    ret_status = request_type
    ret_msg = request_json

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}

    return final_ret
    