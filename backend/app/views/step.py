from flask import request, jsonify, current_app
from flask_restx import Namespace, Resource
import requests


api = Namespace('step', description="This is the API to handle with the steps")

@api.route("/<workflowName>")
class Step(Resource):
    @api.doc('This is the API to get the first step of a workflow')   
    def get(self, workflowName):
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        query = {"query": "SELECT step FROM DIGITALTWINS workflow JOIN step RELATED workflow.start Relationship WHERE workflow.$dtId = '{}'".format(workflowName)}
        res = requests.post(current_app.config.get("PATH"), json=query,
                            headers= header)

        if res.status_code != 200:
            raise Exception(
                f"Problem with request {res.status_code}. Error code: {res.text} ")
        else:
            response = res.json()
            l = {
                    "id": response["value"][0]["step"]["$dtId"],
                    "description":response["value"][0]["step"].get("description"),
                    "title": response["value"][0]["step"].get("title"),
                    "image": response["value"][0]["step"].get("image")
                }
            return jsonify(l)

@api.route("/<stepName>/<relationName>")
class Step(Resource):
    @api.doc('This is the API to get the next step in a workflow')   
    def get(self, stepName, relationName):
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        query = {"query": "SELECT value FROM DIGITALTWINS MATCH (step)-[r:{}]->(value) WHERE step.$dtId = '{}'".format(relationName, stepName)}
        res = requests.post(current_app.config.get("PATH"), json=query,
                            headers= header)

        if res.status_code != 200:
            raise Exception(
                f"Problem with request {res.status_code}. Error code: {res.text} ")
        else:
            response = res.json()
            if response["value"] == []:
                l = {
                        "id": None,
                        "description":None,
                        "title": None,
                        "image": None
                    }
                
                return jsonify(l)
            else:
                l = {
                        "id": response["value"][0]["value"]["$dtId"],
                        "description":response["value"][0]["value"].get("description"),
                        "title": response["value"][0]["value"].get("title"),
                        "image": response["value"][0]["value"].get("image")
                    }
                return jsonify(l)

