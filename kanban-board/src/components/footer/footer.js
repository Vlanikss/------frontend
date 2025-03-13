import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ activeTasksCount, finishedTasksCount }) => {
    return (
        <footer className={styles.footer}>
            <p>Active tasks: {activeTasksCount}</p>
            <p>Finished tasks: {finishedTasksCount}</p>
        </footer>
    );
};

export default Footer;