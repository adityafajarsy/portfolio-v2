'use client';
import styles from './style.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const text = "my craft is building experiences that bring value to people and celebrate function over form. let's hide the ego and give some freedom to creativity and make the first small step changing the world to a better place";

const Word = ({ children, progress, range }: { children: string, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className={styles.word}>
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "center 40%"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  
  const words = text.split(" ");

  return (
    <section ref={container} className={styles.aboutSection}>
      <div className={styles.gridBackground}></div>
      <div className={styles.content}>
        <p className={styles.label}>.about</p>
        <h2 className={styles.text}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
          })}
        </h2>
        <div className={styles.aboutMeBtn}>
            <p>about me ↗</p>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <motion.div 
          className={styles.perspectiveWrapper}
          style={{
            rotateX,
            rotateY,
            scale,
            y,
            opacity: imageOpacity,
            transformPerspective: 1500
          }}
        >
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&grayscale" alt="portrait" />
        </motion.div>
      </div>
    </section>
  );
}
