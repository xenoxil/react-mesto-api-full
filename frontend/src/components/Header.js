import React from "react";
import headerLogo from "../images/header-logo.svg";
import { Link,Route, Switch } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img
        src={headerLogo}
        className="header__logo"
        alt="Логотип Место Russia"
      />
      <Switch>
        <Route path='/sign-up'>
        <Link to='/sign-in' className='header__link hover'>
            Войти
            </Link>
        </Route>
        <Route path='/sign-in'>
        <Link to='/sign-up' className='header__link hover'>
          {'Регистрация'} 
            </Link>
        </Route>
        <Route path='/'>
            <div className='header__container'>
            <p className='header__email'>{props.userEmail}</p>
            <Link to='/sign-in' className='header__link hover' onClick={props.onLogOut}>
            Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
