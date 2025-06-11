import { Header, NewHero, Specialties, AboutCompany, FAQ, Contact, Footer } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <NewHero />
      <Specialties />
      <AboutCompany />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
