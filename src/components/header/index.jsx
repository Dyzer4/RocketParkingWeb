import "./styles.scss"

export default function Header(){
    return(
        <>
            <div>
                <img src="../../assets/Logo.png" alt="Logo"/>
                <nav>
                    <ul>
                        <li><button>Entrada</button></li>
                        <li><button>Saída</button></li>
                    </ul>
                </nav>
                <button><p>Nome: </p><img src="../../assets/user-icon.png" /></button>
            </div>
        </>
    )
}