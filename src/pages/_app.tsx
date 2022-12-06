import React from "react"
import '../styles/global.scss';

import { AppProps } from 'next/app'
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>);
}

export default MyApp
