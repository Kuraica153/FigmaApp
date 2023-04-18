from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

@pytest.fixture
def id():
    return 1

def test_create_expediente():
    response = client.post("/expedientes/", json={
        "first_name": "Test",
        "last_name": "User",
        "dob": "2023-04-18",
        "gender": "F",
        "height": 0,
        "weight": 0,
        "phone": "string",
        "email": "mail@mail.com",
        "address": "string",
        "alergias_medicamentos": [
            {
            "nombre": "string"
            }
        ],
        "enfermedad_paciente": [
            {
            "nombre": "string"
            }
        ]
    })
    global id 
    id = response.json().get("id")
    assert response.status_code == 201

def test_create_expediente_bad_request():
    response = client.post("/expedientes/", json={
        "a": "string",
    })
    assert response.status_code == 422

def test_get_expediente_by_id():
    global id
    response = client.get(f"/expedientes/{id}")
    expediente = response.json()
    assert response.status_code == 200

def test_get_expediente_by_id_not_found():
    response = client.get("/expedientes/0")
    assert response.status_code == 404
    assert response.json().get("detail") == "No se ha encontrado la expediente con el id: 0"

def test_get_expediente_by_id_bad_request():
    response = client.get("/expedientes/abc")
    assert response.status_code == 422

def test_get_expedientes():
    response = client.get("/expedientes/")
    assert response.status_code == 200

def test_update_expediente_bad_request():
    global id
    response = client.put(f"/expedientes/{id}", json={
        "a": "string",
    })
    assert response.status_code == 422

def test_delete_expediente():
    global id
    response = client.delete(f"/expedientes/{id}")
    assert response.status_code == 200

def test_delete_expediente_not_found():
    global id
    response = client.delete(f"/expedientes/{id}")
    assert response.status_code == 404
    assert response.json().get("detail") == f"No se ha encontrado la expediente con el id: {id}"