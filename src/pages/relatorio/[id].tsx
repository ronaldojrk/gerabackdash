import React from 'react'
import Styles from './relatorio.module.scss';

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../../firebase-config';

interface FormProps {
  form: Form;
  response: ResponseDate
}

type Form = {
  id: string;
  title: string;
  question: String[];
};

type ResponseDate = {
  res: Response[];
};

type Response = {
  id: string;
  form_id: string;
  respostas: String[];
};

export default function relatorio({ form, response }: FormProps) {

  const [contResponse, setContResponse] = useState(0);


  // input firebase

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



  useEffect(() => {
    getUser()

  }, []);

  return (
    <div className={Styles.geral}>
      <div className={Styles.img}></div>
      <div className={Styles.divRespostas}>
        <div className={Styles.respostas}>
          <br />
          <h2> Seu formulário teve {response?.res?.length} respostas! </h2>
          <br />

          {response?.res?.length == 0 ? (<></>) : (
            <>

              <h2> Você está na resposta numero {contResponse + 1}. </h2>
              <br />
              <h2>Titulo : {form.title}</h2>
              <br />
              {form.question.map((quest, indice) => {

                return (

                  <>
                    <h2 key={indice}>Question {indice + 1} : {quest}</h2>
                    <h3>{response.res[contResponse]?.respostas[indice]}</h3>
                    <br />
                  </>
                )

              })}
              <div className={Styles.buttons}>
                <div>
                  <button className={Styles.button1}
                    onClick={() => {
                      if (response.res.length - 1 > contResponse) {
                        let count = contResponse + 1;
                        setContResponse(count)
                      }
                    }}>Next </button>
                </div>
                <div>
                  <button className={Styles.button2}
                    onClick={() => {
                      if (contResponse > 0) {
                        let count = contResponse - 1;
                        setContResponse(count)
                      }
                    }}>Back</button>
                </div>

              </div>
            </>
          )}






        </div>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params;

  const docRef = doc(db, "form", id.toString());

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
  }

  const form: Form = {
    id: id.toString(),
    title: docSnap.data().title ? docSnap.data().title : "",
    question: docSnap.data().question ? docSnap.data().question : [],
  };



  const q = query(collection(db, "resposta"), where("form_id", "==", id.toString()));

  const querySnapshot = await getDocs(q);

  var arr: Array<Response> = [];
  // console.log(querySnapshot.docs.length)
  querySnapshot.docs.forEach((docSnap) => {
    if (docSnap.exists()) {

      // console.log(docSnap.data)
      const forms: Response = {
        id: docSnap.id,
        respostas: docSnap.data().respostas ? docSnap.data().respostas : [],
        form_id: id.toString()
      };
      //  console.log(forms)
      arr.push(forms);
    } else {

    }
  });

  const response: ResponseDate = {
    res: arr,

  };
  // console.log(form)
  //console.log(arr)

  return {
    props: {
      form,
      response,
    },
  };
};