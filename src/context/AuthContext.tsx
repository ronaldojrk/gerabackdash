import { createContext, ReactNode, useEffect, useState } from "react";

import {
  getDoc,
  updateDoc,
  doc,

} from "firebase/firestore";
import Router from "next/router";
import { db, auth } from "../../firebase-config";

import { setCookie, parseCookies, destroyCookie } from "nookies";


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
  setUserToken(uid: String): Promise<void>;
  getUser(): Promise<void>;
  //meTokenSign(uid: String): Promise<void>;
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

    // const { "nextauth.token": token } = parseCookies();

    // if (token) {
    //   meTokenSign(token).then((response) => {});
    // }
    // // }
  }, []);



  async function setUserToken(uid: string) {
    setCookie(undefined, "nextauth.token", uid, {
      //  maxAge: 60 * 60 * 24 * 30,//30 days
      maxAge: 60 * 60 * 24 * 1, //1 day
      // maxAge: 60 * 30,//30 min
      // maxAge: 60 * 1,//30 min
      path: "/",
    });



  }

  async function getUser() {
    const { "nextauth.token": token } = parseCookies();

    console.log(token)

    if (token) {
      await meTokenSign(token)
    }


  }

  async function meTokenSign(uid: string) {

    try {
      console.log(uid)
      //  const uid = auth.currentUser.uid

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
        console.log("cheguei aqui")
        console.log(userContext)

        return userContext
      } else {
        setAuthenticate(false)
        console.log("Falhou busca de dados")
      }


    } catch (error) {
      setAuthenticate(false)
      console.log("tray")
    }


  }
  async function meTokenSigOut() {
    // auth.signOut()
    // Router.push(`/`);

    //console.log(docSnap);

    destroyCookie(undefined, "nextauth.token");
    // destroyCookie(undefined, "nextauth.refreshToken");

    Router.push("/");
  }


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        //  meTokenSign,
        setUserToken,
        getUser,
        //   meTokenTo,
        meTokenSigOut,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
