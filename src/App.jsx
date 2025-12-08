import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/cadasto/Cadastro.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Login from './pages/login/login.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App
