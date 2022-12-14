import React from 'react'
import Styles from './styles.module.scss';
import GridViewIcon from '@mui/icons-material/GridView';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BallotIcon from '@mui/icons-material/Ballot';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useEffect, useState } from "react";
import { destroyCookie, parseCookies } from 'nookies';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import Router from 'next/router';
import teste from '../../img/imgForm.png';


type User = {
  email: string;
  nome: string;
  nasciment: string;
  cpf: string;
  tel: string;
  id: string;
}

type Form = {
  id: string;
  question: string[];
  title: string;
  user_id: string;
}

export default function Listagem() {

  const [user, setUser] = useState<User>();
  const [forms, setforms] = useState<Form[]>([]);
  const [formsEmpty, setFormsEmpty] = useState(false);
  const [isAuthenticate, setAuthenticate] = useState(false);

  async function getUser() {
    const { "nextauth.token": token } = parseCookies();


    if (token) {
      setAuthenticate(true)
      await userFirebase(token)
    } else {
      signOut()
      setAuthenticate(false)
    }


  }

  async function userFirebase(uid: string) {

    try {
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);
      const userContext: User = {
        email: docSnap.data().email ? docSnap.data().email : "",
        nome: docSnap.data().nome ? docSnap.data().nome : "",
        // nasciment: dateFormat(docSnap.data().date.ToDate()) ? dateFormat(docSnap.data().date.ToDate()) : "",
        nasciment: "",
        cpf: docSnap.data().cpf ? docSnap.data().cpf : "",
        tel: docSnap.data().tel ? docSnap.data().tel : "",
        id: docSnap.id,

      };
      setUser(userContext)
      await formsUsers(uid)
    } catch (error) {
      signOut()
      setAuthenticate(false)
    }


  }


  async function formsUsers(Id: string) {
    //  setisloadingdoc(true);
    //console.log("cheguei aqui")

    const q = query(collection(db, "form"), where("user_id", "==", Id));

    const querySnapshot = await getDocs(q);

    //console.log(querySnapshot)

    var arr: Array<Form> = [];

    querySnapshot.docs.forEach((docSnap) => {
      if (docSnap.exists()) {

        const forms: Form = {
          id: docSnap.id,
          title: docSnap.data().title ? docSnap.data().title : "",
          question: docSnap.data().question ? docSnap.data().question : [],
          user_id: Id
        };
        //  console.log(forms)
        arr.push(forms);
      } else {

        //console.log("vazio")
      }
    });

    //console.log(arr)

    if (arr.length > 0) {
      setFormsEmpty(true)
    } else {
    }

    setforms(arr);
    // setisloadingdoc(false);
  }



  async function signOut() {
    destroyCookie(undefined, "nextauth.token");
    Router.push("/login");
  }



  useEffect(() => {
    getUser()

  }, []);

  return (

    <div className={Styles.geral}>
      <div className={Styles.sidebar}>
        <div className={Styles.buttonsMenu}>
          <div><a href=""><GridViewIcon /></a><br /></div>
          <div className={Styles.chat}><a href=""><ChatBubbleOutlineIcon /></a><br /></div>
          <div className={Styles.desligar}><a onClick={() => {
            signOut()
          }}><PowerSettingsNewIcon /></a></div>
        </div>
      </div>
      <div className={Styles.conteudos}>
        <div className={Styles.conteudo1}>
          <div className={Styles.buttonCadastrar}>
            <h4>Bem vindo {user?.nome}</h4>
            <h2>Formul??rios</h2>
            <button onClick={() => {
              Router.push("/formulario")
            }}><h3>+ Criar formul??rio</h3></button>
          </div>
        </div>
        <div className={Styles.conteudo2}>


          <div className={Styles.cards}>
            {forms.map((form) => {
              return (
                <div key={form.id} className={Styles.card}>
                  <div className={Styles.buttonsCard}>
                    <button onClick={() => {
                      //   Router.push()
                      Router.push(`/personalizarFormulario/perfil/${form.id}`)
                    }}><DriveFileRenameOutlineIcon /></button>
                    <button
                      onClick={() => {
                        Router.push(`/relatorio/${form.id}`)
                      }}

                    ><AssignmentIcon /></button>
                  </div>
                  <div className={Styles.imgCard}></div>
                  <div className={Styles.textosCard}>
                    <h3>{form.title}</h3>
                    <p><b> Code:</b> {form.id}</p>
                    <p>{form.question.length} quest??es</p>
                    {/* <p>0 respostas</p> */}
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>

  )
}



