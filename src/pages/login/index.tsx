import React from 'react'
import Styles from './login.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Login() {

    return (
      <div className={Styles.geral}>
        <div className={Styles.img}></div>
        <div className={Styles.login}>
            <div className={Styles.divLogin}>
                <div className={Styles.buttonVoltar}>
                <a href="../"><ArrowBackIcon /></a>
                </div>
                <div className={Styles.tituloLogin}>
                    <h1>Fazer Login</h1>
                </div>
                <div className={Styles.inputs}>
                    <div>
                        <label htmlFor="">Email:</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label htmlFor="">Senha:</label>
                        <input type="password" />                        
                    </div>
                </div>
                <div className={Styles.esqueciSenha}>
                    <a href="">Esqueci minha senha</a>                    
                </div>
                <div className={Styles.buttons}>
                    <a href="/listagem"><button className={Styles.button1}><p>Acessar plataforma</p></button></a>                    
                    <a href="/cadastro"><button className={Styles.button2}>Cadastrar usuário</button></a>
                    
                </div>
            </div>
        </div>
      </div>      
  
    )
  }