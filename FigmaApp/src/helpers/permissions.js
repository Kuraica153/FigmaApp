//get the api url from the .env file
const API_URL = import.meta.env.VITE_API_URL;

class Permission {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

export const getPermissions = () => {

    return fetch(`${API_URL}/permissions`)
        .then(response => response.json())
        .then(data => {
            return data.map(permission => new Permission(permission.id, permission.name, permission.description));
        }).catch(error => {
            console.log(error);
        });
}