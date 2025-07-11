import Image from "next/image";
import Header from "./homepage/Header";
import Hero from "./homepage/Hero";




export default function Home() {
  
  return (
    <div className="bg-home">
      <Header/>
      <Hero/>
      
    </div>
  );
}