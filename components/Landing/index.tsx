'use client';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Landing() {
  const [stage, setStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMob = window.innerWidth <= 768;
    setIsMobile(isMob);

    // Animation sequence
    // Stage 0: Initial black screen
    // Stage 1: "Alekseev" drops from top to center, opacity fades in early
    // Stage 2: Grows slightly, moves down
    // Stage 3: Full layout reveals, "Alekseev" moves to final massive size at bottom with highlight
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), isMob ? 2000 : 3500);
    const t3 = setTimeout(() => setStage(3), isMob ? 2800 : 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const textVariants = {
    initial: {
      opacity: 0,
      scale: isMobile ? 0.4 : 0.25,
      y: isMobile ? "-80vh" : "-100vh",
    },
    stage1: {
      opacity: isMobile ? 0.4 : 0.2,
      scale: isMobile ? 0.4 : 0.25,
      y: "-45vh",
      transition: {
        y: { duration: isMobile ? 1.5 : 2, ease: "easeOut" },
        opacity: { duration: 0.5, ease: "linear" }
      }
    },
    stage2: {
      opacity: isMobile ? 0.7 : 0.5,
      scale: isMobile ? 0.5 : 0.35,
      y: "-35vh",
      transition: { duration: 1, ease: "easeInOut" }
    },
    stage3: {
      opacity: 1,
      scale: 1,
      y: 0,
      backgroundPosition: ["100% 0%", "0% 0%"],
      transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const bgVariants = {
    initial: { opacity: 0 },
    stage3: { opacity: 1, transition: { duration: 1.5, delay: 1, ease: "easeInOut" } }
  };

  const getStageName = () => {
    if (stage === 0) return "initial";
    if (stage === 1) return "stage1";
    if (stage === 2) return "stage2";
    return "stage3";
  };

  return (
    <main className={styles.landing}>
      <motion.div
        className={styles.layoutContent}
        variants={bgVariants}
        initial="initial"
        animate={stage === 3 ? "stage3" : "initial"}
      >
        <div className={styles.topSection}>
          <h1>
            Pattern Dimensions<br />
            and Moments that<br />
            Connect and Leave a<br />
            Bold イメージ.
          </h1>
        </div>

        <div className={styles.mobileImageContainer}>
          <img src="https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop&grayscale" alt="dummy" />
        </div>

        <motion.div
          className={styles.middleBar}
          initial={{ scaleY: 0 }}
          animate={stage === 3 ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span initial={{ opacity: 0 }} animate={stage === 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2 }}>Art Direction</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={stage === 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2.1 }}>Web Design</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={stage === 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2.2 }}>Graphic Designer</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={stage === 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1, delay: 2.3 }}>Frontend</motion.span>
        </motion.div>
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={stage === 3 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.div>

      <div className={styles.titleContainer}>
        <motion.h1
          className={styles.alekseev}
          variants={textVariants}
          initial="initial"
          animate={getStageName()}
        >
          Alekseev™
        </motion.h1>
      </div>

      <motion.div
        className={styles.bottomBar}
        variants={bgVariants}
        initial="initial"
        animate={stage === 3 ? "stage3" : "initial"}
      >
        <span>© CURATED INTERFACES ビジュアル</span>
        <span>(WDX® — 02)</span>
        <span>DIGITAL DESIGNER</span>
      </motion.div>
    </main>
  );
}
