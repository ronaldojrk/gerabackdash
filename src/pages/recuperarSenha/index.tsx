import React from 'react'
import Styles from './styles.module.scss';
import { useContext, useEffect, useRef, useState } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../../firebase-config';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
export default function RecuperarSenha() {


    async function handleSubmit() {
        sendPasswordResetEmail(auth, email).then(async (userCredential) => {

            toast.info('verifique seu email!', {
                position: toast.POSITION.TOP_RIGHT
            });
        })


    }

    const [email, setEmail] = useState("");
    return (
        <div className={Styles.geral}>
            <div className={Styles.div1}></div>
            <div className={Styles.div2e3}>
                <div className={Styles.div2}></div>
                <div className={Styles.senha}>
                    <ToastContainer />
                    <h1>Recupere sua senha!</h1>
                    <label htmlFor="">Digite seu email:</label><br />
                    <input type="text" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <div className={Styles.divButton}>
                        <button className={Styles.button2}
                            onClick={() => {

                                if (email.length > 0) {
                                    handleSubmit()
                                }

                            }}
                        ><p>Enviar</p></button>
                    </div>
                </div>
                <div className={Styles.div3}></div>
            </div>
            <div className={Styles.div4}></div>
        </div>

    )
}
