from flask import request, jsonify, current_app
from flask_restx import Namespace, Resource, fields
import requests
import os
import json
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient


api = Namespace('auth', description="This is the API to handle with Authentication")

auth_data = api.model('AuthData', {
    'userName': fields.String(description="The username"),
    'password': fields.String(description="The password"),
})

@api.route('/login')
class Auth(Resource):
    @api.doc('This is the API to get the component to a specific product and step')   
    @api.expect(auth_data)
    def post(self):
        #rodar ofline
        accessToken = 10e2333
        return (accessToken)

        #rodar online
        # input_data = json.loads(request.data)
        # userName = input_data["userName"]
        # password = input_data["password"]
        # login = os.popen("az login -u {} -p {} --tenant adaptar01.onmicrosoft.com".format( userName, password))
        # output = login.read()
        # if output:
        #     accessToken = os.popen("az account get-access-token --resource 0b07f429-9f4b-4714-9392-cc5e8e80c8b0")
        #     response = json.loads(accessToken.read())
        #     return (response["accessToken"])
        # else: raise Exception("Authentication Error")

    # @api.doc('This is the API to get the component to a specific product and step')   
    # def get(self):
    #     default_credential = DefaultAzureCredential()
    #     account_url="https://deguma2022.blob.core.windows.net"
        
    #     client = BlobServiceClient(account_url, credential=default_credential)

    #     print (client.popen())

    #     return "Okk"