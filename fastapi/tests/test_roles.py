from fastapi.testclient import TestClient
import pytest
from main import app

client = TestClient(app)

@pytest.fixture
def id():
    return 1

def test_create_role():
    response = client.post("/roles/", json={
        "name": "string",
        "permissions": [
            {
                "name": "Editar usuario",
                "description": "Permite modificar los registros de un usuario",
                "id": 5
            }
        ]
    })
    global id 
    id = response.json().get("id")
    assert response.status_code == 201

def test_create_role_bad_request():
    response = client.post("/roles/", json={
        "a": "string",
    })
    assert response.status_code == 422

def test_get_roles():
    response = client.get("/roles/")
    assert response.status_code == 200

def test_get_role_by_id():
    global id
    response = client.get(f"/roles/{id}")
    role = response.json()
    assert response.status_code == 200

def test_get_role_by_id_not_found():
    response = client.get("/roles/0")
    assert response.status_code == 404
    assert response.json().get("detail") == "No se ha encontrado el rol con el id: 0"

def test_get_role_by_id_bad_request():
    response = client.get("/roles/abc")
    assert response.status_code == 422

def test_update_role():
    global id
    response = client.put(f"/roles/{id}", json={
        "name": "string",
    })
    assert response.status_code == 200

def test_update_role_bad_request():
    global id
    response = client.put(f"/roles/{id}", json={
        "a": "string",
    })
    assert response.status_code == 422

def test_delete_role():
    global id
    response = client.delete(f"/roles/{id}")
    assert response.status_code == 200