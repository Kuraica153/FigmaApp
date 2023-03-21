import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import StickyHeadTable from "../components/StickyHeadTable"
import { useForm } from "../hooks/useForm"
import { getUser, updateUser } from "../helpers/users"
import { getRoles } from "../helpers/roles"
import Swal from 'sweetalert2'

export const EditUser = () => {
    const { id } = useParams();

    const { formState, onInputChange, setFormState, username, name, lastname, password, role, confirm_password } = useForm({
        username: '',
        name: '',
        lastname: '',
        password: '',
        role: '1',
        confirm_password: ''
    });

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getUser(id).then((user) => {
            user.password = '';
            user.confirm_password = '';
            console.log(user);
            setFormState(user);
        });
        console.log(formState);
        getRoles().then((roles) => {
            setRoles(roles);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(id, formState).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado',
                showConfirmButton: false,
                timer: 1500
            })
        });
    }

    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Editar usuario</h1>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="username">Usuario</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username"
                                name="username" 
                                value={username}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <div className="form-group">
                            <label htmlFor="lastname">Apellido</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="lastname" 
                                name="lastname"
                                value={lastname}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <div className="form-group">
                            <label htmlFor="role">Rol</label>
                            <select 
                                className="form-control" 
                                id="role"
                                name="role"
                                value={role}
                                onChange={onInputChange}
                            >
                                <option value="">Selecciona un rol</option>
                                {
                                    roles.map((role) => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <div className="form-group">
                            <label htmlFor="confirm_password">Repite la contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="confirm_password"
                                name="confirm_password"
                                value={confirm_password}
                                onChange={onInputChange}
                            />
                            {password !== confirm_password && <p className="text-danger">Las contraseñas no coinciden</p>}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary me-2" onClick={handleSubmit}>Guardar</button>
                    <button className="btn btn-danger ms-2">Cancelar</button>
                </div>
            </div>
        </div>
    )
}