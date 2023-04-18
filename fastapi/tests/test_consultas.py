from fastapi.testclient import TestClient
from schemas.user import User
from main import app

client = TestClient(app)

def test_create_consulta():
    response = client.post("/consultas/", json={
        "motivo_visita": "string",
        "complicaciones": "string",
        "tratamiento": "string",
        "medicacion": [
            {
            "medicamento": "string",
            "dosis": "string",
            "frecuencia": "string",
            "duracion": "string"
            }
        ],
        "procedimientos": [
            {
            "procedimiento": "string"
            }
        ],
        "expediente_id": 6
    })
    assert response.status_code == 201

def test_create_consulta_bad_request():
    response = client.post("/consultas/", json={
        "motivo_visita": "string",
        "complicaciones": "string",
        "tratamiento": "string",
        "medicacion": [
            {
            "medicamento": "string",
            "dosis": "string",
            "frecuencia": "string",
            "duracion": "string"
            }
        ],
        "procedimientos": [
            {
            "procedimiento": "string"
            }
        ]
    })
    assert response.status_code == 422

def test_get_consultas():
    response = client.get("/consultas/")
    assert response.status_code == 200

def test_get_consulta_by_id():
    response = client.get("/consultas/1")
    consulta = response.json()
    assert response.status_code == 200

def test_get_consulta_by_id_not_found():
    response = client.get("/consultas/0")
    assert response.status_code == 404
    assert response.json().get("detail") == "No se ha encontrado la consulta con el id: 0"

def test_get_consultas_bad_request():
    response = client.get("/consultas/abc")
    assert response.status_code == 422
    