import ElectricBorder from "../../components/ElectricBorder/ElectricBorder"
import './style.css'

function Dashboard() {
    return (
        <>
            <header>
                <img src="" alt="logo" />
                <nav>
                    <ul>
                        <li>Dashboard</li>
                    </ul>
                </nav>
            </header>
            <main>
                <ElectricBorder
                    color="#7df9ff"
                    speed={3}
                    chaos={0.1}
                    thickness={2}
                    className='contentCarros'
                >
                    <div className="content">
                        <div className="menu">
                            <button>Entrada</button>
                            <button>Saída</button>
                        </div>
                        <h2>Carros</h2>
                        <div className="carlist">
                            <div className="caritem">
                                <h2>placa</h2>
                                <div className="linha">
                                    <p>Data entrada</p>
                                    <p>Hora entrada</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ElectricBorder>
            </main>
        </>
    )
}

export default Dashboard