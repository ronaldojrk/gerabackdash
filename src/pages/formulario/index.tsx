import React from 'react'
import Styles from './formulario.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { auth, db } from "../../../firebase-config";
import {

    addDoc,
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { destroyCookie, parseCookies } from 'nookies';


export default function Formulario() {
    const [question, setquestion] = useState<String[]>([]);

    const [cont, setCont] = useState(0);
    const [title, setTitle] = useState("");
    const [quest, setquest] = useState("");

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

    const [userId, setUserId] = useState("");


    async function signOut() {
        destroyCookie(undefined, "nextauth.token");
        Router.push("/login");
    }

    async function getUser() {
        const { "nextauth.token": token } = parseCookies();

        console.log(token)

        if (token) {
            setUserId(token)
        } else {
            signOut()
        }


    }


    async function formsUsers() {

        const q = query(collection(db, "form"), where("user_id", "==", userId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot?.docs?.length >= 3) {
            toast.info('O limite gratuito foi alcançado!!', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            finalizarForm()
        }


    }

    async function finalizarForm() {
        const formCollectionRef = collection(db, "form");
        const response = await addDoc(formCollectionRef, {
            title: title,
            question: question,
            user_id: userId
        });

        if (response != null) {


            toast.success('Sucesso!', {
                position: toast.POSITION.TOP_RIGHT
            });



            Router.push(`/listagem`);
        } else {

            toast.error('Falhou !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }


    }


    useEffect(() => {
        getUser()

    }, []);

    return (
        <div className={Styles.geral}>
            <ToastContainer />
            <div className={Styles.img}></div>
            <div className={Styles.formulario}>
                <div className={Styles.divForm}>
                    <div className={Styles.buttonVoltar}>
                        <a href="/login"><ArrowBackIcon /></a>
                    </div>
                    <div className={Styles.tituloCadastrar}>
                        <h1>Cadastrar Form:</h1>
                    </div>
                    <div className={Styles.inputs}>
                        <label>Digite o titulo para o formulario: </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <label>Digite sua pergunta numero {cont + 1}: </label>
                        <input
                            type="text"
                            value={quest}
                            onChange={(e) => setquest(e.target.value)}
                        />
                    </div>
                    <div className={Styles.button}>
                        <button
                            className={Styles.button1}
                            onClick={() => {
                                handleForm()
                                console.log(question)
                            }}><p>Proxima Questao</p>
                        </button>
                        <button className={Styles.button2}
                            onClick={() => {
                                formsUsers()
                                //console.log(question)
                            }}
                        >
                            <p>Finalizar Formulario</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}