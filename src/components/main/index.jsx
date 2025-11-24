import ElectricBorder from "../../components/ElectricBorder/ElectricBorder"
import './style.css'
import { getCars, addCar } from "../../../api"
import { useEffect, useCallback, useState, useRef, useLayoutEffect } from "react"
import iconsaida from '../../assets/saida.svg'
import iconentrada from '../../assets/entrada.svg'
import { FixedSizeList as List } from "react-window"

export const Main = () => {
    const [cars, setCars] = useState([])
    const [placa, setPlaca] = useState("")
    const [listHeight, setListHeight] = useState(300)
    const wrapperRef = useRef(null)

    const recalcHeight = useCallback(() => {
        const vh = window.innerHeight
        const reserved = 40  + 70 + 50  + 20 
        const h = vh - reserved

        setListHeight(Math.max(150, Math.min(h, vh - 100)))
    }, [])

    useLayoutEffect(() => {
        recalcHeight()
    }, [recalcHeight])

    useEffect(() => {
        window.addEventListener('resize', recalcHeight)
        return () => window.removeEventListener('resize', recalcHeight)
    }, [recalcHeight])

    const addnewCar = async (e) => {
        if (e && e.preventDefault) e.preventDefault()
        if (!placa.trim()) return
        try {
            await addCar(placa)
            setPlaca("")
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

    return (
        <main>
            <ElectricBorder
                color="#7df9ff"
                speed={3}
                chaos={0.1}
                thickness={2}
                className='contentCarros'
            >
                <div className="content" ref={wrapperRef}>
                    <form className="form-add" onSubmit={addnewCar}>
                        <input type="text" placeholder="Placa" value={placa} onChange={e => setPlaca(e.target.value)} />
                        <button type="submit"><img src={iconentrada} alt="" />Entrada</button>
                    </form>
                    <h2>Carros Ativos</h2>

                    <div className="carlist" style={{ height: listHeight }}>
                        {cars.length === 0 ? (
                            <div className="caritem" style={{ justifyContent: 'center' }}>
                                <p>Não há nenhum veículo estacionado no momento.</p>
                            </div>
                        ) : (
                            <List
                                height={listHeight}
                                width={"100%"}
                                itemCount={cars.length}
                                itemSize={90}
                                style={{ overflowX: "hidden" }}
                            >
                                {({ index, style }) => {
                                    const car = cars[index]
                                    return (
                                        <div
                                            className="caritem"
                                            style={{
                                                ...style,
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}
                                            key={car.id ?? index}
                                        >
                                            <h3>{car.placa}</h3>
                                            <div className="linha">
                                                <p>{car.dataEntrada}</p>
                                                <p>{car.horarioEntrada}</p>
                                            </div>
                                            <button className="btn-saida">
                                                 <img src={iconsaida} alt="Saída" />
                                            </button>
                                        </div>
                                    )
                                }}
                            </List>
                        )}
                    </div>
                </div>
            </ElectricBorder>
        </main>
    )
}