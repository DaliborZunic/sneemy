import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import "./Home.css";

export default function Home() {
  return (
    <>
    <div className="home-wrapper">
      <Hero />
      <Services />
    </div>
    </>
  );
}
