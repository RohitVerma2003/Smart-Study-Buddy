import CTA from "../../components/landing/CTA";
import Features from "../../components/landing/Features";
import Footer from "../../components/landing/Footer";
import Hero from "../../components/landing/Hero";
import HowItWorks from "../../components/landing/HowItWorks";
import Navbar from "../../components/landing/Navbar";
import Stats from "../../components/landing/Stats";
import Workflow from "../../components/landing/Workflow";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <Hero />

      <Stats />

      <HowItWorks />

      <Features />

      <Workflow />

      <CTA />

      <Footer />
    </div>
  );
}