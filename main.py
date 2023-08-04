from typing import Union

from fastapi import FastAPI, Depends

import requests
import base64

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/users/")
def read_users(last_name: str):
    username = "techtest@gmail.com"
    password = "2OZ58K8MYZV56SFA59NG2PQ2HYW4C6280IT"

    credentials = f"{username}:{password}"

    encoded_credentials = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {encoded_credentials}"
    }

    url = f'https://techtest.hiboutik.com/api/customers/search?last_name={last_name}'
    response = requests.get(url, headers=headers)

    return response.json()


@app.get("/user/{customer_id}/sales")
def read_sales(customer_id: int):
    # Use environment variables or a configuration file to store sensitive credentials
    username = "techtest@gmail.com"
    password = "2OZ58K8MYZV56SFA59NG2PQ2HYW4C6280IT"

    credentials = f"{username}:{password}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()

    headers = {
        "Authorization": f"Basic {encoded_credentials}"
    }

    url = f'https://techtest.hiboutik.com/api/customer/{customer_id}/sales/'
    response = requests.get(url, headers=headers)

    return response.json()


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
