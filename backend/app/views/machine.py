from flask import request, jsonify, current_app
from flask_restx import Namespace, Resource
import requests


api = Namespace('machine', description="This is the API to handle with the products")


@api.route("/")
class Product(Resource):
    @api.doc('This is the API to get all the machines')   
    def get(self):
        # #Ofline
        # l = [{"name": "title", "image": "\Resources\cold.jpg", "description":"description", "id": "1"}]
        # return jsonify(l)

        #Online
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        query = {"query": "SELECT * FROM DIGITALTWINS WHERE IS_OF_MODEL('dtmi:example:machine;1')"}
        res = requests.post(current_app.config.get("PATH"), json=query,
                            headers= header)

        if res.status_code != 200:
            raise Exception(
                f"Problem with request {res.status_code}. Error code: {res.text} ")
        else:
            response = res.json()
            print(res.json)
            l = [{"name": value["title"], "image": value["image"], "description":value["description"], "id": value["$dtId"]} for value in response["value"]]

            return jsonify(l)
