import ElectricBorder from "../../components/ElectricBorder/ElectricBorder"
import './style.css'
import { getCars, addCar } from "../../../api"
import { useEffect, useCallback, useState } from "react"
import iconsaida from '../../assets/saida.svg'
import iconentrada from '../../assets/entrada.svg'
import { Modal } from "../modal"

export const Main = () => {
    const [cars, setCars] = useState([])
    const [placa, setPlaca] = useState("")
    const [selectedCar, setSelectedCar] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const addnewCar = async (e) => {
        if (e && e.preventDefault) e.preventDefault()
        if (!placa.trim()) return
        try {
            const newCar = await addCar(placa)
            setPlaca("")
            setSelectedCar(newCar)
            setShowModal(true)
            fetchCars()
        } catch (err) {
            console.error('Failed to add car', err)
        }
    }

    const fetchCars = useCallback(() => {
        getCars()
            .then(data => setCars(Array.isArray(data) ? data : []))
            .catch(err => {
                console.error('Failed to fetch cars', err)
                setCars([])
            })
    }, [])

    useEffect(() => {
        fetchCars()
        const id = setInterval(fetchCars, 5000)
        return () => clearInterval(id)
    }, [fetchCars])

    const closeModal = () => {
        setShowModal(false)
        setSelectedCar(null)
    }

    return (
        <main>
            <ElectricBorder
                color="#7df9ff"
                speed={3}
                chaos={0.1}
                thickness={2}
                className='contentCarros'
            >
                <div className="content">
                    <form className="form-add" onSubmit={addnewCar}>
                        <input type="text" placeholder="Placa" value={placa} onChange={e => setPlaca(e.target.value)} />
                        <button type="submit"><img src={iconentrada} alt="" />Entrada</button>
                    </form>
                    <h2>Carros Ativos</h2>

                    <div className="carlist">
                        {cars.length === 0 ? (
                            <div className="caritem">
                                <p>Não há nenhum veículo estacionado no momento.</p>
                            </div>
                        ) : (
                            cars.map((car, index) => (
                                <div className="caritem" key={car.id ?? index}>
                                    <h3>{car.placa}</h3>
                                    <div className="linha">
                                        <p>{car.dataEntrada}</p>
                                        <p>{car.horarioEntrada}</p>
                                    </div>
                                    <button className="btn-saida">
                                        <img src={iconsaida} alt="Saída" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </ElectricBorder>
            
            {showModal && selectedCar && (
                <Modal
                    img={iconentrada}
                    title={selectedCar.placa}
                    dataEntrada={selectedCar.dataEntrada}
                    dataSaida={selectedCar.dataSaida}
                    horarioEntrada={selectedCar.horarioEntrada}
                    horarioSaida={selectedCar.horarioSaida}
                    valorTotal={selectedCar.valorTotal}
                    onClose={closeModal}
                />
            )}
        </main>
    )
}