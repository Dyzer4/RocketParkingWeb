import './login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lightning from '../../components/Lightning/Lightning'
import ElectricBorder from '../../components/ElectricBorder/ElectricBorder'
import { login } from '../../../api'

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (!email.trim() || !senha.trim()) {
      setError("Email e senha são obrigatórios")
      return
    }

    setError("")
    setLoading(true)
    console.log('Attempting login with:', email, senha)
    login(email, senha)
      .then((data) => {
        console.log('Login successful:', data)
        navigate('/dashboard')
      })
      .catch((err) => {
        console.error('Login failed:', err)
        setError("Email ou senha inválidos")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className='main'>
        <div className="background">
          <Lightning
            hue={220}
            xOffset={0}
            speed={100}
            intensity={0.1}
            size={0.5}
          />
          <Lightning
            hue={220}
            xOffset={0}
            speed={100}
            intensity={0.1}
            size={0.5}
          />
        </div>
        
        <ElectricBorder
          color="#7df9ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          className='contentlogin'
        >
          <div className='formlogin'>
            <h2>Login</h2>
            <form className='form-login' onSubmit={handleLogin}>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <input 
                type="password" 
                placeholder='Senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={loading}
              />
              {error && <p style={{color: 'red', fontSize: '12px'}}>{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            <button className='linkbutton' onClick={() => navigate('/cadastro')} disabled={loading}>
              Não possui uma conta? Cadastre-se
            </button>
          </div>
        </ElectricBorder>
      </div>
    </>
  )
}

export default Login
