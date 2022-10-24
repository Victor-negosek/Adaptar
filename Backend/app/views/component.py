from flask import request, jsonify, current_app
from flask_restx import Namespace, Resource
import requests


api = Namespace('component', description="This is the API to handle with the tools")

@api.route('/<productName>/<stepName>')
class Tool(Resource):
    @api.doc('This is the API to get the component to a specific product and step')   
    def get(self, productName, stepName):
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        query = {"query": "SELECT value FROM DIGITALTWINS MATCH (step)-[r:contain]->(value)<-[contain]-(product) WHERE step.$dtId = '{}' AND product.$dtId = '{}'".format( stepName, productName)}
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


