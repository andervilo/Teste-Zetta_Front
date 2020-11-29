import '../styles/index.css'
import Nav from '../components/nav'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <div className="">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp
