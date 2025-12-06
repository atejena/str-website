import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Hero,
  ValueProposition,
  ClassesPreview,
  TestimonialsCarousel,
  CTABanner,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ValueProposition />
        <ClassesPreview />
        <TestimonialsCarousel />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
