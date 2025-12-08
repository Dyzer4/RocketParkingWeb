import { Header } from "../../components/header"
import { Main } from "../../components/main"
import './dashboard.css'

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Header />
            <Main />
        </div>
    )
}

export default Dashboard