import React from 'react'
import Styles from './login.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { useRouter } from "next/router";
import Router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../../firebase-config';

export default function Login() {


    async function handleSubmit(event) {
        event.preventDefault()
        signInWithEmailAndPassword(auth, event.target[0].value, event.target[1].value)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("teste2")
                toast.success('Sucesso!', {
                    position: toast.POSITION.TOP_RIGHT
                });


                Router.push(`/listagem`);
                // ...
            })
            .catch((error) => {
                console.log("teste3")
                var errorCode = error.code;
                var errorMessage = error.message;
                toast.error('Falhou erro no login!', {
                    position: toast.POSITION.TOP_RIGHT
                });

            });

        console.log("teste4")
    }

    return (
        <div className={Styles.geral}>
            <div className={Styles.img}></div>
            <div className={Styles.login}>
                <ToastContainer />
                <div className={Styles.divLogin}>
                    <div className={Styles.buttonVoltar}>
                        <a href="../"><ArrowBackIcon /></a>
                    </div>
                    <div className={Styles.tituloLogin}>
                        <h1>Fazer Login</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={Styles.inputs}>
                            <div>
                                <label htmlFor="">Email:</label>
                                <input type="text" name='email' />
                            </div>
                            <div>
                                <label htmlFor="">Senha:</label>
                                <input type="password" name='password' />
                            </div>
                        </div>
                        <div className={Styles.buttons}>
                            <button type="submit" className={Styles.button1}><p>Acessar plataforma</p></button>
                        </div>
                    </form>

                    <div className={Styles.buttons}>
                        <button className={Styles.button2} onClick={() => {
                            Router.push(`/cadastro`);

                        }}><p>Cadastrar usuário</p></button>
                    </div>
                    <div className={Styles.esqueciSenha}>
                        <a href="/recuperarSenha"><p>Esqueci minha senha</p></a>
                    </div>
                </div>


            </div>
        </div>

    )
}