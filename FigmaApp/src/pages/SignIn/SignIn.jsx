import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { login } from "../../helpers/auth";
import Swal from "sweetalert2";

export const SignIn = () => {

    const navigate = useNavigate();

    const { username, password, formState, onInputChange } = useForm({
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password).then((response) => {
            if (response.detail === 'El usuario o la contraseña son incorrectos') {
                Swal.fire({
                    title: 'Error!',
                    text: 'Usuario o contraseña incorrectos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }

            const token = `${response.first_name}:${response.last_name}`;
            localStorage.setItem('token', token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('first_name', response.first_name);
            localStorage.setItem('last_name', response.last_name);
            navigate('/users');

        }).catch((error) => {
            console.log(error);
        });
    }
    
    return (
        
        <div className="row d-flex justify-content-center align-items-center sign-up-container m-0 bg-image">
            <div className="col-6">
                
            </div>
            <div className="col-6">
                <div className="container w-75">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <h2 className="card-title">Bienvenido</h2>
                            </div>
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="username"
                                value={ username }
                                onChange={ onInputChange }
                            />
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                value={ password }
                                onChange={ onInputChange }
                            />
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-success bg-color-secundario mt-3" onClick={ handleSubmit }>Iniciar sesión</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}