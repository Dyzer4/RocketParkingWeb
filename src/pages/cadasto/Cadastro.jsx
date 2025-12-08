import './cadastro.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lightning from '../../components/Lightning/Lightning'
import ElectricBorder from '../../components/ElectricBorder/ElectricBorder'
import { register } from '../../../api'

function Cadastro() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleCadastro = (e) => {
    e.preventDefault()
    
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setError("Todos os campos são obrigatórios")
      return
    }

    setError("")
    setLoading(true)

    register(nome, email, senha)
      .then((data) => {
        console.log('Registration successful:', data)
        navigate('/')
      })
      .catch((err) => {
        console.error('Registration failed:', err)
        setError("Erro ao realizar cadastro")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <main>
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
          className='contentcadastro'
        >
          <div className='formcadastro'>
            <h2>Cadastro</h2>
            <form onSubmit={handleCadastro}>
              <input 
                type="text" 
                placeholder='Nome'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={loading}
              />
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
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>
            <button className='linkbuttonlogin' onClick={() => navigate('/')} disabled={loading}>
              Já possui uma conta? Login
            </button>
          </div>
        </ElectricBorder>
      </main>
    </>
  )
}

export default Cadastro
