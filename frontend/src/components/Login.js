import React,{useRef} from'react'
import {withRouter} from 'react-router-dom' 
import {FormValidator} from './FormValidator'
import {loginConfig} from '../utils/constants'


function Login(props){
const email=useRef();
const password=useRef();


React.useEffect(() => {    
    const loginForm=document.getElementById('loginForm');
const loginFormValidation= new FormValidator(loginConfig,loginForm);
    loginFormValidation.enableValidation();
  }, []);


    function handleSubmit(e){
e.preventDefault();
props.onLogin(email.current.value,password.current.value);
    }
    return(
        <section className='login'>            
            <form className="login__form" id='loginForm' name='loginForm' autoComplete="off" noValidate onSubmit={handleSubmit}>
            <h2 className='login__header'>Вход</h2>
            <input className="login__input" type="email" ref={email} name="loginName" id="loginName" placeholder='Email'required minLength={2} maxLength={40} />
            <span className="error" id="loginName-error" />
            <input className="login__input" type="password" ref={password} name="loginPassword" id="loginPassword" placeholder='Пароль'required minLength={8} maxLength={30} />
            <span className="error" id="loginPassword-error" />
        <button className="login__submitbtn hover" type="submit" aria-label="Кнопка Войти" onClick={handleSubmit}>Войти</button>
        </form>
         
        </section>
    )
}

export default withRouter(Login)