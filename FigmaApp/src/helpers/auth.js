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

export const login = (username, password) => {
    return fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(response => response.json())
        .then(data => {
            return data
        }).catch(error => {
            return false
        });
}