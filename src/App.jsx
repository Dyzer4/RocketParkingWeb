import './App.css'
import Lightning from './components/Lightning/Lightning';
import ElectricBorder from './components/ElectricBorder/ElectricBorder'

function App() {
  return (
    <>
      <main>
        <div className="background">
          <Lightning
            hue={220}
            xOffset={0}
            speed={1}
            intensity={0.5}
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
            style={{ borderRadius: 16, position: 'absolute',  }}
          >
            <div>
              <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
                A glowing, animated border wrapper.
              </p>
            </div>
          </ElectricBorder>
      </main>
    </>
  )
}

export default App
