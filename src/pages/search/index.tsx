import React from 'react'
import Styles from './styles.module.scss';
import { useState } from "react";
import Router from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Search() {
  const [code, setCode] = useState("");

  return (
    <div className={Styles.geral}>
      <div className={Styles.div1}></div>
      <div className={Styles.div2e3}>
        <div className={Styles.div2}></div>
        <div className={Styles.senha}>
          <div className={Styles.buttonVoltar}>
            <a href="../"><ArrowBackIcon /></a>
          </div>
          <h1>Digite o código do formulário:</h1>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className={Styles.divButton}>
            <button className={Styles.button2}
              onClick={() => {
                if (code.length > 0) {
                  let teste = "/respostaForm/" + code
                  Router.push(teste)
                }
              }}
            >
              <p>Ir para formulário</p>
            </button>
          </div>
        </div>
        <div className={Styles.div3}></div>
      </div>
      <div className={Styles.div4}></div>
    </div>
  )
}