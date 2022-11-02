from flask import request, jsonify, current_app
from flask_restx import Namespace, Resource
import requests


api = Namespace('product', description="This is the API to handle with the products")


@api.route("/")
class Product(Resource):
    @api.doc('This is the API to get all the products')   
    def get(self):
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        query = {"query": "SELECT * FROM DIGITALTWINS WHERE IS_OF_MODEL('dtmi:example:product;1')"}
        res = requests.post(current_app.config.get("PATH"), json=query,
                            headers= header)

        if res.status_code != 200:
            raise Exception(
                f"Problem with request {res.status_code}. Error code: {res.text} ")
        else:
            response = res.json()
            l = [{"name": value["$dtId"], "image": value["image"], "description":value["description"], "id": value["$etag"]} for value in response["value"]]

            return jsonify(l)
