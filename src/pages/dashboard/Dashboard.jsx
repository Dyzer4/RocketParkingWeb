import { Header } from "../../components/header"
import { Main } from "../../components/main"
import './style.css'

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Header />
            <Main />
        </div>
    )
}

export default Dashboard