//get the api url from the .env file
const API_URL = import.meta.env.VITE_API_URL;

class Role {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class RolePermits extends Role {
    constructor(id, name, permissions) {
        super(id, name);
        this.permissions = permissions;
    }
}

export const getRoles = () => {
    return fetch(`${API_URL}/roles`)
        .then(response => response.json())
        .then(data => {
            return data.map(role => new Role(role.id, role.name));
        }).catch(error => {
            console.log(error);
        });
}

export const getRole = (id) => {
    return fetch(`${API_URL}/roles/${id}`)
        .then(response => response.json())
        .then(data => {
            return new RolePermits(data.id, data.name, data.permissions);
        }).catch(error => {
            console.log(error);
        });
}

export const createRole = (role) => {

    console.log(role);

    return fetch(`${API_URL}/roles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(role)
    }).then(response => response.json())
        .catch(error => {
            console.log(error);
        });
}

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
