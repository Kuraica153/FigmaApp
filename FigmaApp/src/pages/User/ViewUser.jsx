import { useState, useEffect } from "react"
import { useForm } from "../../hooks/useForm"
import { getUser } from "../../helpers/users"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export const ViewUser = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        getUser(id).then((user) => {
            user.password = '';
            user.confirm_password = '';
            console.log(user);
            setUser(user);
        });
    }, []);


    return (
        <div className="page">
            <div className="container mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Crear usuario</h1>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h3>Usuario</h3>
                        <h5>{user.username}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Nombre</h3>
                        <h5>{user.first_name}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Apellido</h3>
                        <h5>{user.last_name}</h5>
                    </div>
                    <div className="col-12 col-md-6">
                        <h3>Role</h3>
                        <h5>{user.role}</h5>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button className="btn btn-danger" onClick={ () => navigate("/users")}>Volver</button>
                </div>
            </div>
        </div>
    )
}