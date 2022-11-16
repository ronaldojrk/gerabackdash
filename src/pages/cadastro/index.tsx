import React from 'react'
import Styles from './cadastro.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Cadastro() {

    return (
      <div className={Styles.geral}>
        <div className={Styles.img}></div>
        <div className={Styles.login}>
            <div className={Styles.divLogin}>
                <div className={Styles.buttonVoltar}>
                <a href="/login"><ArrowBackIcon /></a>
                </div>
                <div className={Styles.tituloCadastrar}>
                    <h1>Fazer Cadastro</h1>
                </div>
                <div className={Styles.inputs}>
                    <div>
                        <label htmlFor="">Email:</label>
                        <input type="email"/>
                    </div>
                    <div>
                        <label htmlFor="">Senha:</label>
                        <input type="password"/>
                    </div>
                    <div>
                        <label htmlFor="">Cpf:</label>
                        <input type="number"/>
                    </div>
                    <div>
                        <label htmlFor="">Tel:</label>
                        <input type="tel"/>
                    </div>
                    <div>
                        <label htmlFor="">Data de nascimento:</label>
                        <input type="date"/>
                    </div>

                </div>
                <div className={Styles.buttons}>
                    <button className={Styles.button2}><p>Cadastrar usuário</p></button>
                </div>
            </div>
        </div>
      </div>      
  
    )
  }