from flask import Blueprint
from flask_restx import Api
from .product import api as product
from .workflow import api as workflow
from .step import api as step
from .parameter import api as parameter
from .tool import api as tool
from .component import api as component
from .auth import api as auth



bp = Blueprint('api', __name__,)
api = Api(bp, api_version="0.1", title="AdaptAR API", description="This is the API for Franunhofer IPT AdaptAR project.")

api.add_namespace(auth)
api.add_namespace(product)
api.add_namespace(workflow)
api.add_namespace(step)
api.add_namespace(parameter)
api.add_namespace(tool)
api.add_namespace(component)
