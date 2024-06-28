
import { Link, Outlet } from 'react-router-dom'
import Greeting from "./greeting";

const Home = () => {

    
    return (
        <div className={'home'}>
              <Greeting />
            <h1>Страница командира</h1>
            <ul>
                <li><Link to="user">Список подчиненных</Link></li>
                <li><Link to="usertask">Список задач</Link></li>
            </ul>
            <Outlet />
        </div>
    )
}

export default Home