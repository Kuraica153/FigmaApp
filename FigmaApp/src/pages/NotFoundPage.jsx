import { useNavigate } from "react-router-dom"

export const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className="container w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column ">
                <h4>Ops! parece que el sitio que intentas visitar no existe.</h4>
                <button className="btn btn-primary" onClick={ () => navigate("/consultations") }>Volver</button>
            </div>
        </div>
    )
}