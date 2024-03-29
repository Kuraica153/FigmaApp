/**
 * Clase Expediente que representa un expediente que contiene informacion personal del paciente.
 * @param {number} id - El identificador del expediente.
 * @param {string} paciente - El nombre del paciente asociado al expediente.
 */


//get the api url from the .env file
const API_URL = import.meta.env.VITE_API_URL;


//Define la clase Expediente
class Expediente {
    constructor(id, paciente) {
        this.id = id;
        this.paciente = paciente;
    }
}


class AlergiaMedicamento {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Enfermedad {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Paciente{
    constructor(first_name, last_name, dob, gender, height, weight, phone, email, address, alergias_medicamentos, enfermedad_paciente) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.dob = dob;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.alergias_medicamentos = alergias_medicamentos;
        this.enfermedad_paciente = enfermedad_paciente;
    }
}

const jsonToPacienteConverter = (json) => {
    let alergias_medicamentos = [];
    let enfermedades_paciente = [];
    json.alergias_medicamentos.forEach(alergia => {
        alergias_medicamentos.push({nombre: alergia});
    });
    json.enfermedad_paciente.forEach(enfermedad => {
        enfermedades_paciente.push({nombre: enfermedad});
    });
    json.alergias_medicamentos = alergias_medicamentos;
    json.enfermedad_paciente = enfermedades_paciente;
    return json
}


export const getExpedientes = () => {
    return fetch(`${API_URL}/expedientes`)
        .then(response => response.json())
        .then(data => {
            return data.map(expediente => new Expediente(expediente.id, expediente.paciente));
        }).catch(error => {
            console.log(error);//registro de error en consola
        });
}


/**
 * Usa la API para obtener un expediente por el ID.
 * @param {number} id - El identificador del expediente a obtener.
 * @returns {Promise<Expediente>} - Una promesa que devuelve un objeto Expediente.
 */

export const getExpediente = (id) => {
    return fetch(`${API_URL}/expedientes/${id}`)
        .then(response => response.json())
        .then(data => {
            return new Expediente(data.id, data.paciente);
        }).catch(error => {
            console.log(error);
        });
}


/**
 * Crea un nuevo expediente en la API.
 * @param {Expediente} expediente - El objeto Expediente a crear.
 * @returns {Promise<Expediente>} - Una promesa que devuelve el objeto Expediente creado.
 */

export const createExpediente = (expediente) => {
    expediente = jsonToPacienteConverter(expediente);
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


/**
 * Actualiza un expediente existente en la API.
 * @param {Expediente} expediente - El objeto Expediente a actualizar.
 * @returns {Promise<Expediente>} - Una promesa que devuelve el objeto Expediente actualizado.
 */

export const updateExpediente = (expediente) => {
    return fetch(`${API_URL}/expedientes/${expediente.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expediente) // Convierte el objeto Expediente a formato json y lo envía en el cuerpo de la solicitud
    }).then(response => response.json())
        .then(data => {
            return new Expediente(data.id, data.paciente);
        }).catch(error => {
            console.log(error);
        });
}


/**
 * Elimina un expediente existente en la API dado su identificador.
 * @param {number} id - El identificador del expediente a eliminar.
 * @returns {Promise<Expediente>} - Una promesa que devuelve el objeto Expediente eliminado.
 */

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

export const getExpedienteByName = (first_name, last_name) => {
    return fetch(`${API_URL}/expedientes/paciente/${first_name}/${last_name}`)
        .then(response => response.json())
        .then(data => {
            return data
        }).catch(error => {
            console.log(error);
        });
}