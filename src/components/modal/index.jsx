import './style.css';

export function Modal ({ img, title, dataEntrada, dataSaida, horarioEntrada, horarioSaida, valorTotal, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <img src={img} alt={`${title}`}/>
                <h2>{title}</h2>
                <p><strong>Data de entrada:</strong> {dataEntrada}</p>
                {dataSaida && <p><strong>Data de saída:</strong> {dataSaida}</p>}
                <p><strong>Horário de Entrada:</strong> {horarioEntrada}</p>
                {horarioSaida && <p><strong>Horário de Saída:</strong> {horarioSaida}</p>}
                {valorTotal && <p><strong>Valor Total:</strong> {valorTotal}</p>}
            </div>
        </div>
    );
}