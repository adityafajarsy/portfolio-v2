'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    useEffect(() => {
        if (isActive) setIsActive(false)
    }, [pathname])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        let mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            gsap.to(button.current, {
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 0,
                    end: window.innerHeight,
                    onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                    onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }); setIsActive(false); }
                }
            })
        });

        return () => mm.revert();
    }, [])

    return (
        <>
            <motion.div
                ref={header}
                className={styles.header}
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: isMobile ? 3 : 4.5, ease: [0.76, 0, 0.24, 1] }}
            >
                <div className={styles.logo}>
                    <div className={styles.name}>
                        <p className={styles.codeBy}>Alekseev®</p>
                        <div className={styles.hoverText}>
                            <p className={styles.dennis}> by Aditya</p>
                            <p className={styles.snellenberg}>Fajar SY</p>
                        </div>
                    </div>
                </div>
                <div className={styles.middleText}>
                    <p className={styles.location}>Based in Jakarta Джакaрт</p>
                    <p className={styles.role}>UI/UX Designer + Frontend Dev</p>
                </div>
                <div className={styles.nav}>
                    <Magnetic>
                        <div className={styles.el}>
                            <a>Work</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <a>About</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                    <Magnetic>
                        <div className={styles.el}>
                            <a>Contact</a>
                            <div className={styles.indicator}></div>
                        </div>
                    </Magnetic>
                </div>
            </motion.div>
            <motion.div
                className={styles.headerButtonWrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: isMobile ? 3 : 4.5 }}
            >
                <div ref={button} className={styles.headerButtonContainer}>
                    <Rounded onClick={() => { setIsActive(!isActive) }} className={`${styles.buttonContainerEmpty}`}>
                        <motion.div 
                            className={styles.buttonInner}
                            initial={{ borderRadius: "0%", scale: 0, rotate: -180, backgroundColor: "#ffffff" }}
                            animate={{ borderRadius: "50%", scale: 1, rotate: 0, backgroundColor: "#1C1D20" }}
                            transition={{ 
                                duration: 1.5, 
                                delay: isMobile ? 3 : 4.5, 
                                type: "spring", 
                                bounce: 0.6 
                            }}
                        >
                            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                        </motion.div>
                    </Rounded>
                </div>
            </motion.div>
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </>
    )
}
