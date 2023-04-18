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


/**
 * Obtiene todos los expedientes de la API.
 * @returns {Promise<Array<Expediente>>} - Una promesa que devuelve un array (arreglo) de Expediente.
 */

export const getExpedientes = () => { 
    return fetch(`${API_URL}/expedientes`)//Solicitud "fetch" para obtener lista de expedientes
        .then(response => response.json())//Conversion de la respuesta de la solicitud a json
        .then(data => {
            console.log(data);//registro en consola
            return data.map(expediente => new Expediente(expediente.id, expediente.paciente));//crear una lista de expedientes
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