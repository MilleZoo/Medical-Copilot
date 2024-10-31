import styles from './SideBar.module.scss';
import Logo from '../../assets/images/logo.svg';
import { IoSearch } from 'react-icons/io5';
import { CgMenuGridR } from 'react-icons/cg';
import { FaBell } from 'react-icons/fa';
import { TbSettingsFilled } from 'react-icons/tb';
import { TbLogout } from 'react-icons/tb';

export default function SideBar() {
  return (
    <div className={`w-[70] h-screen flex flex-col justify-between pt-2 pb-2 ${styles.main}`}>
      <div className={`w-[70] h-[67] flex justify-center items-center`}>
        <Logo className={`cursor-pointer`} />
      </div>
      <div className={`w-[70] h-[890] flex flex-col justify-center items-center gap-10`}>
        <IoSearch className={`${styles.menuBtn}`} />
        <CgMenuGridR className={`${styles.menuBtn}`} />
        <FaBell className={`${styles.menuBtn} p-0.5`} />
        <TbSettingsFilled className={`${styles.menuBtn}`} />
      </div>
      <div className={`w-[70] h-[67] flex justify-center items-center`}>
        <TbLogout className={`${styles.menuBtn}`} />
      </div>
    </div>
  );
}