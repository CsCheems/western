import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Navbar } from '../../components/layout/Navbar';
import { Hero } from '../../components/home/Hero';
import { Brands } from '../../components/home/Brands';
import { Catalog } from '../../components/home/Catalog';
import { Footer } from '../../components/layout/Footer';

export default function Home() {
  return (

        <div className="min-h-screen overflow-x-hidden bg-ink">
        <AnnouncementBar />
        <Navbar />
        <main>
            <Hero />
            <Brands />
            <Catalog />
        </main>
        <Footer />
        </div>
  );
}
