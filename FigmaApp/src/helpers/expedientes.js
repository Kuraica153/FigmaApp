//get the api url from the .env file
const API_URL = import.meta.env.VITE_API_URL;

class Expediente {
    constructor(id, paciente) {
        this.id = id;
        this.paciente = paciente;
    }
}

export const getExpedientes = () => {
    return fetch(`${API_URL}/expedientes`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.map(expediente => new Expediente(expediente.id, expediente.paciente));
        }).catch(error => {
            console.log(error);
        });
}

export const getExpediente = (id) => {
    return fetch(`${API_URL}/expedientes/${id}`)
        .then(response => response.json())
        .then(data => {
            return new Expediente(data.id, data.paciente);
        }).catch(error => {
            console.log(error);
        });
}

export const createExpediente = (expediente) => {
    return fetch(`${API_URL}/expedientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expediente)
    }).then(response => response.json())
        .then(data => {
            return new Expediente(data.id, data.paciente);
        }).catch(error => {
            console.log(error);
        });
}

export const updateExpediente = (expediente) => {
    return fetch(`${API_URL}/expedientes/${expediente.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expediente)
    }).then(response => response.json())
        .then(data => {
            return new Expediente(data.id, data.paciente);
        }).catch(error => {
            console.log(error);
        });
}

export const deleteExpediente = (id) => {
    return fetch(`${API_URL}/expedientes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            return new Expediente(data.id, data.paciente);
        }).catch(error => {
            console.log(error);
        });
}