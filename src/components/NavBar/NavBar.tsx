import { Link } from 'react-router-dom';
import style from './style.module.scss'
const NavBar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li className={style.link}>
            <Link to="/">Group Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar