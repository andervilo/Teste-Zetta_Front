import '../styles/index.css'
import Nav from '../components/nav'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <div className="max-w-screen-lg   mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp
