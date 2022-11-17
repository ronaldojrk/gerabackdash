import React from 'react'
import Styles from './recuperarSenha.module.scss';


export default function RecuperarSenha() {

  return (
    <div className={Styles.geral}>
        <div className={Styles.div1}></div>
        <div className={Styles.div2e3}>
            <div className={Styles.div2}></div>
                <div className={Styles.senha}>
                    <h1>Recupere sua senha!</h1>
                    <label htmlFor="">Digite seu email:</label><br />
                    <input type="text" />
                    <div className={Styles.divButton}>
                        <a href="../"><button className={Styles.button2}><p>Enviar</p></button></a>    
                    </div>
                </div>
            <div className={Styles.div3}></div>
        </div>
        <div className={Styles.div4}></div>
    </div>

  )
}
