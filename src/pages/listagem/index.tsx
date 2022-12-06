import React from 'react'
import Styles from './listagem.module.scss';
import GridViewIcon from '@mui/icons-material/GridView';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContext } from '../../context/AuthContext';
import Router from 'next/router';

export default function Listagem() {

  // const auth = getAuth();

  //  console.log(auth.currentUser)

  // auth.signOut()
  // const teste = getAuth();
  // console.log(teste)

  //const { user, isAuthenticated, meTokenSigOut, meTokenSign } = useContext(AuthContext);


  useEffect(() => {
    // meTokenSign()
    // billsNota(bills.id)
  }, []);

  return (

    <div className={Styles.geral}>
      <div className={Styles.sidebar}>
        <div className={Styles.buttonsMenu}>
          <div><a href=""><GridViewIcon /></a><br /></div>
          <div className={Styles.chat}><a href=""><ChatBubbleOutlineIcon /></a><br /></div>
          <div className={Styles.desligar}><a href="/login"><PowerSettingsNewIcon /></a></div>
        </div>
      </div>
      <div className={Styles.conteudos}>
        <div className={Styles.conteudo1}>
          <div className={Styles.buttonCadastrar}>
            <h2>Formulários</h2>
            <button><a href="/formulario">+ Criar formulário</a></button>
          </div>
        </div>
        <div className={Styles.conteudo2}>
          <div className={Styles.cards}>
            <div className={Styles.card}>
              <div className={Styles.buttonsCard}>
                <button onClick={() => { 
                  Router.push('/personalizarFormulario/perfil/rM1UCVW4fHGVLQz6HvLI')
                }}><DriveFileRenameOutlineIcon /></button>
                <button><DeleteOutlineIcon /></button>
              </div>
              <div className={Styles.imgCard}>img</div>
              <div className={Styles.textosCard}>
                <h3>teste 2</h3>
                <p>13 respostas</p>
              </div>

            </div>
            <div className={Styles.card}>b</div>
            <div className={Styles.card}>c</div>
            <div className={Styles.card}>d</div>
          </div>
        </div>
      </div>
    </div>

  )
}