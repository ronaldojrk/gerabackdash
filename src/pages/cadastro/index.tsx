import React from 'react'
import Styles from './cadastro.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { db } from "../../../firebase-config";
import {

    addDoc,
    collection,
    doc,
} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Cadastro() {


    async function handleSubmit(event) {

        // const usersCollectionRef = doc(db, "users");

        const usersCollectionRef2 = collection(db, "user");
        event.preventDefault()
        console.log(event.target[0])
        console.log(event.target[0].value)
        console.log(event.target[1].value)
        console.log(event.target[2].value)
        console.log(event.target[3].value)
        console.log(event.target[4].value)


        const response = await addDoc(usersCollectionRef2, {
            email: event.target[0].value,
            password: event.target[1].value,
            cpf: event.target[2].value,
            tel: event.target[3].value,
            date: event.target[4].value
        });

        if (response != null) {
            // const notify = () => toast("Wow so easy!");
            toast.success('Sucesso!', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Falhou !', {
                position: toast.POSITION.TOP_RIGHT
            });
            //  const notify = () => toast("Wow so easy!");
        }

    }

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

                </div>
            </div>
        </div>

    )
}