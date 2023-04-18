//get the api url from the .env file
const API_URL = import.meta.env.VITE_API_URL;


/**
 * Representa un rol.
 * @class
 */

class Role {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

/**
 * Representa un rol con sus permisos asociados.
 * @class
 * @extends Role
 */

class RolePermits extends Role {
    constructor(id, name, permissions) {
        super(id, name);
        this.permissions = permissions;
    }
}


/**
 * Obtiene todos los roles.
 * @function
 * @returns {Promise<Array<Role>>} Una promesa que se resuelve en un arreglo de roles.
 */

export const getRoles = () => {
    return fetch(`${API_URL}/roles`)
        .then(response => response.json())// Hace parse la respuesta HTTP como JSON
        .then(data => {
            return data.map(role => new Role(role.id, role.name));// Crea un objeto Role por cada rol en los datos obtenidos
        }).catch(error => {
            console.log(error);
        });
}


/**
 * Obtiene un rol específico.
 * @function
 * @param {number} id - El id del rol a obtener.
 * @returns {Promise<RolePermits>} Una promesa que se resuelve en una instancia de RolePermits.
 */

export const getRole = (id) => {
    return fetch(`${API_URL}/roles/${id}`)
        .then(response => response.json()) // Hace parse la respuesta HTTP como JSON
        .then(data => {
            return new RolePermits(data.id, data.name, data.permissions);// Crea un objeto RolePermits con los datos obtenidos
        }).catch(error => {
            console.log(error);
        });
}

/**
 * Crea un nuevo rol.
 * @function
 * @param {Role} role - El objeto Role que representa el nuevo rol.
 * @returns {Promise<Object>} Una promesa que se resuelve en el objeto JSON del nuevo rol creado.
 */

export const createRole = (role) => {
    console.log(role);
    // Crea un objeto RolePermits con los datos obtenidos
    return fetch(`${API_URL}/roles`, {
        method: 'POST', // Especifica el método HTTP POST
        headers: {
            'Content-Type': 'application/json' // Convierte el objeto de rol a JSON y lo envía en el cuerpo de la solicitud
        },
        body: JSON.stringify(role) // Convierte el objeto de rol a JSON y lo envía en el cuerpo de la solicitud
    }).then(response => response.json()) // Hace parse la respuesta HTTP como JSON
        .catch(error => {
            console.log(error);
        });
}

/**
 * Actualiza un rol existente.
 * @function
 * @param {Role} role - El objeto Role que representa el rol a actualizar.
 * @returns {Promise<Object>} Una promesa que se resuelve en el objeto JSON del rol actualizado.
 */

export const updateRole = (role) => {
    
        return fetch(`${API_URL}/roles/${role.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(role)
        }).then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }

/**
 * Realiza una solicitud de eliminación HTTP DELETE al servidor para eliminar un rol con el ID especificado.
 * @param {number} id - El ID del rol que se desea eliminar.
 * @returns {Promise} Una promesa que se resuelve con los datos de la respuesta del servidor en caso de éxito, o se rechaza con el error en caso de fallo.
 */

export const deleteRole = (id) => {
    return fetch(`${API_URL}/roles/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .catch(error => {
            console.log(error);
        });
}
