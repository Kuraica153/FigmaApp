import './assets/css/App.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Users } from './pages/Users'
import { EditUser } from './pages/EditUser'
import { Routes, Route, useParams, useLocation, useNavigate, Navigate } from 'react-router-dom' 

function App() {

  return(
    <>
      <Header />
      <div className="d-flex w-100">
        <Sidebar />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </>
  )
}

export default App
