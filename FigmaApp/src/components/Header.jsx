import { useNavigate } from "react-router-dom";
import logo from '../assets/img/logo-white.png'
export const Header = () => {

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <>
            <div className="page-header bg-color-primario d-flex align-items-center justify-content-between">
                {/* Logo of the app */}
                <div className="d-flex align-items-center p-3 ms-2">
                    <img src={logo} alt="logo" className="logo"/>
                </div>
                <div className="dropdown dropdown-menu-end p-3 me-2">
                    <button type="button" className="btn btn-success bg-color-secundario dropdown-toggle" data-bs-toggle="dropdown">
                        { `Bienvenido, ${localStorage.getItem('first_name')} ${localStorage.getItem('last_name')}`}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={ handleLogOut }>Cerrar sesión</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}