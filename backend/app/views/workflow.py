from flask import request, jsonify, current_app
from flask_restx import Namespace, Resource
import requests


api = Namespace('workflow', description="This is the API to handle with the workflows")


@api.route("/list/<productName>")
class Workflow(Resource):
    @api.doc('This is the API to get all the workflow of a specific product')   
    def get(self, productName):
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        query = {"query": "SELECT workflow FROM DIGITALTWINS product JOIN workflow RELATED product.control Relationship WHERE product.$dtId = '{}'".format(productName)}
        res = requests.post(current_app.config.get("PATH"), json=query,
                            headers= header)

        if res.status_code != 200:
            raise Exception(
                f"Problem with request {res.status_code}. Error code: {res.text} ")
        else:
            response = res.json()
            l = [{"name": value["workflow"]["$dtId"], "image": value["workflow"]["image"], "description":value["workflow"]["description"], "id": value["workflow"]["$etag"]} for value in response["value"]]

            return jsonify(l)


@api.route("/<workflowName>")
class Worflow(Resource):
    @api.doc('This is the API to get a specific Workflow')   
    def get(self, workflowName):
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        query = {"query": "SELECT * FROM DIGITALTWINS WHERE $dtId = '{}'".format(workflowName)}
        res = requests.post(current_app.config.get("PATH"), json=query,
                            headers= header)
        if res.status_code != 200:
            raise Exception(
                f"Problem with request {res.status_code}. Error code: {res.text} ")
        else:
            response = res.json()
            l = {
                "name": response["value"][0]["$dtId"],
                "image": response["value"][0]["image"],
                "description":response["value"][0]["description"],
                "id": response["value"][0]["$etag"]
                }

            return l