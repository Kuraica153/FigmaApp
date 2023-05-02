import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import StickyHeadTable from "../../components/StickyHeadTable"
import { useForm } from "../../hooks/useForm"
import { getUser, updateUser } from "../../helpers/users"
import { getRoles } from "../../helpers/roles"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const EditUser = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { formState, onInputChange, setFormState, username, first_name, last_name, password, role_id, confirm_password } = useForm({
        username: '',
        name: '',
        lastname: '',
        password: '',
        role_id: '',
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
            navigate('/users');
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
                            <label htmlFor="first_name">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="first_name" 
                                name="first_name"
                                value={first_name}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <div className="form-group">
                            <label htmlFor="last_name">Apellido</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="last_name" 
                                name="last_name"
                                value={last_name}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <div className="form-group">
                            <label htmlFor="role_id">Rol</label>
                            <select 
                                className="form-control" 
                                id="role_id"
                                name="role_id"
                                value={role_id}
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
                    <button className="btn btn-success bg-color-secundario me-2" onClick={handleSubmit}>Guardar</button>
                    <button className="btn btn-primary bg-color-primario ms-2" onClick={ () => navigate("/users")}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}