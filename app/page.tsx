'use client';

import styles from './page.module.scss';
import { useEffect } from 'react';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import Articles from '../components/Articles';
import ParallaxGallery from '../components/ParallaxGallery';
import Contact from '../components/Contact';
import About from '../components/About';

export default function Home() {

  useEffect(() => {
    (async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis();

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      setTimeout(() => {
        document.body.style.cursor = 'default';
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <Landing />
      <Description />
      <Projects />
      <About />
      <Articles />
      <ParallaxGallery />
      <Contact />
    </main>
  );
}
