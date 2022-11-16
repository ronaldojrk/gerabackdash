import React from 'react'
import Styles from './home.module.scss';
import GridViewIcon from '@mui/icons-material/GridView';

export default function Home() {

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
            <a href="/login">Login</a>
          </div>
        </div>
        <div className={Styles.conteudo2}>
          <div className={Styles.titulo}>
              <h2>GeraBack</h2>
              <h3>Crie seus formulários personalizados.</h3>
          </div>
          <div className={Styles.sobre}>              
            <div className={Styles.textosSobre}>
              <div>
                <h3>Quem somos</h3>
              </div>
              <div>
                <p>
                  Nossa principal função é deixar
                  o seu formulário <b>mais bonito!</b>
                  Para isso, atraves da nossa aplicação
                  é possivel personalizar as cores do seu 
                  formulario! Deixando-o com a cara da sua 
                  empresa ou produto.
                </p>
              </div>
            </div>              
          </div>
        </div>
      </div>
    </div>

  )
}
