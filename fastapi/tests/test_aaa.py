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

def test_create_user_repeat():
    response = client.post("/users/", json={
        "username": "John",
        "first_name": "John",
        "last_name": "Doe",
        "password": "secret",
    })
    assert response.status_code == 409
    assert response.json().get("detail") == "Ya existe un usuario con el nombre de usuario: John"

def test_create_user_bad_request():
    response = client.post("/users/", json={
        "username": "John",
        "first_name": "John",
        "last_name": "Doe",
    })
    assert response.status_code == 422

def test_get_user_by_id():
    response = client.get("/users/1")
    user = response.json()
    assert response.status_code == 200

def test_get_user_by_id_not_found():
    response = client.get("/users/0")
    assert response.status_code == 404
    assert response.json().get("detail") == "No se ha encontrado el usuario con el id: 0"

def test_get_users_bad_request():
    response = client.get("/users/abc")
    assert response.status_code == 422

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