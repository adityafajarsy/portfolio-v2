'use client';
import styles from './style.module.scss'
import { useRef } from 'react';
import Article from './components/article';
import { motion, useScroll, useTransform } from 'framer-motion';

const articles = [
  {
    title: "Starting and Growing a Career in Web Design",
    date: "Apr 8, 2022",
    src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Create a Landing Page That Performs Great",
    date: "Mar 15, 2022",
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "How Can Designers Prepare for the Future?",
    date: "Feb 28, 2022",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
  }
]

export default function Articles() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
  <section ref={container} className={styles.articlesSection}>
    <div className={styles.gridBackground}></div>
    <div className={styles.container}>
        <p className={styles.label}>.three latest notes</p>
        <div className={styles.body}>
        {
            articles.map( (article, index) => {
            return <Article index={index} title={article.title} date={article.date} src={article.src} key={index}/>
            })
        }
        </div>
        <div className={styles.btnContainer}>
            <div className={styles.visitBlogBtn}>visit blog ↗</div>
        </div>
    </div>
    <motion.div style={{height}} className={styles.circleContainer}>
        <div className={styles.circle}></div>
    </motion.div>
  </section>
  )
}
