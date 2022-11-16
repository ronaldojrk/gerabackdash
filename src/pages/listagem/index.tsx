import React from 'react'
import Styles from './listagem.module.scss';
import GridViewIcon from '@mui/icons-material/GridView';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Listagem() {

  return (

    <div className={Styles.geral}>
      <div className={Styles.sidebar}>
        <div className={Styles.buttonsMenu}>
          <div><a href=""><GridViewIcon /></a><br /></div>
          <div className={Styles.chat} ><a href=""><ChatBubbleOutlineIcon /></a><br /></div>
          <div className={Styles.desligar} ><a href="/login"><PowerSettingsNewIcon /></a></div>
        </div>
      </div>
      <div className={Styles.conteudos}>
        <div className={Styles.conteudo1}>
          <div className={Styles.buttonCadastrar}>
            <h2>Formulários</h2>
            <button>+ Criar formulário</button>
          </div>
        </div>
        <div className={Styles.conteudo2}>
          <div className={Styles.cards}>
              <div className={Styles.card}>
                <div className={Styles.buttonsCard}>
                  <button><DriveFileRenameOutlineIcon /></button>
                  <button><DeleteOutlineIcon /></button>
                </div>
                <div className={Styles.imgCard}>img</div>
                <div className={Styles.textosCard}>
                  <h4>teste 2</h4>
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