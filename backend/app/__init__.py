import os
from flask import Flask
from flask_cors import CORS
from .config import BaseConfig
from .views import bp

cors = CORS()

def create_app():
    app = Flask(__name__)
    app.config.from_object(BaseConfig)
    cors.init_app(app)
    app.register_blueprint(
        bp,
        url_prefix='/api/v1'
    )

    return app

if __name__ =='__main__':
    create_app()