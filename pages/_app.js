import '../styles/globals.css';
import { ThemeProvider } from "next-themes";

import '../styles/nprogress.css';
import NProgress from 'nprogress';
import { Router } from 'next/router';

import { UserContextProvider } from '../lib/UserContext';
import { supabase } from '../lib/supabaseClient';

import Layout from '../components/layout';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 500,
});

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider supabaseClient={supabase}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default MyApp;
