import './style.css'
import Lightning from '../../components/Lightning/Lightning';
import ElectricBorder from '../../components/ElectricBorder/ElectricBorder'

function Cadastro() {
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
            className='contentlogin'
            
          >
            <div className='formlogin'>
                <h2>Cadastro</h2>
                <form>
                    <input type="text" placeholder='Nome' id="nome"/>
                    <input type="email" placeholder="Email" id='email'/>
                    <input type="password" name="senha" id="senha" placeholder='Senha'/>
                    <button>Cadastrar</button>
                </form>
            </div>
          </ElectricBorder>
      </main>
    </>
  )
}

export default Cadastro
