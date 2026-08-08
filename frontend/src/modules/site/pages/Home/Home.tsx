import Hero from "./components/Hero/Hero";
import Pricing from "./components/Pricing/Pricing";
import Services from "./components/Services/Services";
import "./Home.css";
export default function Home() {
    return (<>
    <div className="home-wrapper">
      <Hero />
      <Services />
      <Pricing />
    </div>
    </>);
}
