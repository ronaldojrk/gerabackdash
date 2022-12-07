import React from 'react'
import Styles from './styles.module.scss';

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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { db } from '../../../../firebase-config';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface FormProps {
  form: Form;
}

type Form = {
  id: string;
  title: string;
  question: String[];
};

export default function Form({ form }: FormProps) {

  const [cont, setCont] = useState(0);

  const optionsFontTitle = [
    { value: 0, text: '--Padrão--' },
    { value: 1, text: 'Dancing' },
    { value: 2, text: 'GowunDodun' },
    { value: 3, text: 'IMFell' },
    { value: 4, text: 'Inter' },
    { value: 5, text: 'Pacifico' },
    { value: 6, text: 'Risque' },
    { value: 7, text: 'Suwannaphum' },
  ];

  const optionsColorTitle = [
    { value: 0, text: '--Padrão--' },
    { value: 1, text: 'Crimson' },
    { value: 2, text: 'Khaki' },
    { value: 3, text: 'BlueViolet' },
    { value: 4, text: 'SpringGreen' },
    { value: 5, text: 'Goldenrod' },

  ];

  const optionsFont = [
    { value: 0, text: '--Padrão--' },
    { value: 1, text: 'Dancing' },
    { value: 2, text: 'GowunDodun' },
    { value: 3, text: 'IMFell' },
    { value: 4, text: 'Inter' },
    { value: 5, text: 'Pacifico' },
    { value: 6, text: 'Risque' },
    { value: 7, text: 'Suwannaphum' },
  ];

  const optionsColor = [
    { value: 0, text: '--Padrão--' },
    { value: 1, text: 'Crimson' },
    { value: 2, text: 'Khaki' },
    { value: 3, text: 'BlueViolet' },
    { value: 4, text: 'SpringGreen' },
    { value: 5, text: 'Goldenrod' },
  ];

  const optionsBackground = [
    { value: 0, text: '--Padrão--' },
    { value: 1, text: 'MediumSlateBlue' },
    { value: 2, text: 'Plum' },
    { value: 3, text: 'DarkSalmon' },
    { value: 4, text: 'PeachPuff' },
    { value: 5, text: 'Lavender' },
  ];

  const [selectedFontTitle, setSelectedFontTitle] = useState(optionsFontTitle[0].value);
  const [selectedColorTitle, setSelectedColorTitle] = useState(optionsColorTitle[0].value);
  const [selectedFont, setSelectedFont] = useState(optionsFont[0].value);
  const [selectedColor, setSelectedColor] = useState(optionsColor[0].value);
  const [selectedBackground, setSelectedBackgroundr] = useState(optionsBackground[0].value);

  const handleChangeFontTitle = event => {
    setSelectedFontTitle(event.target.value);
  };
  const handleChangeColorTitle = event => {
    setSelectedColorTitle(event.target.value);
  };
  const handleChangeFont = event => {
    setSelectedFont(event.target.value);
  };
  const handleChangeColor = event => {
    setSelectedColor(event.target.value);
  };
  const handleChangeBackground = event => {
    setSelectedBackgroundr(event.target.value);
  };





  // input firebase

  const [userId, setUserId] = useState("");
  async function signOut() {
    destroyCookie(undefined, "nextauth.token");
    Router.push("/login");
  }

  async function getUser() {
    const { "nextauth.token": token } = parseCookies();


    if (token) {
      setUserId(token)
    } else {
      signOut()
    }


  }

  async function personalizeForm() {


    // const q = query(collection(db, "personalize"), where("form_id", "==", form.id));

    // const querySnapshot = await getDocs(q);
    // if (querySnapshot.docs[0].exists()) {
    //   let docSnapShot = querySnapshot.docs[0]


    //   const response = await updateDoc(doc(db, "personalize", docSnapShot.id), {
    //     color_title: selectedColorTitle,
    //     color: selectedColor,
    //     background: selectedBackground,
    //     font: selectedFont,
    //     font_title: selectedFontTitle,
    //     form_id: form.id,
    //   });

    //   toast.success('Sucesso!', {
    //     position: toast.POSITION.TOP_RIGHT
    //   });
    //  } else {


    const formCollectionRef = collection(db, "personalize");
    const response = await addDoc(formCollectionRef, {
      color_title: Number(selectedColorTitle),
      color: Number(selectedColor),
      background: Number(selectedBackground),
      font: Number(selectedFont),
      font_title: Number(selectedFontTitle),
      form_id: form.id,

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

    //  }







  }


  useEffect(() => {
    getUser()

  }, []);

  return (
    <div className={Styles.geral}>
      <div className={Styles.personalizar}>
        <div className={Styles.selectedFont}>
          <h3>Escolha a fonte para o titulo:</h3>
          <select value={selectedFontTitle} onChange={handleChangeFontTitle}>
            {optionsFontTitle.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <br />
          <h3>Escolha a cor para o titulo:</h3>
          <select value={selectedColorTitle} onChange={handleChangeColorTitle}>
            {optionsColorTitle.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <br />
          <h3>Escolha a fonte para as perguntas:</h3>
          <select value={selectedFont} onChange={handleChangeFont}>
            {optionsFont.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <br />
          <h3>Escolha a cor para as perguntas:</h3>
          <select value={selectedColor} onChange={handleChangeColor}>
            {optionsColor.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <br />
          <h3>Escolha o background do form:</h3>
          <select value={selectedBackground} onChange={handleChangeBackground}>
            {optionsBackground.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={Styles.formulario}>
        <div className={Styles.buttonVoltar}>
          <Link href="../../listagem"><p className={Styles.link}><ArrowBackIcon /></p></Link>
        </div>
        <div className={Styles.formularioView}>
          <ToastContainer />
          <div className={Styles.titleQuestion}>
            <div className={
              selectedFontTitle == 1 ? Styles.fontTitle1
                : selectedFontTitle == 2 ? Styles.fontTitle2
                  : selectedFontTitle == 3 ? Styles.fontTitle3
                    : selectedFontTitle == 4 ? Styles.fontTitle4
                      : selectedFontTitle == 5 ? Styles.fontTitle5
                        : selectedFontTitle == 6 ? Styles.fontTitle6
                          : selectedFontTitle == 7 ? Styles.fontTitle7
                            : Styles.fontPadraoTitle}>
              <label
                className={
                  selectedColorTitle == 1 ? Styles.colorTitle1
                    : selectedColorTitle == 2 ? Styles.colorTitle2
                      : selectedColorTitle == 3 ? Styles.colorTitle3
                        : selectedColorTitle == 4 ? Styles.colorTitle4
                          : selectedColorTitle == 5 ? Styles.colorTitle5
                            : Styles.colorPadraoTitle}
                htmlFor="">{form.title}
              </label>
            </div>
          </div>
          <br />
          <div className={Styles.questions}>
            <div className={
              selectedFont == 1 ? Styles.font1
                : selectedFont == 2 ? Styles.fontTitle2
                  : selectedFont == 3 ? Styles.fontTitle3
                    : selectedFont == 4 ? Styles.fontTitle4
                      : selectedFont == 5 ? Styles.fontTitle5
                        : selectedFont == 6 ? Styles.fontTitle6
                          : selectedFont == 7 ? Styles.fontTitle7
                            : Styles.fontPadrao}>
              <label
                className={
                  selectedColor == 1 ? Styles.color1
                    : selectedColor == 2 ? Styles.color2
                      : selectedColor == 3 ? Styles.color3
                        : selectedColor == 4 ? Styles.color4
                          : selectedColor == 5 ? Styles.color5
                            : Styles.colorPadrao}
                htmlFor="">
                {form.question[cont]}
              </label>
            </div>
            <br />
            <div className={Styles.background}>
              <div className={
                selectedBackground == 1 ? Styles.background1
                  : selectedBackground == 2 ? Styles.background2
                    : selectedBackground == 3 ? Styles.background3
                      : selectedBackground == 4 ? Styles.background4
                        : selectedBackground == 5 ? Styles.background5
                          : Styles.backgroundPadrao}>
              </div>
            </div>
          </div>
          <br />
          <div className={Styles.buttons}>
            <div className={Styles.button1}>
              <button
                onClick={() => {

                  if (form.question?.length - 1 > cont) {
                    let count = cont + 1;
                    setCont(count)
                  }
                }}>Next </button>
            </div>
            <div className={Styles.button2}>
              <button
                onClick={() => {
                  if (cont > 0) {
                    let count = cont - 1;
                    setCont(count)
                  }
                }}>Back</button>
            </div>
            <div className={Styles.button3}>
              <button onClick={() => {
                personalizeForm()
              }}>Finalizar Personalização</button>
            </div>
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
    // console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
  }

  const form = {
    id: id,
    title: docSnap.data().title ? docSnap.data().title : "",
    question: docSnap.data().question ? docSnap.data().question : [],
  };

  return {
    props: {
      form,
    },
  };
};