import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import Solucion from "@/components/Solucion";
import Alertas from "@/components/Alertas";
import ComoFunciona from "@/components/ComoFunciona";
import DiagramaFlujo from "@/components/DiagramaFlujo";
import Beneficios from "@/components/Beneficios";
import ImpactoEconomico from "@/components/ImpactoEconomico";
import Planes from "@/components/Planes";
import Implementacion from "@/components/Implementacion";
import Seguridad from "@/components/Seguridad";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problema />
      <Solucion />
      <Alertas />
      <ComoFunciona />
      <DiagramaFlujo />
      <Beneficios />
      <ImpactoEconomico />
      <Planes />
      <Implementacion />
      <Seguridad />
      <CTAFinal />
      <Footer />
    </main>
  );
}
