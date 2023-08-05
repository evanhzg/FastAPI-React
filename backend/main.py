from typing import Union, Optional

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

import requests
import base64

# Init du projet viea FastAPI
app = FastAPI()

# Les CORS parce qu'on est jamais sûr d'où peuvent venir les problèmes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentification à l'API
username = "techtest@gmail.com"
password = "2OZ58K8MYZV56SFA59NG2PQ2HYW4C6280IT"

credentials = f"{username}:{password}"
encoded_credentials = base64.b64encode(credentials.encode()).decode()

headers = {
    "Authorization": f"Basic {encoded_credentials}"
}


# Endpoints FastAPI, les types de requêtes ainsi que leur route sont définies avec un @


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/users/")
def read_users(last_name: Optional[str] = None):
    if (last_name):
        url = f'https://techtest.hiboutik.com/api/customers/search?last_name={last_name}'
    else:
        url = f'https://techtest.hiboutik.com/api/customers/'
    response = requests.get(url, headers=headers)

    return response.json()


@app.get("/user/{customer_id}/sales")
def read_sales(customer_id: int):
    url = f'https://techtest.hiboutik.com/api/customer/{customer_id}/sales/'
    response = requests.get(url, headers=headers)

    return response.json()


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
