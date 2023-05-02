import './assets/css/App.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Routes, Route, useParams, useLocation, useNavigate } from 'react-router-dom' 
//Users imports
import { Users } from './pages/User/Users'
import { EditUser } from './pages/User/EditUser'
import { CreateUser } from './pages/User/CreateUser'
import { ViewUser } from './pages/User/ViewUser'
//Roles imports
import { Role } from './pages/Role/Role'
import { CreateRole } from './pages/Role/CreateRole'
import { EditRole } from './pages/Role/EditRole'
import { ViewRole } from './pages/Role/ViewRole'
//Expediente imports
import { Expediente } from './pages/Expediente/Expediente'
import { CreateExpediente } from './pages/Expediente/CreateExpediente'
import { EditExpediente } from './pages/Expediente/EditExpediente'
import { ViewExpediente } from './pages/Expediente/ViewExpediente'
//Consulta imports
import { Consulta } from './pages/Consulta/Consulta'
import { CreateConsulta } from './pages/Consulta/CreateConsulta'
import { ViewConsulta } from './pages/Consulta/ViewConsulta'
import { NotFoundPage } from './pages/NotFoundPage'
//SignIn imports
import { SignIn } from './pages/SignIn/SignIn'

function App() {

  const navigate = useNavigate()

  if (localStorage.getItem('token') === null) {
    return <SignIn />
  }

  return(
    <>
      <Header />
      <div className="d-flex w-100">
        <Sidebar />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/users/view/:id" element={<ViewUser />} />

          <Route path="/roles" element={ <Role /> } />
          <Route path="/roles/create" element={<CreateRole />} />
          <Route path="/roles/edit/:id" element={<EditRole />} />
          <Route path="/roles/view/:id" element={<ViewRole />} />

          <Route path="/files" element={<Expediente />} />
          <Route path="/files/create" element={<CreateExpediente />} />
          <Route path="/files/edit/:id" element={ <EditExpediente /> } />
          <Route path="/files/view/:id" element={ <ViewExpediente /> } /> 

          <Route path="/consultations" element={ <Consulta /> } />
          <Route path="/consultations/create" element={ <CreateConsulta /> } />
          <Route path="/consultations/view/:id" element={ <ViewConsulta /> } />

          <Route path="/*" element={ <NotFoundPage /> } />
        </Routes>
      </div>
    </>
  )
}

export default App
