import os

class BaseConfig(object):
    #PATH= os.environ['PATH']
    PATH = "https://IPT-demonstrator.api.weu.digitaltwins.azure.net/query?api-version=2020-10-31"
    BASEHEADER = {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                 }
