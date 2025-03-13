import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <h1>Awesome Kanban Board</h1>
            <div className={styles.avatarContainer} onClick={toggleMenu}>
                <img
                    src="https://via.placeholder.com/40" // Заглушка для аватара
                    alt="User avatar"
                    className={styles.avatar}
                />
                <span className={styles.arrow}>{isMenuOpen ? '▲' : '▼'}</span>
            </div>
            {isMenuOpen && (
                <ul className={styles.menu}>
                    <li>Profile</li>
                    <li>Settings</li>
                </ul>
            )}
        </header>
    );
};

export default Header;