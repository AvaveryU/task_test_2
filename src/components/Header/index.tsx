import { FC } from 'react';
import styles from './index.module.css';
import logo from '../../images/logo.png'

const Header: FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img className={styles.img} src={logo} alt="logo" />
            </div>
        </div>
    );
}

export default Header;
