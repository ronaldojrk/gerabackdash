import React from 'react'
import Styles from './cadastro.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { auth, db } from "../../../firebase-config";
import {

    addDoc,
    collection,
    doc,
    setDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";


export default function Cadastro() {

    function handleForm() {

        let conster = cont + 1
        setCont(conster)

        let question1 = quest

        let array = question


        array.push(question1)
        let newarray = array


        setquestion(newarray)


        setquest("")


    }

    async function handleSubmit(event) {
        event.preventDefault()
        // const usersCollectionRef = doc(db, "users");
        createUserWithEmailAndPassword(auth, event.target[1].value, event.target[2].value)
            .then(async (userCredential) => {
                // Signed in

                // console.log(userCredential.user.toJSON());
                var user = userCredential.user;

                const usersCollectionRef3 = doc(db, "user", user.uid);

                const response = await setDoc(usersCollectionRef3, {
                    nome: event.target[0].value,
                    email: event.target[1].value,
                    cpf: event.target[3].value,
                    tel: event.target[4].value,
                    date: event.target[5].value
                });


                toast.success('Sucesso!', {
                    position: toast.POSITION.TOP_RIGHT
                });

                Router.push(`/login`);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                toast.error('Falhou !', {
                    position: toast.POSITION.TOP_RIGHT
                });

            });

        // const usersCollectionRef2 = collection(db, "user");
        // event.preventDefault()




    }

    interface Doc {
        // id: string;
        QuestionName: string;

    }

    const [question, setquestion] = useState<String[]>([]);

    const [cont, setCont] = useState(0);
    const [quest, setquest] = useState("");

    return (
        <div className={Styles.geral}>
            <ToastContainer />
            <div className={Styles.img}></div>
            <div className={Styles.login}>
                <div className={Styles.divLogin}>
                    <div className={Styles.buttonVoltar}>
                        <a href="/login"><ArrowBackIcon /></a>
                    </div>
                    <div className={Styles.tituloCadastrar}>
                        <h1>Fazer Cadastro</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={Styles.inputs}>
                            <div>
                                <label htmlFor="">Nome:</label>
                                <input type="text" name='nome' />
                            </div>
                            <div>
                                <label htmlFor="">Email:</label>
                                <input type="email" name='email' />
                            </div>
                            <div>
                                <label htmlFor="">Senha:</label>
                                <input type="password" name='password' />
                            </div>
                            <div>
                                <label htmlFor="">Cpf:</label>
                                <input type="text" name='cpf' />
                            </div>
                            <div>
                                <label htmlFor="">Tel:</label>
                                <input type="tel" name='tel' />
                            </div>
                            <div>
                                <label htmlFor="">Data de nascimento:</label>
                                <input type="date" name='date' />
                            </div>

                        </div>
                        <div className={Styles.buttons}>
                            <button type="submit" className={Styles.button2}><p>Cadastrar usuário</p></button>
                        </div>
                    </form>



                    <div>

                        <label>Enter your name: </label>
                        <input
                            type="text"
                            value={quest}
                            onChange={(e) => setquest(e.target.value)}
                        />


                        <button onClick={() => {
                            handleForm()
                            console.log(question)
                        }} className={Styles.button2}><p>ProximaQuestion</p></button>
                    </div>

                </div>
            </div>
        </div>

    )
}