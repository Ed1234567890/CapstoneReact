import { NavLink } from 'react-router-dom';
import classes from "./MainHeader.module.css";

//Navigation bar
const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink className={(navData) => navData.isActive ? classes.active : "" } to="/Welcome">Welcome</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => navData.isActive ? classes.active : "" } to="/AddQuestion">AddQuestion</NavLink>
          </li>
          <li>
           <NavLink className={(navData) => navData.isActive ? classes.active : "" } to="/ViewQuestion">ViewQuestion</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => navData.isActive ? classes.active : "" } to="/Quiz">Quiz</NavLink>
          </li>
          <li>
            <NavLink className={(navData) => navData.isActive ? classes.active : "" } to="/ResultList">ResultList</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};


export default MainHeader;