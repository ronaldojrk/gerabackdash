import React from 'react'
import Styles from './styles.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { useRouter } from "next/router";
import Router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../../firebase-config';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect } from "react";
import { setCookie } from 'nookies';
import Link from 'next/link';

export default function Login() {

    async function setUserToken(uid: string) {
        setCookie(undefined, "nextauth.token", uid, {
            maxAge: 60 * 60 * 24 * 1, //1 day

            path: "/",
        });



    }

    async function handleSubmit(event) {
        event.preventDefault()

        signInWithEmailAndPassword(auth, event.target[0].value, event.target[1].value)
            .then(async (userCredential) => {
                // Signed in
                var user = userCredential.user;
                toast.success('Sucesso!', {
                    position: toast.POSITION.TOP_RIGHT
                });


                await setUserToken(user.uid)


                Router.push(`/listagem`);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                toast.error('Falhou erro no login!', {
                    position: toast.POSITION.TOP_RIGHT
                });

            });

    }

    return (
        <div className={Styles.geral}>
            <div className={Styles.img}></div>
            <div className={Styles.login}>
                <ToastContainer />
                <div className={Styles.divLogin}>
                    <div className={Styles.buttonVoltar}>
                        <Link href="../"><p className={Styles.link}><ArrowBackIcon /></p></Link>
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

                        }}><p>Cadastrar usu??rio</p></button>
                    </div>
                    <div className={Styles.esqueciSenha}>
                        <Link href="/recuperarSenha"><p className={Styles.link}>Esqueci minha senha</p></Link>
                    </div>
                </div>


            </div>
        </div>

    )
}