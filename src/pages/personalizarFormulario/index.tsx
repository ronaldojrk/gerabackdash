import React from 'react'
import Styles from './formulario.module.scss';
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


export default function Formulario() {
    const [question, setquestion] = useState<String[]>([]);
    
    const [cont, setCont] = useState(0);
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

    interface Doc {
        // id: string;
        QuestionName: string;

    }

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
                        <h1>Cadastrar Perguntas:</h1>
                    </div>
                    <div className={Styles.inputs}>
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
                        <button className={Styles.button2}>
                            <p>Finalizar Formulario</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}