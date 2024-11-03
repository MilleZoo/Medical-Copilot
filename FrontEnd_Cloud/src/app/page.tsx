'use client';

import Image from 'next/image';
import Logo from '@/assets/images/Logo_Landing.png';
import styles from './page.module.scss';
import { useLandingAnimation } from '@/hooks/useLandingAnimation';

export default function Home() {
  const { animation, medicalRef, copilotRef } = useLandingAnimation();
  return (
    <>
      <div className={`w-screen h-screen flex justify-center items-center gap-5 overflow-hidden`}>
        <Image
          className={`${styles.logoInit} ${animation ? styles.logoActive : null}`}
          src={Logo}
          alt="Logo"
        />
        <div
          className={`flex flex-col text-6xl w-[365] h-[150] justify-center ${styles.text} gap-2`}
        >
          <span
            ref={medicalRef}
            className={`${styles.slideLeftIn} ${animation ? styles.active : null}`}
          >
            MEDIC<span className={`${styles.blue}`}>A</span>L
          </span>
          <span
            ref={copilotRef}
            className={`${styles.slideRightIn} ${animation ? styles.active : null} flex justify-end`}
          >
            COP<span className={`${styles.blue}`}>I</span>LOT
          </span>
        </div>
      </div>
    </>
  );
}
