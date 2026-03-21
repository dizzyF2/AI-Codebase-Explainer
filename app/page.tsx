import ActionSection from "@/components/LandingPage/actionSection";
import Features from "@/components/LandingPage/features-section";
import Footer from "@/components/footer";
import Hero from "@/components/LandingPage/hero";
import Navbar from "@/components/navbar";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Navbar />
      <Hero />
      <Features />
      <ActionSection />
      <Footer />
    </div>
  );
}
