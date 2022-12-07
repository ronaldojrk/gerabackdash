import React from 'react'
import Styles from './home.module.scss';
import GridViewIcon from '@mui/icons-material/GridView';
import { useContext, useEffect, useRef, useState } from "react";
import Router from 'next/router';

export default function Search() {
  const [code, setCode] = useState("");

  return (
    <div className={Styles.geral}>
      <div className={Styles.sidebar}>
        <div className={Styles.buttonMenu}>
          <a href=""><GridViewIcon /></a>
        </div>
      </div>
      <div className={Styles.conteudos}>
        <div className={Styles.conteudo1}>
          <div className={Styles.buttonLogin}>
            <a href="/"><p>home</p></a>
          </div>
          <div className={Styles.buttonLogin}>
            <a href="/login"><p>Login</p></a>
          </div>
        </div>
        <div className={Styles.conteudo2}>
          <div className={Styles.titulo}>
            <h2>GeraBack</h2>
            <div className={Styles.inputs}>
              <label>Digite o codigo do formulario: </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

            </div>

            <button className={Styles.button2}
              onClick={() => {
                if (code.length > 0) {


                  let teste = "/respostaForm/" + code
                  Router.push(teste)
                }

              }}
            >
              <p>Ir formulario</p>
            </button>


          </div>

        </div>
      </div>
    </div>

  )
}
