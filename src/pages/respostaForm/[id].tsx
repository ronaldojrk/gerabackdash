
import React from 'react'
import Styles from './respostaForm.module.scss';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from 'next';
import { db } from '../../../firebase-config';

import { ToastContainer, toast } from 'react-toastify';
import Router from 'next/router';

interface FormProps {
  form: Form;
  personalize: Personalize;
}

type Form = {
  id: string;
  title: string;
  question: String[];
};

type Personalize = {
  id: string,
  color_title: number,
  color: number,
  background: number,
  font: number,
  font_title: number,
  form_id: string,

}

export default function Form({ form, personalize }: FormProps) {
  const [cont, setCont] = useState(0);


  const [question, setquestion] = useState<String[]>([]);
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


  async function handleSubmit() {
    console.log("terminei de responder")
    console.log(question)


    const formCollectionRef = collection(db, "resposta");
    const response = await addDoc(formCollectionRef, {
      form_id: form.id,
      respostas: question,

    });

    if (response != null) {


      toast.success('Sucesso !', {
        position: toast.POSITION.TOP_RIGHT
      });
      Router.push(`/search`);
    } else {

      toast.error('Falhou !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  return (
    <div className={Styles.geral}>
      <div className={Styles.img}></div>
      <div className={
        personalize.background == 1 ? Styles.background1
          : personalize.background == 2 ? Styles.background2
            : personalize.background == 3 ? Styles.background3
              : personalize.background == 4 ? Styles.background4
                : personalize.background == 5 ? Styles.background5
                  : personalize.background == 6 ? Styles.background6
                    : personalize.background == 7 ? Styles.background7
                      : Styles.fontPadraoTitle}>
        <div className={Styles.formularioView}>
          <div className={Styles.titleQuestion}>
            <div className={
              personalize.font_title == 1 ? Styles.fontTitle1
                : personalize.font_title == 2 ? Styles.fontTitle2
                  : personalize.font_title == 3 ? Styles.fontTitle3
                    : personalize.font_title == 4 ? Styles.fontTitle4
                      : personalize.font_title == 5 ? Styles.fontTitle5
                        : personalize.font_title == 6 ? Styles.fontTitle6
                          : personalize.font_title == 7 ? Styles.fontTitle7
                            : Styles.fontPadraoTitle}>
              <label
                className={
                  personalize.color_title == 1 ? Styles.colorTitle1
                    : personalize.color_title == 2 ? Styles.colorTitle2
                      : personalize.color_title == 3 ? Styles.colorTitle3
                        : personalize.color_title == 4 ? Styles.colorTitle4
                          : personalize.color_title == 5 ? Styles.colorTitle5
                            : Styles.colorPadraoTitle}
                htmlFor="">{form.title}
              </label>
            </div>
          </div>
          <br />
          <div className={Styles.questions}>
            <div className={
              personalize.font == 1 ? Styles.font1
                : personalize.font == 2 ? Styles.font2
                  : personalize.font == 3 ? Styles.font3
                    : personalize.font == 4 ? Styles.font4
                      : personalize.font == 5 ? Styles.font5
                        : personalize.font == 6 ? Styles.font6
                          : personalize.font == 7 ? Styles.font7
                            : Styles.fontPadrao}>
              <label
                className={
                  personalize.color == 1 ? Styles.color1
                    : personalize.color == 2 ? Styles.color2
                      : personalize.color == 3 ? Styles.color3
                        : personalize.color == 4 ? Styles.color4
                          : personalize.color == 5 ? Styles.color5
                            : Styles.colorPadrao}
                htmlFor="">
                {form.question[cont]}
              </label>
            </div>

            {cont != form.question.length ? (
              <div className={Styles.inputs}>
                <textarea value={quest}
                  onChange={(e) => setquest(e.target.value)}></textarea>
              </div>
            ) : (
              <>
                <h2>Acabou as perguntas envie as resposta</h2>
              </>
            )}

          </div>
          <br />
          <div className={Styles.buttons}>

            {cont != form.question.length ? (

              <div className={Styles.button1}>
                <button
                  onClick={() => {

                    handleForm()
                  }}>Proxima Pergunta </button>
              </div>
            ) : (
              <div className={Styles.button3}>
                <button onClick={() => {
                  handleSubmit()
                }}>Enviar Resposta</button>
              </div>
            )
            }

          </div>

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
  } else {

  }

  const form: Form = {
    id: docSnap.id,
    title: docSnap.data().title ? docSnap.data().title : "",
    question: docSnap.data().question ? docSnap.data().question : [],
  };
  const q = query(collection(db, "personalize"), where("form_id", "==", id));

  const querySnapshot = await getDocs(q);
  let personalize: Personalize
  if (querySnapshot.docs[0]?.exists()) {
    let docSnapShot = querySnapshot.docs[0]
    personalize = {
      id: docSnapShot.id,
      color_title: docSnapShot.data().color_title ? docSnapShot.data().color_title : 0,
      color: docSnapShot.data().color ? docSnapShot.data().color : 0,
      background: docSnapShot.data().background ? docSnapShot.data().background : 0,
      font: docSnapShot.data().font ? docSnapShot.data().font : 0,
      font_title: docSnapShot.data().font_title ? docSnapShot.data().font_title : 0,
      form_id: docSnapShot.data().form_id ? docSnapShot.data().form_id : "",

    };
  } else {
    personalize = {
      id: "",
      color_title: 1,
      color: 1,
      background: 1,
      font: 1,
      font_title: 1,
      form_id: "",

    }
  }
  //personalização




  return {
    props: {
      form,
      personalize,
    },
  };
};