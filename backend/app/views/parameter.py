from flask import request, jsonify, current_app
from flask_restx import Namespace, Resource, fields
import requests
import json

api = Namespace('parameter', description="This is the API to handle with the parameters")

change_data = api.model('ChangeData', {
    'id': fields.String(description="The id of the parameter"),
    'value': fields.Integer(description="The curent value"),
})


@api.route("/<productName>/<stepName>")
class Parameter(Resource):
    @api.doc('This is the API to get all the parameter that has relationship with the choosen Product and Step')   
    def get(self, productName, stepName):
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        query = {"query": "SELECT parameter FROM DIGITALTWINS MATCH (product)-[r:hold]->(parameter)<-[hold]-(step) WHERE product.$dtId = '{}' AND step.$dtId = '{}'".format(productName, stepName)}
        res = requests.post(current_app.config.get("PATH"), json=query,
                            headers= header)

        if res.status_code != 200:
            raise Exception(
                f"Problem with request {res.status_code}. Error code: {res.text} ")
        else:
            response = res.json()
            if response["value"] == []:
                l = {
                        "uper_limit": None,
                        "lower_limit": None,
                        "id": None
                    }

                return jsonify(l)
            else:
                l = {
                        "uper_limit": int(response["value"][0]["parameter"].get("uper_limit")),
                        "lower_limit": int(response["value"][0]["parameter"].get("lower_limit")),
                        "id": response["value"][0]["parameter"].get("$dtId")
                    }
                return jsonify(l)
@api.route("/curent-value")
class Parameter(Resource):
    @api.doc('This is the API to update the curent parameter value')   
    @api.expect(change_data)
    def post(self):
        input_data = json.loads(request.data)
        id = input_data["id"]
        value = input_data["value"]
        header = current_app.config.get("BASEHEADER")
        header["Authorization"] = request.headers.get('Authorization')
        path = "https://IPT-demonstrator.api.weu.digitaltwins.azure.net/digitaltwins/{}?api-version=2020-10-31".format(id)
        query = [{"op": "add", "path": "/curent_value", "value": "{}".format(value)}]
        res = requests.patch(path, json=query,
                            headers= header)
        return("Done")
