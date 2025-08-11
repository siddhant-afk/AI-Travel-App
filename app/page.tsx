import Hero from "./_components/Hero";
import Image from "next/image";
import { PopularCitiesList } from "./_components/PopularCitiesList";

export default function Home() {
  return (
  
  <div>
  <Hero />
  <PopularCitiesList />
  </div>
  );
}
