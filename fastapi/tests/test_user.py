from fastapi.testclient import TestClient
from schemas.user import User
from main import app

client = TestClient(app)


def test_create_user():
    response = client.post("/users/", json={
        "username": "John",
        "first_name": "John",
        "last_name": "Doe",
        "password": "secret",
    })
    assert response.status_code == 201

def test_get_user():
    response = client.get("/users/1")
    user = response.json()
    assert response.status_code == 200

""" def test_get_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert response.json() == [user]

def test_update_user():
    user["name"] = "Jane"
    response = client.put("/users/1", json=user)
    assert response.status_code == 200
    assert response.json() == user

def test_delete_user():
    response = client.delete("/users/1")
    assert response.status_code == 200
    assert response.json() == user  """