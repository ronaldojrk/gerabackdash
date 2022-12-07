
import React from 'react'
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
  const q = query(collection(db, "form"), where("form_id", "==", id));

  const querySnapshot = await getDocs(q);
  let personalize: Personalize
  if (querySnapshot.docs[0].exists()) {
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
      color_title: 0,
      color: 0,
      background: 0,
      font: 0,
      font_title: 0,
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