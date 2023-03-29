import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//get the api url from the .env file
const API_URL = import.meta.env.VITE_API_URL;

const MySwal = withReactContent(Swal)

class User {
    constructor(id, username, first_name, last_name, role, role_id) {
        this.id = id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role = role
        this.role_id = role_id
    }
}

export const getUsers = () => {
    return fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.map(user => new User(user.id, user.username, user.first_name, user.last_name, user.role.name === '' ? 'No role' : user.role.name, user.role.id === '' ? 0 : user.role.id ));
        }).catch(error => {
            console.log(error);
        });
}

export const getUser = (id) => {
    return fetch(`${API_URL}/users/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return new User(data.id, data.username, data.first_name, data.last_name, data.role.name, data.role.id);
        }).catch(error => {
            console.log(error);
        });
}

export const createUser = (user) => {
    return fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            return new User(data.id, data.username, data.first_name, data.last_name, data.role.name);
        }).catch(error => {
            console.log(error);
        });
}

export const updateUser = (id, user) => {
    console.log(user.id);
    return fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            return new User(data.id, data.username, data.first_name, data.last_name, data.role.name);
        }).catch(error => {
            console.log(error);
        });
}

export const deleteUser = (id) => {
    return fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        return true;
    }).catch(error => {
        console.log(error);
    });
}