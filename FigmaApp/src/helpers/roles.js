//get the api url from the .env file
const API_URL = import.meta.env.VITE_API_URL;

class Role {
    constructor(id, name) {
        this.id = id;
        this.name = name;
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