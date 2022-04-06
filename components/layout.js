import Header from './Header';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta name="google-site-verification" content="-fu5lS_hIYpxuoYwFRjmxKVhEu4hvdZZygI3DYLzbik" />
        <title>Supabase Example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel='icon' href="favicon.ico" />
      </Head>

      <Header />
      {children}
    </div>
  );
}