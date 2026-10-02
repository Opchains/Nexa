import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkspacePreview from "@/components/WorkspacePreview";
import CapabilityCards from "@/components/CapabilityCards";
import HumanInTheLoopSection from "@/components/HumanInTheLoopSection";
import ArchitectureShowcase from "@/components/ArchitectureShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500/30">
      <Header />
      <main className="flex-1">
        <Hero />
        <WorkspacePreview />
        <CapabilityCards />
        <HumanInTheLoopSection />
        <ArchitectureShowcase />
      </main>
      <Footer />
    </div>
  );
}
