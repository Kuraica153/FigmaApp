//get the api url from the .env file
const API_URL = import.meta.env.VITE_API_URL;


// Define la clase Permission con los atributos id, name y description
class Permission {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}


/**
 * Realiza una peticion HTTP GET al endpoint '/permissions' de la API.
 * @returns {Promise} - Una promesa que se resuelve con un arreglo de objetos Permission.
 */

export const getPermissions = () => {

    return fetch(`${API_URL}/permissions`)
        .then(response => response.json())
        .then(data => {
            // Se mapea cada objeto 'permission' recibido del servidor a un objeto 'Permission' de la clase 'Permission'
            return data.map(permission => new Permission(permission.id, permission.name, permission.description));
        }).catch(error => {
            console.log(error);
        });
}