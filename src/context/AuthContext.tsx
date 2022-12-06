import { createContext, ReactNode, useEffect, useState } from "react";

import {
  getDoc,
  updateDoc,
  doc,

} from "firebase/firestore";
import Router from "next/router";
import { db, auth } from "../../firebase-config";


type User = {
  email: string;
  nome: string;
  nasciment: string;
  cpf: string;
  tel: string;
  id: string;
};
type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  //signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
  //meToken(): Promise<boolean>;
  meTokenSign(): Promise<void>;
  meTokenSigOut(): Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthenticate, setAuthenticate] = useState(false);
  const isAuthenticated = !!user;


  function dateFormat(date: Date) {
    let startDateTeste = new Date(date);
    let dia = startDateTeste.getDate();
    let diastring = "" + dia;

    if (dia.toString().length === 1) {
      diastring = "0" + dia;
    }

    let mes = startDateTeste.getMonth() + 1;
    let messtring = "" + mes;

    if (mes.toString().length === 1) {
      messtring = "0" + mes;
    }

    let ano = startDateTeste.getFullYear();

    return diastring + "/" + messtring + "/" + ano + " ";
  }


  useEffect(() => {
    //  meTokenSign()
    // const { "nextauth.token": token } = parseCookies();

    // if (token) {
    //   me(token).then((response) => {});
    // }
  }, []);

  async function meTokenSign() {

    try {

      const uid = auth.currentUser.uid

      if (uid != null || uid != "") {
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
        setAuthenticate(true)
        setUser(userContext)
      } else {
        setAuthenticate(false)
      }


    } catch (error) {
      setAuthenticate(false)
    }


  }
  async function meTokenSigOut() {
    // auth.signOut()
    // Router.push(`/`);

    //console.log(docSnap);

  }


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        meTokenSign,
        //   meTokenTo,
        meTokenSigOut,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
