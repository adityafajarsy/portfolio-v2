'use client';
import React from 'react'
import styles from './style.module.scss';

export default function index({index, title, manageModal}: any) {

    return (
        <div onMouseEnter={(e: any) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e: any) => {manageModal(false, index, e.clientX, e.clientY)}} className={styles.project}>
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div>
    )
}
