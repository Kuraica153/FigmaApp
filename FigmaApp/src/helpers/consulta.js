const API_URL = import.meta.env.VITE_API_URL;

export const getConsultas = () => {
    return fetch(`${API_URL}/consultas`)
        .then(response => response.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.log(error);
        });
}

export const getConsulta = (id) => {
    return fetch(`${API_URL}/consultas/${id}`)
        .then(response => response.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.log(error);
        });
}

export const createConsulta = (consulta) => {
    return fetch(`${API_URL}/consultas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
    }).then(response => response.json())
        .then(data => {
            return data;
        }).catch(error => {
            console.log(error);
        });
}