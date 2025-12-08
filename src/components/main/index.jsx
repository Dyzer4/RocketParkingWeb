import ElectricBorder from "../../components/ElectricBorder/ElectricBorder"
import './main.css'
import { getCars, addCar, removeCar } from "../../../api"
import { useEffect, useCallback, useState } from "react"
import iconsaida from '../../assets/saida.svg'
import iconentrada from '../../assets/entrada.svg'
import { Modal } from "../modal"
import CircularProgress from '@mui/material/CircularProgress'

export const Main = () => {
    const [cars, setCars] = useState([])
    const [placa, setPlaca] = useState("")
    const [selectedCar, setSelectedCar] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState("")
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState(null)

    const validatePlaca = (placaValue) => {
        const pattern = /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/
        return pattern.test(placaValue)
    }

    const addnewCar = async (e) => {
        if (e && e.preventDefault) e.preventDefault()
        if (!placa.trim()) {
            setError("Digite uma placa")
            return
        }
        
        if (!validatePlaca(placa.toUpperCase())) {
            setError("Placa inválida. Use o padrão AAA1111 ou AAA1A11")
            return
        }

        setError("")
        setLoadingAdd(true)
        console.log('Adding car with plate:', placa)
        
        addCar(placa)
        .then((data) => {
            setSelectedCar(data)
            setShowModal(true)
            fetchCars()
            setPlaca("")
            console.log('Car added successfully:', data)
        })
        .catch((err) => {
            console.error('Failed to add car', err)
            setError("Erro ao adicionar veículo")
        })
        .finally(() => {
            setLoadingAdd(false)
        })
    }

    const removeactiveCar = async (placaCarro) => {
        setLoadingRemove(placaCarro)
        console.log('Removing car with plate:', placaCarro)

        removeCar(placaCarro)
        .then((data) => {
            setSelectedCar(data)
            setShowModal(true)
            fetchCars()
            console.log('Car removed successfully:', data)
        })
        .catch((err) => {
            console.error('Failed to remove car', err)
            setError("Erro ao remover veículo")
        })
        .finally(() => {
            setLoadingRemove(null)
        })
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
                        <input 
                            type="text" 
                            placeholder="Placa" 
                            value={placa} 
                            onChange={e => setPlaca(e.target.value.toUpperCase())}
                            disabled={loadingAdd}
                        />
                        <button type="submit" disabled={loadingAdd}>
                            {loadingAdd ? (
                                <CircularProgress size={24} color="black" />
                            ) : (
                                <>
                                    <img src={iconentrada} alt="" />Entrada
                                </>
                            )}
                        </button>
                    </form>
                    {error && <p style={{color: 'red'}}>{error}</p>}
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
                                    <button 
                                        className="btn-saida" 
                                        onClick={() => removeactiveCar(car.placa)} 
                                        disabled={loadingRemove === car.placa}
                                    >
                                        {loadingRemove === car.placa ? (
                                            <CircularProgress size={24} backgroundcolor="cyan" padding={2} />
                                        ) : (
                                            <img src={iconsaida} alt="Saída" />
                                        )}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </ElectricBorder>
            
            {showModal && selectedCar && (
                <Modal
                    img={selectedCar.veiculo?.dataSaida ? iconsaida : iconentrada}
                    title={selectedCar.mensagem}
                    dataEntrada={selectedCar.veiculo?.dataEntrada}
                    dataSaida={selectedCar.veiculo?.dataSaida}
                    horarioEntrada={selectedCar.veiculo?.horarioEntrada}
                    horarioSaida={selectedCar.veiculo?.horarioSaida}
                    valorTotal={`R$ ${selectedCar.veiculo?.valorPago},00`}
                    onClose={closeModal}
                />
            )}
        </main>
    )
}