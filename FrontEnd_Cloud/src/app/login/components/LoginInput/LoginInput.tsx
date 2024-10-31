import Link from 'next/link';
import styles from './LoginInput.module.scss';

export default function LoginInput() {
  return (
    <div className={`${styles.main} flex flex-col items-center gap-10`}>
      <div className={`flex flex-col gap-[7]`}>
        <input
          className={`${styles.Email} w-[422] h-[70]`}
          placeholder="Email"
        />
        <input
          className={`${styles.PW} w-[422] h-[70]`}
          placeholder="Password"
          type="password"
        />
      </div>
      <div className={`${styles.btn} flex w-full`}>
        <Link
          href="/main"
          className={`${styles.signup} w-[422] h-[64] flex justify-center items-center`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}