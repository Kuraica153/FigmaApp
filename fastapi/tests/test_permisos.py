from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

@pytest.fixture
def id():
    return 1

def test_get_permissions():
    response = client.get("/permissions/")
    assert response.status_code == 200

def test_get_permission_by_id():
    global id
    id = 1
    response = client.get(f"/permissions/{id}")
    assert response.status_code == 200

def test_get_permission_by_id_not_found():
    response = client.get("/permissions/0")
    assert response.status_code == 404
    assert response.json().get("detail") == "No se ha encontrado el permiso con el id: 0"

def test_get_permission_by_id_bad_request():
    response = client.get("/permissions/abc")
    assert response.status_code == 422
