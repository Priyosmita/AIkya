import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import "./globals.css";

export default function Home() {
  return (
    <>
    {/* <div className="bgGradient"> */}
      <Header/>
      <LandingPage/>
      <Footer/>
      {/* </div> */}
    </>
  );
}